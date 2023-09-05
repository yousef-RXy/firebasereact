import { useState } from "react";
import { auth, googleProvider } from "../config/Firebase";
import {
	createUserWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";

export const Auth = () => {
	const [email, setEmail] = useState("");
	const [password, setpassword] = useState("");

	console.log(auth?.currentUser?.email);

	const signIn = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.error(error);
		}
	};

	const signInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
		} catch (error) {
			console.error(error);
		}
	};

	const Logout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<input
				placeholder="Email"
				onChange={(e) => setEmail(e.target.value)}
			/>

			<input
				placeholder="Password"
				type="Password"
				onChange={(e) => setpassword(e.target.value)}
			/>

			<button onClick={signIn}>signIn</button>

			<button onClick={signInWithGoogle}>signIn With Google</button>

			<button onClick={Logout}>Logout</button>
		</div>
	);
};
