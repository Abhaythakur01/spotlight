import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from './firebase'; // Make sure you have these exports from firebase.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = React.createContext();

// A safe identifier for the app from your environment variables.
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

      // Add the full name to the user's auth profile
      await updateProfile(user, { displayName: fullName });

      // **FIXED**: Create a user document in Firestore using the path from your security rules
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // **FIXED**: When auth state changes, get the user doc from the correct Firestore path
        const userDocPath = `artifacts/${appId}/users/${user.uid}/profile/data`;
        const userDocRef = doc(db, userDocPath);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
           // Combine auth data with firestore data
           setCurrentUser({ ...user, ...userDoc.data() });
        } else {
           // Fallback if firestore doc isn't created yet or was missed
           setCurrentUser(user);
        }
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!authLoading && children}
    </AuthContext.Provider>
  );
}
