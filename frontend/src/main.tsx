import { Provider as UIProvider } from "@/components/ui/provider"
import { createRoot } from 'react-dom/client'

import { BrowserRouter } from "react-router-dom"

import './index.css'
import App from './App.tsx'
import ContextStructure from "./contexts/ContextStructure.tsx"

createRoot(document.getElementById('root')!).render(
	<UIProvider>
		<BrowserRouter>
			<ContextStructure>
				<App />
			</ContextStructure>
		</BrowserRouter>
	</UIProvider>
)
