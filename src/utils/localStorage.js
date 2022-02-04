const getLocalStorageItem = (key) => {
  try {
    const item = JSON.parse(localStorage.getItem(key));

    return item;
  } catch (error) {
    return '';
  }
};

const setLocalStorageItem = (key, item) => {
  try {
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error(error);
  }
};

const removeLocalStorageItem = (key) => {
  localStorage.removeItem(key);
};

export { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem };
