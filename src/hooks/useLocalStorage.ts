/* Custom hook for using local storage */

const useLocalStorage = () => {
  const getItem = (key: string) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  };

  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
  };

  return { setItem, getItem, removeItem };
};

export default useLocalStorage;
