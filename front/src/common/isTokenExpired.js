// @ts-check

const oneHour = 3600000;

const parseTokenInfo = token => {
  const [, payload] = token.split('.');
  const tokenInfo = JSON.parse(atob(payload));
  return tokenInfo;
};

export const isTokenExpired = token => {
  const tokenInfo = parseTokenInfo(token);
  return tokenInfo.exp < Date.now() / 1000;
};

/*
 * token.exp is in seconds
 */
export const isCloseToExpire = token => {
  const tokenInfo = parseTokenInfo(token);
  const timeDiff = tokenInfo.exp - Date.now() / 1000;
  return timeDiff < 4 * oneHour;
};
