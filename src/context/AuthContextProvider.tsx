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
    return signOut(auth);
  };

  // Reset Password
  const resetPassword = (email: string) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

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

    // Update Firestore after updating Firebase Authentication
    const userRef = doc(usersCollection, auth.currentUser.uid);
    await updateDoc(userRef, {
      email: newEmail,
      updatedAt: serverTimestamp(),
    });

    // Update context
    setEmail(newEmail);

    // Update email in Firebase Authentication
    return updateEmail(auth.currentUser, newEmail);
  };

  // Update username

  const updateUsername = async (newUsername: string) => {
    if (!auth.currentUser) {
      throw new Error("You are not authenticated to perform this action");
    }

    // Update Firestore
    const userRef = doc(usersCollection, auth.currentUser.uid);
    await updateDoc(userRef, {
      username: newUsername,
    });
  };
  // Update avatar
  const updateUserAvatar = async (newAvatarId: number) => {
    if (!auth.currentUser) {
      throw new Error("You are not authenticated to perform this action");
    }

    // Update Firestore
    const userRef = doc(usersCollection, auth.currentUser.uid);
    await updateDoc(userRef, {
      avatar: newAvatarId,
    });
  };

  // Delete User
  const deleteUserAccount = async () => {
    setLoading(true);
    if (!auth.currentUser) {
      throw new Error("You are not authenticated to perform this action");
    }
    const userId = auth.currentUser.uid;

    // Delete the user data from Firestore
    const userDocRef = doc(usersCollection, userId);
    await deleteDoc(userDocRef);

    // Delete the user from Firebase Authentication
    await deleteUser(auth.currentUser);
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
        setLoading,
        signup,
        login,
        logout,
        resetPassword,
        updateUserPassword,
        updateUserEmail,
        updateUsername,
        updateUserAvatar,
        deleteUserAccount,
        reAuthenticateUser,
      }}
    >
      {loading ? <LoadingSpinner /> : <>{children}</>}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
