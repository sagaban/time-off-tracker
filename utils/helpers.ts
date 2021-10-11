/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
export const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
): Promise<any> => {
  const res = await fetch(input, init);
  return res.json();
};
/* eslint-enable */
