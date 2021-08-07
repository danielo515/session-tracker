export const getErrorData = (/** @type {{ data: any; }} */ error: any) => ((error.data || {}).errors || [{}])[0];
export const isAuthError = (/** @type {any} */ error: any) => /authorization/i.test(getErrorData(error).code);
