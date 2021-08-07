export const getErrorData = (/** @type {{ data: any; }} */ error) =>
  ((error.data || {}).errors || [{}])[0];
export const isAuthError = (/** @type {any} */ error) =>
  /authorization/i.test(getErrorData(error).code);
