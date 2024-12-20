/* Custom hook to get user details */

import { usersCollection } from "../firebase/config";
import useAuth from "./useAuth";
import useGetDocument from "./useGetDocument";

const useGetUser = () => {
  // Get the user function from auth context
  const { user } = useAuth();
  // Get user data
  const {
    data,
    loading,
    error: getUserError,
  } = useGetDocument(usersCollection, user?.uid || "");
  // Store avatar data in variable and convert to number for comparison to id's avatars array
  const avatarId = Number(data?.avatar);

  return {
    data,
    avatarId,
    loading,
    getUserError,
  };
};

export default useGetUser;
