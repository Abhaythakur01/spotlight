// src/AuthContext.js

/* global __app_id, __initial_auth_token */
// These are global variables provided by the Canvas execution environment.
// The `/* global */` directive tells ESLint that these variables are defined elsewhere
// and should not be flagged as undefined.

import React, { createContext, useContext, useEffect, useState } from 'react';
// Import auth and db from your centralized firebase.js file
import { auth, db } from './firebase'; // Correct path from src/ to src/firebase.js

// Import Firebase Auth and Firestore functions needed within this context
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithCustomToken,
  signInAnonymously,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  onSnapshot,
} from 'firebase/firestore';

// --- Auth Context for Global State Management ---
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const canvasSignIn = async () => {
      try {
        if (auth) { // Ensure auth object is available before attempting sign-in
          if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
            await signInWithCustomToken(auth, __initial_auth_token);
            console.log("Signed in with custom token.");
          } else {
            // If no custom token, sign in anonymously (e.g., for testing outside Canvas)
            await signInAnonymously(auth);
            console.log("Signed in anonymously.");
          }
        }
      } catch (error) {
        console.error("Firebase Auth initialization error:", error);
      } finally {
        setAuthLoading(false);
      }
    };

    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setUserId(user ? user.uid : crypto.randomUUID());
        if (authLoading) setAuthLoading(false);
        console.log("Auth state changed:", user ? user.uid : "no user");
      });

      if (authLoading) {
        canvasSignIn();
      }

      return () => unsubscribe();
    } else {
      setAuthLoading(false);
    }
  }, []);

  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Use __app_id if defined, otherwise a fallback ID for Firestore paths
      const currentAppId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      await setDoc(doc(db, `artifacts/${currentAppId}/public/users/${user.uid}`), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date().toISOString(),
      });
      return { success: true, user };
    } catch (error) {
      console.error("Sign up error:", error.message);
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error("Login error:", error.message);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error.message);
      return { success: false, error: error.message };
    }
  };

  const [userData, setUserData] = useState(null);
  const [privateDataLoading, setPrivateDataLoading] = useState(true);

  useEffect(() => {
    // Ensure that __app_id is defined before trying to use it in Firestore paths
    const currentAppId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

    if (db && currentUser && currentUser.uid && !authLoading) {
      setPrivateDataLoading(true);
      const userDocRef = doc(db, `artifacts/${currentAppId}/users/${currentUser.uid}/profile/details`);
      const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setUserData(null);
        }
        setPrivateDataLoading(false);
      }, (error) => {
        console.error("Error fetching private user data:", error);
        setPrivateDataLoading(false);
      });

      return () => unsubscribe();
    } else {
      setUserData(null);
      setPrivateDataLoading(false);
    }
  }, [db, currentUser, authLoading, typeof __app_id !== 'undefined' ? __app_id : 'default-app-id']); // Added __app_id to dependencies

  const updatePrivateUserData = async (data) => {
    const currentAppId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    if (!currentUser) return { success: false, error: "No user logged in." };
    try {
      await setDoc(doc(db, `artifacts/${currentAppId}/users/${currentUser.uid}/profile/details`), data, { merge: true });
      return { success: true };
    } catch (error) {
      console.error("Error updating private user data:", error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    authLoading,
    userId,
    userData,
    privateDataLoading,
    updatePrivateUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!authLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
