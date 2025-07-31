Array.prototype.customReduce = function (cb, initialValue) {
  if (this === null || this === undefined)
    throw new TypeError('customReduce cannot be called on null or undefined');
  if (typeof cb !== 'function') throw new TypeError(cb + 'is not a function');

  const arr = this;
  const length = this.length;
  let acc = initialValue;
  for (let i = 0; i < length; i++) {
    acc = cb(acc, arr[i], i, arr);
  }
  return acc;
};
export const customReducePolyFill = [1, 2, 3].customReduce((acc, x) => acc + x, 0);

Array.prototype.customMap = function (cb) {
  const arr = this;
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(cb(arr[i], i, arr));
  }
  return result;
};
export const customMapPolyFill = [1, 2, 3].customMap((x) => x * 10);

Array.prototype.customFilter = function (cb) {
  const arr = this;
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (cb(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
};
export const customFilterPolyFill = [1, 2, 3, 4].customFilter((x) => x % 2 === 0);

Array.prototype.customIncludes = function (key) {
  const arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === key) {
      return true;
    }
  }
  return false;
};
export const customIncludesPolyFill = [1, 2, 3, 4].customIncludes(3);

Array.prototype.customFlat = function (depth = 1) {
  let result = [];

  const flatArray = (arr, currDepth) => {
    for (let i = 0; i < arr.length; i++) {
      const ele = arr[i];
      if (Array.isArray(ele) && currDepth < depth) {
        flatArray(ele, currDepth + 1);
      } else {
        result.push(ele);
      }
    }
  };

  flatArray(this, 0);

  return result;
};
export const customFlatPolyFill = [1, [null, [undefined]], [2, [3, 4], 5]].customFlat(0);
