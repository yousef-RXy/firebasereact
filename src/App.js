import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { auth, db, storage } from "./config/Firebase";
import {
	getDocs,
	collection,
	addDoc,
	deleteDoc,
	doc,
	updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
	const [movieList, setMovieList] = useState([]);

	const [newMovieTitle, setNewMovieTitle] = useState("");
	const [updatedTitle, setUpdatedTitle] = useState("");
	const [newReleaseDate, setNewReleaseDate] = useState(0);
	const [isAnimation, setIsAnimation] = useState(false);

	const [fileUpload, setFileUpload] = useState(null);

	const movieCollectionRef = collection(db, "Movies");

	useEffect(() => {
		getMovieList();
	}, []);

	const getMovieList = async () => {
		try {
			const data = await getDocs(movieCollectionRef);
			const filterdData = data.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setMovieList(filterdData);
		} catch (error) {
			console.error(error);
		}
	};

	const onSubmitMovie = async () => {
		try {
			await addDoc(movieCollectionRef, {
				title: newMovieTitle,
				relasedate: newReleaseDate,
				animation: isAnimation,
				userId: auth?.currentUser?.uid,
			});
			getMovieList();
		} catch (error) {
			console.error(error);
		}
	};

	const deleteMovie = async (id) => {
		try {
			const movieDoc = doc(db, "Movies", id);
			await deleteDoc(movieDoc);
			getMovieList();
		} catch (error) {
			console.error(error);
		}
	};

	const updateMovieTitle = async (id) => {
		try {
			const movieDoc = doc(db, "Movies", id);
			await updateDoc(movieDoc, { title: updatedTitle });
			getMovieList();
		} catch (error) {
			console.error(error);
		}
	};

	const uploadFile = async () => {
		if (!fileUpload) return;
		const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
		try {
			await uploadBytes(filesFolderRef, fileUpload);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="App">
			<Auth />

			<br />

			<div>
				<input
					placeholder="Movie title..."
					onChange={(e) => setNewMovieTitle(e.target.value)}
				/>
				<input
					placeholder="Release Date..."
					type="number"
					onChange={(e) => setNewReleaseDate(Number(e.target.value))}
				/>
				<input
					type="checkbox"
					checked={isAnimation}
					onChange={(e) => setIsAnimation(e.target.checked)}
				/>
				<label> Animation? </label>
				<button onClick={onSubmitMovie}> Submit Movie</button>
			</div>

			<div>
				{movieList.map((movie) => (
					<div key={movie.id}>
						<h1 style={{ color: movie.animation ? "green" : "red" }}>
							{movie.title}
						</h1>
						<p> Date: {movie.relasedate} </p>

						<button onClick={() => deleteMovie(movie.id)}> Delete Movie</button>

						<input
							placeholder="new title..."
							onChange={(e) => setUpdatedTitle(e.target.value)}
						/>

						<button onClick={() => updateMovieTitle(movie.id)}>
							Update Title
						</button>
					</div>
				))}
			</div>
			<div>
				<input
					type="file"
					onChange={(e) => setFileUpload(e.target.files[0])}
				/>
				<button onClick={uploadFile}> Upload File </button>
			</div>
		</div>
	);
}

export default App;
