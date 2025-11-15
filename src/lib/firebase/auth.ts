
import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, type User } from "firebase/auth";
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
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    throw error;
  }
}

export async function signUpWithEmail(fullName: string, email: string, password: string, role: 'influencer' | 'brand') {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await storeUser(result.user, role, fullName);
        return result.user;
    } catch (error) {
        console.error("Error signing up with email: ", error);
        throw error;
    }
}

export async function signInWithEmail(email: string, password: string) {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user;
    } catch (error) {
        console.error("Error signing in with email: ", error);
        throw error;
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
