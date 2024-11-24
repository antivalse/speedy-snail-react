import { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  User,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth, usersCollection } from "../firebase/config";
import {
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { AuthContext } from "./AuthContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";

// Create the auth context provider
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  console.log("user is: ", user);

  // Sign up the user
  const signup = async (
    email: string,
    password: string,
    username: string,
    selectedAvatar: number
  ) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    const userDocRef = doc(usersCollection, user.uid);

    setDoc(userDocRef, {
      uid: user.uid,
      email: user.email || "",
      username: username,
      avatar: selectedAvatar,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return userCredential;
  };

  // Login User
  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout User
  const logout = async () => {
    try {
      await signOut(auth);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      if (error) {
        console.error("Failed to log out");
      }
    }
  };

  // Reset Password
  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  // // Update user credentials

  // const updateUserCredentials = () => {
  //   if (!auth.currentUser) {
  //     return false;
  //   }

  //   setUserName(auth.currentUser.displayName);
  //   setEmail(auth.currentUser.email);
  //   return true;
  // };

  // Update Password
  const updateUserPassword = async (newPassword: string) => {
    if (!auth.currentUser) {
      throw new Error("You are not authenticated to perform this action");
    }
    await updatePassword(auth.currentUser, newPassword);
  };

  const updateUserEmail = async (newEmail: string) => {
    if (!auth.currentUser) {
      throw new Error("You are not authenticated to perform this action");
    }

    try {
      // Update email in Firebase Authentication
      await updateEmail(auth.currentUser, newEmail);

      // Update Firestore after updating Firebase Authentication
      const userRef = doc(usersCollection, auth.currentUser.uid);
      await updateDoc(userRef, {
        email: newEmail,
        updatedAt: serverTimestamp(),
      });

      // Update context
      setEmail(newEmail);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  // Update avatar

  const updateUserAvatar = async (newAvatarId: number) => {
    if (!auth.currentUser) {
      throw new Error("You are not authenticated to perform this action");
    }
    try {
      // Update Firestore
      const userRef = doc(usersCollection, auth.currentUser.uid);
      await updateDoc(userRef, {
        avatar: newAvatarId,
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  // Delete User
  const deleteUserAccount = async () => {
    if (!auth.currentUser) {
      throw new Error("You are not authenticated to perform this action");
    }
    const userId = auth.currentUser.uid;
    try {
      // Delete the user data from Firestore
      const userDocRef = doc(usersCollection, userId);
      await deleteDoc(userDocRef);

      // Delete the user from Firebase Authentication
      await deleteUser(auth.currentUser);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  // Re-authenticate user

  const reAuthenticateUser = async (password: string) => {
    if (!auth.currentUser) {
      throw new Error("You are not authenticated to perform this action");
    }

    // Create credential
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email || "",
      password
    );

    await reauthenticateWithCredential(auth.currentUser, credential);
  };

  useEffect(() => {
    const authStateListener = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);

      if (authUser) {
        setEmail(authUser.email);
      } else {
        setEmail(null);
      }
      setLoading(false);
    });
    return authStateListener;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        email,
        user,
        loading,
        signup,
        login,
        logout,
        resetPassword,
        updateUserPassword,
        updateUserEmail,
        updateUserAvatar,
        // updateUserCredentials,
        deleteUserAccount,
        reAuthenticateUser,
      }}
    >
      {loading ? <LoadingSpinner /> : <>{children}</>}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
