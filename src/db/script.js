import express from "express";
import sqlite3 from "sqlite3";
import bodyParser from "body-parser";
import cors from "cors"; // импортируем пакет cors

import TelegramBot from "node-telegram-bot-api";
const token = "7043678274:AAGqFfaaqIjAOraj2oWhtMtn_xOEqsTpO2M";
const bot = new TelegramBot(token, { polling: true });

const app = express();
const port = 3000;
const db = new sqlite3.Database("recipe.db");
const adminChatId = "-1002058168701";

app.use(bodyParser.json({ limit: "50mb" })); // увеличение максимального размера тела JSON запроса до 10MB

app.use(express.json());
app.use(bodyParser.json());
app.use(cors()); // добавляем использование middleware cors
app.use(express.json({ limit: "50mb" }));
app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "https://26.97.89.160:5173");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS"
	);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});

bot.onText(/\/start/, (msg) => {
	const chatId = msg.chat.id;
	const firstName = msg.from.first_name;

	bot.sendMessage(chatId, `Привет, ${firstName}!`);
});

// Создание таблицы recipes, если она не существует
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipeName TEXT NOT NULL,
        ingredients TEXT NOT NULL,
        instructions TEXT NOT NULL,
        photo TEXT,
        type TEXT NOT NULL -- Добавляем столбец для типа рецепта
    );
`;
db.run(createTableQuery, (err) => {
	if (err) {
		console.error("Ошибка при создании таблицы:", err.message);
	} else {
		console.log("Таблица успешно создана");
	}
});

// Обработчик для сохранения рецепта в базу данных
app.post("/recipes", (req, res) => {
	const { recipeName, ingredients, instructions, photo, type } = req.body;

	const insertRecipeQuery = `
        INSERT INTO recipes (recipeName, ingredients, instructions, photo, type)
        VALUES (?, ?, ?, ?, ?);
    `;

	db.run(
		insertRecipeQuery,
		[recipeName, ingredients, instructions, photo, type],
		function (err) {
			if (err) {
				console.error("Ошибка при добавлении рецепта:", err.message);
				res.status(500).json({ error: "Ошибка при добавлении рецепта" });
			} else {
				console.log("Рецепт успешно добавлен. ID:", this.lastID);
				res
					.status(200)
					.json({ message: "Рецепт успешно добавлен", recipeId: this.lastID });

				// Отправка сообщения в административную беседу
				const message = `Новый рецепт: ${recipeName}\nИнгредиенты:${ingredients}\nИнструкция:${instructions}\nТип:${type}`;
				bot.sendMessage(adminChatId, message);
			}
		}
	);
});

// Обработчик для получения списка рецептов из базы данных
app.get("/recipes", (req, res) => {
	const selectRecipesQuery = `
        SELECT * FROM recipes;
    `;

	db.all(selectRecipesQuery, (err, recipes) => {
		if (err) {
			console.error("Ошибка при получении списка рецептов:", err.message);
			res.status(500).json({ error: "Ошибка при получении списка рецептов" });
		} else {
			console.log("Рецепты успешно получены:", recipes);
			res.status(200).json(recipes);
		}
	});
});

app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`);
});
