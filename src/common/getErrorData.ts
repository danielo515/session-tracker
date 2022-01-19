export const getErrorData = (error) => ((error.data || {}).errors || [{}])[0]
export const isAuthError = error => ((/authorization/i)).test(getErrorData(error).code)