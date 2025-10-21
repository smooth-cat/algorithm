## 两数之和

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 **和为目标值** _`target`_ 的那 **两个** 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

你可以按任意顺序返回答案。

🌰1：

> 输入：nums = [2,7,11,15], target = 9 输出：[0,1] 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

🌰2：

> 输入：nums = [3,2,4], target = 6 输出：[1,2]

```js
function twoSum(nums, target) {
  const want2Idx = new Map();
  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i];

    if (want2Idx.has(curr)) {
      return [want2Idx.get(curr), i];
    }
    
    const want = target - curr;
    want2Idx.set(want, i);
  }
  return [];
}

console.log(twoSum([1, 2, 3], 4));
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
