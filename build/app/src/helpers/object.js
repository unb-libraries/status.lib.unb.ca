import { uniquify } from "./array";

export function merge(...objs) {
  const keys = uniquify([].concat(...objs.map((obj) => Object.keys(obj))));
  const merged = {}
  for (const key of keys) {
    merged[key] = uniquify(objs.map((obj) => obj[key]))
  }
  return merged
}
