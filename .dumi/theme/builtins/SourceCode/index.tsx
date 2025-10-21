import React, { useLayoutEffect, useRef, useState } from 'react';
import { EditorView, basicSetup } from 'codemirror';

import { keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import './index.less';
export default (props: any) => {
  const codeRef = useRef('');
  const divRef = useRef(null);
  const [list, setList] = useState<string[]>([]);
  const [err, setErr] = useState<string | undefined>(undefined);

  useLayoutEffect(() => {
    codeRef.current = props.code;

    let updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        const newCode = update.state.doc.toString();
        codeRef.current = newCode;
      }
    });

    new EditorView({
      parent: divRef.current!,
      doc: codeRef.current,
      extensions: [
        basicSetup,
        keymap.of([indentWithTab]),
        updateListener,
        oneDark,
        javascript() /* ... */,
      ],
    });

    document.addEventListener('keydown', handleSave);
    execCode();
    return () => {
      document.removeEventListener('keydown', handleSave);
    };
  }, []);

  function handleSave(event: KeyboardEvent) {
    // 判断是否为 Ctrl键（非Mac）或 Cmd键（Mac） 和 S键 的组合
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      // 阻止浏览器的默认保存行为
      event.preventDefault();
      execCode();
    }
  }

  const noRewrite = useRef(false);

  function execCode() {
    const code = codeRef.current;
    // 清空
    setList([]);
    setErr(undefined);
    const rawLog = console.log;
    // 修改 log
    console.log = function (...data) {
      if (noRewrite.current) {
        rawLog.call(console, ...data);
        return;
      }
      const parsed = data.map((item) => JSON.stringify(item)).join(' ');
      noRewrite.current = true;
      setList((prev) => [...prev, parsed]);
      noRewrite.current = false;
    };
    // 执行代码
    try {
      eval(code);
    } catch (error: any) {
      // 立刻还原 log
      console.log = rawLog;
      setErr(error.toString());
    }
    // 还原 log
    console.log = rawLog;
  }

  const noError = err == null;

  return (
    <div className="replaced-source-code">
      <div className="edit-wrapper">
        <div className="edit-title">试试就逝世：</div>
        <div className="tip">按 ctrl / cmd + s 自动更新输出</div>
        <div className="edit-self" ref={divRef}></div>
        <div className="result">
          <div className={noError ? 'msg-res-title' : 'err-res-title'}>
            {noError ? '输出' : '错误'}：
          </div>
          {noError ? (
            <div className="log-list">
              {list.map((it) => {
                return (
                  <div className="log-item" key={it}>
                    {it}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="err-msg">{err}</div>
          )}
        </div>
      </div>
    </div>
  );
};
