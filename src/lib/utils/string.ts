import { parseMutationArgs } from 'react-query/types/core/utils';

export const shortnizeString = (
  str: string,
  options?: {
    s?: number;
    e?: number;
    inner?: number;
  }
) => {
  let start = (options && options.s) ?? 8;
  let end = (options && options.e) ?? 8;
  let inner = (options && options.inner) ?? '...';

  if (!str || str.length <= start + end) return str;
  return `${str.substring(0, start)}${inner ? inner : '...'}${str.substring(
    str.length - end
  )}`;
};
