import { useEffect } from "react";
import "./App.css";

import WebApp from "@twa-dev/sdk";

function App() {
	useEffect(() => {
		WebApp.BackButton.hide();
		WebApp.MainButton.onClick(handleClick);
		WebApp.MainButton.setText("Подтвердить");
	});

	const handleClick = () => {
		const root = document.getElementById("root");
		const mainMenu = document.getElementById("mainMenu");
		if (root && mainMenu) {
			root.style.display = "none";
			mainMenu.style.display = "block";
			WebApp.MainButton.hide();
			WebApp.BackButton.hide();
		}
	};

	return (
		<>
			<div className="card">
				<h1>Добро пожаловать в книгу рецептов</h1>
				{/*  */}
				<p className="hint">
					<b>
						Открывая это приложение, вы соглашаетесь на обработку ваших данных.
					</b>
					<br />
					Это обязательное соглашение, которое обычно применяется в приложениях
					и веб-сервисах. Обработка данных может включать в себя сбор, хранение,
					передачу и использование информации о вас, такой как имя, адрес
					электронной почты и местоположение.
				</p>
			</div>

			{/*  */}
		</>
	);
}

export default App;
