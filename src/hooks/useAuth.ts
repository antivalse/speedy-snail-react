/* Custom Hook for Using Auth Context */

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      "Trying to use AuthContext outside of AuthContextProvider?"
    );
  }

  return authContext;
};

export default useAuth;
