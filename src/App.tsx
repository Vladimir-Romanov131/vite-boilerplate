import { useState, useEffect } from "react";
import "./App.css";

import WebApp from "@twa-dev/sdk";

function App() {
	const [count, setCount] = useState(0);
	const [visibleElement, setVisibleElement] = useState("root");

	useEffect(() => {
		WebApp.BackButton.onClick(handleBack);
		WebApp.MainButton.show();
		WebApp.initData;
	});

	const handleClick = () => {
		const root = document.getElementById("root");
		const root2 = document.getElementById("root2");
		if (root && root2) {
			root.style.display = "none";
			root2.style.display = "block";
			setVisibleElement("root2");
		}
	};

	const handleBack = () => {
		const root = document.getElementById("root");
		const root2 = document.getElementById("root2");
		if (root && root2) {
			if (visibleElement === "root2") {
				root.style.display = "block";
				root2.style.display = "none";
				setVisibleElement("root");
			}
		}
	};

	return (
		<>
			<h1>TWA + Vite + React</h1>
			{/*  */}
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
			</div>
			{/*  */}
			<div className="card">
				<button
					onClick={() =>
						WebApp.showAlert(`Hello World! Current count is ${count}`)
					}
				>
					Show Alert
				</button>
			</div>
			{/*  */}
			<div className="card">
				<button onClick={handleClick}> Сюда</button>
			</div>
		</>
	);
}

export default App;
