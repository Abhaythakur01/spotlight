import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail // UPDATE: Import the password reset function
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = React.createContext();

const appId = process.env.REACT_APP_PROJECT_ID;

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  async function signup(email, password, fullName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: fullName });
      const userDocPath = `artifacts/${appId}/users/${user.uid}/profile/data`;
      await setDoc(doc(db, userDocPath), {
        uid: user.uid,
        email: user.email,
        displayName: fullName,
        createdAt: new Date(),
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async function login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  function logout() {
    return signOut(auth);
  }

  // UPDATE: New function for password reset
  async function resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocPath = `artifacts/${appId}/users/${user.uid}/profile/data`;
        const userDocRef = doc(db, userDocPath);
        const userDoc = await getDoc(userDocRef);
        setCurrentUser(userDoc.exists() ? { ...user, ...userDoc.data() } : user);
        setUserId(user.uid);
      } else {
        setCurrentUser(null);
        setUserId(null);
      }
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userId,
    authLoading,
    signup,
    login,
    logout,
    resetPassword, // UPDATE: Expose the new function
  };

  return (
    <AuthContext.Provider value={value}>
      {!authLoading && children}
    </AuthContext.Provider>
  );
}
