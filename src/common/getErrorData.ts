export const getErrorData = (error: any) => ((error.data || {}).errors || [{}])[0];
export const isAuthError = (error: any) => /authorization/i.test(getErrorData(error).code);
