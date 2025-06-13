import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
    onAuthStateChanged, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    sendPasswordResetEmail
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase'; // Corrected import path

// 1. Create the context
export const AuthContext = createContext();

// 2. Create a custom hook for easy consumption
export const useAuth = () => {
    return useContext(AuthContext);
};

// 3. Create the Provider component
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // --- START: Restored Authentication Functions ---

    async function signup(email, password, fullName) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: fullName });
            // The user profile document will be created by the useEffect below
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

    async function resetPassword(email) {
        try {
            await sendPasswordResetEmail(auth, email);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // --- END: Restored Authentication Functions ---

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        const handleUserProfile = async () => {
            if (currentUser) {
                const userRef = doc(db, 'users', currentUser.uid);
                const docSnap = await getDoc(userRef);

                if (docSnap.exists()) {
                    setUserProfile(docSnap.data());
                } else {
                    const newProfileData = {
                        displayName: currentUser.displayName || 'New Artist',
                        bio: 'This is my creative space! Tell the world about yourself.',
                        profileImageUrl: currentUser.photoURL || `https://placehold.co/400x400/121212/FFC107?text=${currentUser.displayName ? currentUser.displayName.charAt(0) : 'A'}`,
                        videos: [],
                        posts: []
                    };
                    await setDoc(userRef, newProfileData);
                    setUserProfile(newProfileData);
                }
            } else {
                setUserProfile(null);
            }
        };

        handleUserProfile().catch(error => {
            console.error("Error handling user profile:", error);
        });
    }, [currentUser]);

    const updateUserProfile = async (newData) => {
        if (!currentUser) return;
        const userRef = doc(db, 'users', currentUser.uid);
        try {
            await updateDoc(userRef, newData);
            setUserProfile(prevProfile => ({ ...prevProfile, ...newData }));
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const value = {
        currentUser,
        userProfile,
        loading,
        signup, // Added
        login,  // Added
        logout, // Added
        resetPassword, // Added
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
