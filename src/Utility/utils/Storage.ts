export const getToken = (key: string) => {
  const targetStorage = localStorage.getItem(key)
    ? localStorage
    : sessionStorage;
  const storage = targetStorage.getItem(key);

  return storage;
};

export const setToken = (targetStorage: any, key: string, data: any) => {
  targetStorage.setItem(key, data);
};

export const removeToken = (key: string) => {
  const targetStorage = localStorage.getItem(key)
    ? localStorage
    : sessionStorage;
  targetStorage.removeItem(key);
};
