import { useState, useEffect } from "react";
import "./App.css";

import WebApp from "@twa-dev/sdk";

// Создаем интерфейс для описания свойств рецепта
interface Recipe {
	recipeName: string;
	photo: string;
	instructions: string;
	ingredients: string;
}

function App() {
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	useEffect(() => {
		WebApp.MainButton.hide();
		const fetchRecipes = async () => {
			try {
				const response = await fetch("http://localhost:3000/recipes");
				if (response.ok) {
					const data = await response.json();
					console.log(data);
					setRecipes(data);
				} else {
					console.error("Ошибка при получении рецептов:", response.statusText);
				}
			} catch (error) {
				console.error("Произошла ошибка при отправке запроса:", error);
			}
		};

		fetchRecipes();
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
			<header>
				<ul>
					<li>1</li>
					<li>2</li>
					<li>3</li>
					<li>4</li>
					<li>5</li>
				</ul>
			</header>
			<main>
				<ul className="card">
					{/* Маппим список рецептов и отображаем их */}
					{recipes.map((recipe, index) => (
						<li key={index}>
							<details id={`details-${index}`}>
								<summary>
									<h2>{recipe.recipeName}</h2>
									<img
										draggable="false"
										className="logo"
										src={recipe.photo}
										alt=""
									/>
								</summary>
								<div className="hint-content">
									<p className="hint">Инструкция: {recipe.instructions}</p>
									<p className="hint">Ингридиенты: {recipe.ingredients}</p>
								</div>
							</details>
						</li>
					))}
				</ul>
			</main>
			<div className="card">
				<button onClick={handleClick}>Добавить</button>
			</div>
		</>
	);
}

export default App;
