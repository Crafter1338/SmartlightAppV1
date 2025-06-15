import { Provider } from "@/components/ui/provider"
import React from "react"
import ReactDOM from "react-dom/client"

import { BrowserRouter as Router } from "react-router"

import App from "./App"
import ContextStructure from "./contexts/ContextStructure"

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider>
			<Router>
				<ContextStructure>
					<App />
				</ContextStructure>
			</Router>
		</Provider>
	</React.StrictMode>,
)