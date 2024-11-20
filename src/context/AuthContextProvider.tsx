/* Auth Context Provider */

import { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth, usersCollection } from "../firebase/config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { AuthContext } from "./AuthContext";

// Create the auth context provider
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  console.log("User is: ", user);

  // Sign up the user
  const signup = async (
    email: string,
    password: string,
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

  useEffect(() => {
    const authStateListener = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);

      if (authUser) {
        setUserName(authUser.displayName);
        setEmail(authUser.email);
      } else {
        setUserName(null);
        setEmail(null);
      }
      setLoading(false);
    });
    return authStateListener;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        login,
        logout,
        resetPassword,
        userName,
        email,
        user,
      }}
    >
      {loading ? "loading" : <>{children}</>}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
