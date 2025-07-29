const isLoggedIn = () => {
  return document.cookie.split("; ").some((c) => c.startsWith("accessToken="));
};
export default isLoggedIn;