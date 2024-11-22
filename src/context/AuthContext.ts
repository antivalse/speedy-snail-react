/* Auth Context */

import { createContext } from "react";
import { User, UserCredential } from "firebase/auth";

interface AuthContextType {
  email: string | null;
  userName: string | null;
  user: User | null;
  loading: boolean;
  avatar: number | null;
  signup: (
    email: string,
    password: string,
    selectedAvatar: number
  ) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserPassword: (newPassword: string) => Promise<void>;
  updateUserEmail: (newEmail: string) => Promise<void>;
  updateUserCredentials: () => boolean;
  deleteUserAccount: () => Promise<void>;
  reAuthenticateUser: (password: string) => Promise<void>;
  setAvatar: (avatarId: number | null) => void;
}

// Create auth context
export const AuthContext = createContext<AuthContextType | null>(null);
