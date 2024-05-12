import { useEffect } from "react";
import "./App.css";

import WebApp from "@twa-dev/sdk";

function App() {
	useEffect(() => {
		const disclaimerShown = localStorage.getItem("disclaimerShown");
		if (!disclaimerShown) {
			// Показываем сообщение только если disclaimerShown не установлен
			WebApp.BackButton.hide();
			WebApp.MainButton.onClick(handleClick);
			WebApp.MainButton.setText("Подтвердить");
		} else {
			// Иначе показываем главное меню
			const root = document.getElementById("root");
			const mainMenu = document.getElementById("mainMenu");
			if (root && mainMenu) {
				root.style.display = "none";
				mainMenu.style.display = "block";
				WebApp.MainButton.hide();
				WebApp.BackButton.hide();
			}
		}
	}, []);

	const handleClick = () => {
		// После нажатия кнопки подтверждения, сохраняем информацию о показанном сообщении в локальное хранилище
		localStorage.setItem("disclaimerShown", "true");

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
				{/* Отображаем сообщение только если disclaimerShown не установлен */}
				{!localStorage.getItem("disclaimerShown") && (
					<p className="hint">
						<b>
							Открывая это приложение, вы соглашаетесь на обработку ваших
							данных.
						</b>
						<br />
						Это обязательное соглашение, которое обычно применяется в
						приложениях и веб-сервисах. Обработка данных может включать в себя
						сбор, хранение, передачу и использование информации о вас, такой как
						имя, адрес электронной почты и местоположение.
					</p>
				)}
			</div>
		</>
	);
}

export default App;
