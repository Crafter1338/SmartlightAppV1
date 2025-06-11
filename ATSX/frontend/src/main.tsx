import { Provider } from "@/components/ui/provider"
import ReactDOM from "react-dom/client"
import App from "./App"
import ContextStructure from "./contexts/ContextStructure"

import { BrowserRouter as Router } from "react-router"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<Provider>
		<Router>
			<ContextStructure>
				<App />
			</ContextStructure>
		</Router>
	</Provider>
)