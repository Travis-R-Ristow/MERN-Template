const getCookies = () => {
  let cookies: { [x: string]: string } = {};

  !!document.cookie &&
    document.cookie.split(';').forEach((cookie) => {
      const [key, value] = cookie.split('=');
      cookies[key] = value;
    });

  return cookies;
};

const cookieToString = (cookies: { [x: string]: string }) => {
  return (
    Object.keys(cookies)
      .map((key) => `${key}=${cookies[key]}`)
      .join(';') + ';'
  );
};

export const setCookie = (key: string, value: string) => {
  let cookies = getCookies();
  cookies[key] = value;
  document.cookie = cookieToString(cookies);
};

export const getCookieByKey = (key: string) => {
  return getCookies()[key];
};
