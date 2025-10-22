# 两数之和(有序)

**不使用额外空间**， 从**升序**数组 `nums` 找出和为 `target` 值的两个数，并返回由二者 索引 构成的数组。

### 🌰

> 输入：nums = [2,7,11,15], target = 9 输出：[0,1] 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

> 输入：nums = [2,3,4], target = 6 输出：[0,2]

### 数据结构 S(1)

不使用额外空间。

### 循环结构 O(n)

双指针从左右逼近，所以是 O(n)。

### 思路

所指两数之和大于 `target` 值时 `👈🏻右指针`；小于目标值时 `左指针👉🏻`，逐渐逼近 `target`。

```js
function twoSum(nums, target) {
  let start = 0;
  let end = nums.length - 1;

  while (start < end) {
    const sum = nums[start] + nums[end];

    if (sum === target) {
      return [start, end];
    }
    // 两数之和大于目标值 “👈🏻右指针”，反之 “左指针👉🏻”
    sum > target ? end-- : start++;
  }
  return [];
}

console.log(twoSum([1, 2, 3], 4));
```

[Letcode](https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/description/)
