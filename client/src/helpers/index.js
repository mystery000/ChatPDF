export const setStorage = (key, value) => {
  if(value) {
    localStorage.setItem(key, value);
  } else {
    localStorage.removeItem(key);
  }
}

export const getStorage = (key) => {
  return localStorage.getItem(key);
}