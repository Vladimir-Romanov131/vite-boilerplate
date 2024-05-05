import { useEffect } from "react";
import "./App.css";

import WebApp from "@twa-dev/sdk";

function App() {
	useEffect(() => {
		WebApp.MainButton.show();
		const detailsElements = document.querySelectorAll("details");
		detailsElements.forEach((detailsElement) => {
			detailsElement.addEventListener("click", () => {
				const content = detailsElement.querySelector(".hint-content");
				if (content && content instanceof HTMLElement) {
					if (detailsElement.hasAttribute("open")) {
						content.style.maxHeight = "0";
						// Обновляем maxHeight после завершения анимации
						setTimeout(() => {
							content.style.maxHeight = "";
						}, 200); // Задержка должна соответствовать продолжительности вашей CSS-транзиции
					} else {
						content.style.maxHeight = `${content.scrollHeight}px`;
					}
				}
			});
		});
	}, []);
	const handleClick = () => {
		const root = document.getElementById("mainMenu");
		const root2 = document.getElementById("Recipe");
		if (
			root &&
			root instanceof HTMLElement &&
			root2 &&
			root2 instanceof HTMLElement
		) {
			root.style.display = "none";
			root2.style.display = "block";
			WebApp.BackButton.show();
			WebApp.MainButton.hide();
		}
	};

	return (
		<>
			<main>
				<ul className="card">
					<li>
						<details id="details">
							<summary>
								<h2>Lorem ipsum</h2>
								<img
									draggable="false"
									className="logo"
									src="src\assets\tapps.png"
									alt=""
								/>
							</summary>
							<div className="hint-content">
								<p className="hint">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
									tenetur! Suscipit eos maiores temporibus, quae assumenda omnis
									sit numquam nam neque, quisquam eveniet corporis saepe
									pariatur optio et, quod facilis.
								</p>
							</div>
						</details>
					</li>
					<li>
						<details id="details">
							<summary>
								<h2>Lorem ipsum</h2>
								<img
									draggable="false"
									className="logo"
									src="src\assets\tapps.png"
									alt=""
								/>
							</summary>
							<div className="hint-content">
								<p className="hint">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
									tenetur! Suscipit eos maiores temporibus, quae assumenda omnis
									sit numquam nam neque, quisquam eveniet corporis saepe
									pariatur optio et, quod facilis.
								</p>
							</div>
						</details>
					</li>
					<li>
						<details id="details">
							<summary>
								<h2>Lorem ipsum</h2>
								<img
									draggable="false"
									className="logo"
									src="src\assets\tapps.png"
									alt=""
								/>
							</summary>
							<div className="hint-content">
								<p className="hint">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
									tenetur! Suscipit eos maiores temporibus, quae assumenda omnis
									sit numquam nam neque, quisquam eveniet corporis saepe
									pariatur optio et, quod facilis.
								</p>
							</div>
						</details>
					</li>
					<li>
						<details id="details">
							<summary>
								<h2>Lorem ipsum</h2>
								<img
									draggable="false"
									className="logo"
									src="src\assets\tapps.png"
									alt=""
								/>
							</summary>
							<div className="hint-content">
								<p className="hint">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
									tenetur! Suscipit eos maiores temporibus, quae assumenda omnis
									sit numquam nam neque, quisquam eveniet corporis saepe
									pariatur optio et, quod facilis.
								</p>
							</div>
						</details>
					</li>
					<li>
						<details id="details">
							<summary>
								<h2>Lorem ipsum</h2>
								<img
									draggable="false"
									className="logo"
									src="src\assets\tapps.png"
									alt=""
								/>
							</summary>
							<div className="hint-content">
								<p className="hint">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
									tenetur! Suscipit eos maiores temporibus, quae assumenda omnis
									sit numquam nam neque, quisquam eveniet corporis saepe
									pariatur optio et, quod facilis.
								</p>
							</div>
						</details>
					</li>
					<li>
						<details id="details">
							<summary>
								<h2>Lorem ipsum</h2>
								<img
									draggable="false"
									className="logo"
									src="src\assets\tapps.png"
									alt=""
								/>
							</summary>
							<div className="hint-content">
								<p className="hint">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
									tenetur! Suscipit eos maiores temporibus, quae assumenda omnis
									sit numquam nam neque, quisquam eveniet corporis saepe
									pariatur optio et, quod facilis.
								</p>
							</div>
						</details>
					</li>
				</ul>
			</main>
			<div className="card">
				<button onClick={handleClick}>Добавить</button>
			</div>
		</>
	);
}

export default App;
