import { useEffect } from "react";
import "./App.css";

import WebApp from "@twa-dev/sdk";

function App() {
	useEffect(() => {
		WebApp.BackButton.show();
		WebApp.MainButton.show();
	}, []);
	const handleClick = () => {
		const root = document.getElementById("root");
		const root2 = document.getElementById("root2");
		if (root && root2) {
			root.style.display = "block";
			root2.style.display = "none";
		}
	};

	return (
		<>
			<h1>TWA + Vite + React</h1>
			<div className="card">
				<button onClick={handleClick}> Сюда</button>
			</div>
		</>
	);
}

export default App;
