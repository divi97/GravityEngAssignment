function twoNumbers(nums, target) {
  if (!Array.isArray(nums)) {
    throw new Error("Nums must be an array");
  } else if (typeof target !== "number") {
    throw new Error("Target must be a number");
  }

  const numsObj = {};

  for (let i = 0; i < nums.length; i++) {
    let numDiff = target - nums[i];

    if (numsObj.hasOwnProperty(numDiff)) {
      return [numsObj[numDiff], i];
    }

    numsObj[nums[i]] = i;
  }

  throw new Error("No answer found");
}

const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoNumbers(nums, target));
