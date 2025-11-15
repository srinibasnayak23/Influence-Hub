
import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, type User, AuthErrorCodes } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp, type Firestore } from "firebase/firestore";
import { auth, db } from "./client";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

async function storeUser(user: User, role: 'influencer' | 'brand', fullName?: string) {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
        await setDoc(userRef, {
            uid: user.uid,
            displayName: user.displayName || fullName,
            email: user.email,
            photoURL: user.photoURL,
            role: role,
            createdAt: serverTimestamp(),
        });
    }
}


export async function signInWithGoogle(role: 'influencer' | 'brand') {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await storeUser(result.user, role);
    return result.user;
  } catch (error: any) {
    console.error("Error signing in with Google: ", error);
    if (error.code === AuthErrorCodes.POPUP_CLOSED_BY_USER) {
        throw new Error("Sign-in process was cancelled.");
    }
    throw new Error("Could not sign in with Google. Please try again.");
  }
}

export async function signUpWithEmail(fullName: string, email: string, password: string, role: 'influencer' | 'brand') {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await storeUser(result.user, role, fullName);
        return result.user;
    } catch (error: any) {
        if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
            throw new Error("An account already exists with this email address.");
        }
        if (error.code === AuthErrorCodes.WEAK_PASSWORD) {
            throw new Error("Password should be at least 6 characters.");
        }
        throw new Error("Could not create account. Please try again.");
    }
}

export async function signInWithEmail(email: string, password: string) {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user;
    } catch (error: any) {
       if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
            throw new Error("Invalid email or password.");
       }
       throw new Error("An unexpected error occurred. Please try again.");
    }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
}

export async function getUserProfile(db: Firestore, userId: string) {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
        return userDoc.data();
    }
    return null;
}
