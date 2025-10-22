# 两数之和

从数组 `nums` 找出两个和为 `target` 值的两个数，并返回由二者 索引 构成的数组。

### 🌰

> 输入：nums = [2,7,11,15], target = 9 输出：[0,1] 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

> 输入：nums = [3,2,4], target = 6 输出：[1,2]

### 数据结构 S(n)

构建 map ：需要的另一半值 -> 当前 index。后续找到需要的数值时，即可返回两个下标完成计算。

### 循环结构 O(n)

遍历数组即可。

### 思路

遍历数组，通过 map 记录每一项合成 target 所需的另一半值。同时也验证当前项是否为 “另一半值”，若是则找到了。

```js
function twoSum(nums, target) {
  // 另一半值 -> 当前 i
  const want2Idx = new Map();

  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i];
    // 当前值为另一半值，说明其与表中记录的 index 位的数值之和是 target。found！
    if (want2Idx.has(curr)) {
      return [want2Idx.get(curr), i];
    }

    // 记录需要的另一半数值
    const want = target - curr;
    want2Idx.set(want, i);
  }
  return [];
}

console.log(twoSum([1, 2, 3], 4));
```

[Letcode](https://leetcode.cn/problems/two-sum/description/)
