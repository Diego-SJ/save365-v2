import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { IUser } from '../typings/types'

var firebaseConfig = {
	apiKey: 'AIzaSyDKU6IM2kwXysgaXJ9_qACVZhF0uSap_us',
	authDomain: 'save365-a896f.firebaseapp.com',
	projectId: 'save365-a896f',
	storageBucket: 'save365-a896f.appspot.com',
	messagingSenderId: '266495585080',
	appId: '1:266495585080:web:2b3b6b60781771b752afcd',
	measurementId: 'G-GRE7NW9174'
}
// Initialize Firebase
!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore().collection('saves365')

const mapUserFromFirebaseAuth = (user: any) => {
	if (user) {
		return {
			uid: user.uid,
			displayName: user.displayName,
			email: user.email,
			photoURL: user.photoURL
		} as IUser
	}
	return null
}

export const getAllDays = (uid: string) => {
	return db
		.doc(uid)
		.get()
		.then((snap: any) => {
			const days = snap.data()?.days?.map((i: any) => ({ ...i, amount: i?.amount || 0 }))
			return days
		})
}

export const saveNewDay = (array: any, uid: string) => {
	console.log(array)
	return db.doc(uid).set({ days: array })
}

export const signOutGoogle = () => {
	firebase.auth().signOut()
}

export const loginWithGoogle = () => {
	const provider = new firebase.auth.GoogleAuthProvider()
	return firebase
		.auth()
		.signInWithPopup(provider)
		.then(({ user }) => mapUserFromFirebaseAuth(user))
}

export const onAuthStateChanged = (onChange: any) => {
	return firebase.auth().onAuthStateChanged((user) => {
		const normalizedUser = mapUserFromFirebaseAuth(user)
		onChange(normalizedUser)
	})
}

export const deleteAccount = async (uid: number) => {
	try {
		await db.doc(uid.toString()).delete()
		return true
	} catch (error) {
		return false
	}
}
