export function intersect(arr1, arr2) {
  return arr1.filter(item => arr2.includes(item));
}

export function uniquify(arr, keepNull = false) {
  return arr.filter((item, index, arr) => (item || keepNull) && arr.indexOf(item) === index)
}

export function combine(keys, values) {
  const obj = {}
  for (let i = 0; i < keys.length; i++) {
    obj[keys[i]] = values[i]
  }
  return obj
}