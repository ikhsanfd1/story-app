const Utils = {
  aturUserToken(key, value) {
    return sessionStorage.setItem(key, value);
  },
  ambilUserToken(key) {
    return sessionStorage.getItem(key);
  },
  destroyUserToken(key) {
    return sessionStorage.removeItem(key);
  },
};

export default Utils;
