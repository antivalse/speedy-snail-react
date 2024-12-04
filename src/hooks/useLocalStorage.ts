/* Custom hook for using local storage */

const useLocalStorage = (key = "") => {
  const setItem = (value = "") => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      if (err instanceof Error) {
        console.log(err?.message);
      }
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (err) {
      if (err instanceof Error) {
        console.log(err?.message);
      }
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error?.message);
      }
    }
  };

  return { setItem, getItem, removeItem };
};

export default useLocalStorage;
