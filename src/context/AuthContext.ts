/* Auth Context */

import { createContext } from "react";
import { User, UserCredential } from "firebase/auth";

interface AuthContextType {
  signup: (
    email: string,
    password: string,
    selectedAvatar: number
  ) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  email: string | null;
  userName: string | null;
  user: User | null;
}

// Create auth context
export const AuthContext = createContext<AuthContextType | null>(null);
