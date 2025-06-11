import { Box } from "@chakra-ui/react"
import { Routes, Route, Navigate } from "react-router";

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";

export default function() {
	return (
		<>
			<Routes>
				<Route 
					path="/home"
					element={<HomePage />}
				/>

				<Route
					path="/dashboard"
					element={<DashboardPage />}
				/>

				<Route
					path="/dev"
					element={<HomePage />}
				/>

				<Route
					path="*"
					element={<Navigate to="/dev" />}
				/>
			</Routes>
		</>
	);
}