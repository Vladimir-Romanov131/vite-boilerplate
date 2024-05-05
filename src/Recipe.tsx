import { useEffect } from "react";
import "./App.css";

import WebApp from "@twa-dev/sdk";

function App() {
	useEffect(() => {
		WebApp.BackButton.onClick(handleClick);
	}, []);
	const handleClick = () => {
		const root = document.getElementById("Recipe");
		const root2 = document.getElementById("mainMenu");
		if (root && root2) {
			root.style.display = "none";
			root2.style.display = "block";
			WebApp.BackButton.hide();
			WebApp.MainButton.hide();
		}
	};

	return (
		<>
			<header className="header header-main">ff</header>

			{/* <div className="card">
				<button onClick={handleClick}> Сюда</button>
			</div> */}
		</>
	);
}

export default App;
