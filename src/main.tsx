import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import App2 from "./App2.tsx";
import "./index.css";

import WebApp from "@twa-dev/sdk";

WebApp.ready();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
ReactDOM.createRoot(document.getElementById("root2")!).render(
	<React.StrictMode>
		<App2 />
	</React.StrictMode>
);
