import React, { useState } from "react";
import "./App.css";
import WebApp from "@twa-dev/sdk";

const AddRecipeForm: React.FC = () => {
	const [type, setType] = useState("");
	const [recipeName, setRecipeName] = useState("");
	const [ingredients, setIngredients] = useState("");
	const [instructions, setInstructions] = useState("");
	const [photo, setPhoto] = useState<File | null>(null);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (
			!type.trim() ||
			!recipeName.trim() ||
			!ingredients.trim() ||
			!instructions.trim() ||
			!photo
		) {
			WebApp.showAlert("Пожалуйста, заполните все поля и выберите фото");
			return;
		}

		const base64Image = await readImage(photo);

		const formData = {
			type,
			recipeName,
			ingredients,
			instructions,
			photo: base64Image,
		};

		try {
			const response = await fetch("http://localhost:3000/recipes", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				WebApp.showAlert("Рецепт успешно добавлен");
				setType("");
				setRecipeName("");
				setIngredients("");
				setInstructions("");
				setPhoto(null);

				// После успешного добавления рецепта скрываем форму и показываем главное меню
				handleClick();

				// Обновляем страницу
				window.location.reload();
			} else {
				WebApp.showAlert("Ошибка при добавлении рецепта");
			}
		} catch (error) {
			console.error("Ошибка при отправке данных на сервер:", error);
			WebApp.showAlert("Произошла ошибка при отправке данных на сервер");
		}
	};

	const readImage = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				resolve(reader.result?.toString() || "");
			};
			reader.onerror = (error) => {
				reject(error);
			};
		});
	};
	const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && files.length > 0) {
			setPhoto(files[0]);
		}
	};

	const handleClick = () => {
		const root = document.getElementById("mainMenu");
		const root2 = document.getElementById("Recipe");
		if (
			root &&
			root instanceof HTMLElement &&
			root2 &&
			root2 instanceof HTMLElement
		) {
			root.style.display = "block";
			root2.style.display = "none";
			WebApp.BackButton.show();
			WebApp.MainButton.hide();
		}
	};

	return (
		<>
			<div className="card">
				<form className="Form" onSubmit={handleSubmit}>
					<label className="form-item">
						Название рецепта:
						<input
							type="text"
							value={recipeName}
							onChange={(e) => setRecipeName(e.target.value)}
						/>
					</label>
					<label className="form-item">
						Ингредиенты:
						<textarea
							value={ingredients}
							onChange={(e) => setIngredients(e.target.value)}
						/>
					</label>
					<label className="form-item">
						Инструкция:
						<textarea
							value={instructions}
							onChange={(e) => setInstructions(e.target.value)}
						/>
					</label>
					<label className="form-item">
						Тип:
						<select value={type} onChange={(e) => setType(e.target.value)}>
							<option value="">Выберите тип</option>
							<option value="Супы">Супы</option>
							<option value="Борщи">Борщи</option>
							<option value="Салаты">Салаты</option>
							<option value="Напитки">Напитки</option>
							{/* какие еще есть? */}
						</select>
					</label>
					<label className="form-item">
						Фото:
						<input type="file" accept="image/*" onChange={handlePhotoChange} />
					</label>
					<button type="submit">Добавить рецепт</button>
				</form>
			</div>
		</>
	);
};

export default AddRecipeForm;
