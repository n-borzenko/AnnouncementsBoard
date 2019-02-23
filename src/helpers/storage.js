export const setToStorage = (key, value, skipStringify = false) => {
  try {
    localStorage.setItem(key, skipStringify ? value : JSON.stringify(value));
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getFromStorage = (
  key,
  defaultValue = null,
  skipStringify = false
) => {
  try {
    let value = localStorage[key];
    value = value ? (skipStringify ? value : JSON.parse(value)) : null;
    return value || defaultValue;
  } catch (error) {
    console.error(error);
    return defaultValue;
  }
};

export const removeFromStrorage = key => {
  localStorage.removeItem(key);
};
