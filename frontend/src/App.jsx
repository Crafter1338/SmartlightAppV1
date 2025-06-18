import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router";

import { House, LayoutDashboard, CalendarDays, User, LogOut, Settings } from "lucide-react";
import { Box, IconButton, Text } from "@chakra-ui/react";

import HomeSegment from "./segments/Home";
import DashboardSegment from "./segments/Dashboard";
import CalendarSegment from "./segments/Calendar";
import SettingsSegment from "./segments/Settings";
import { useViewport } from "./contexts/Viewport";

function Sidebar() {
	const navigate = useNavigate();

	const SidebarButton = ({ icon, text, onClick, selected }) => { 
		return (
			<Box display={'flex'} flexDir={'column'} gap={'0.15rem'} onClick={onClick} userSelect={'none'}>
				<Box px={'0.6rem'}>
					<IconButton size={'sm'} variant={selected? 'solid':'subtle'} bgColor={selected && 'rgba(255,255,255,0.85)'}>
						{icon}
					</IconButton>
				</Box>
				<Text textAlign={'center'} fontSize={'2xs'} fontWeight={'bold'}>
					{text}
				</Text>
			</Box>
		);
	}

	return (
		<Box height={'100%'} py={'0.6rem'} bgColor={'bg.panel'} borderRadius={'lg'} display={'flex'} flexDir={'column'} gap={'0.75rem'}>
			<SidebarButton icon={<LayoutDashboard />} text={'Dash'} onClick={() => navigate("dashboard")} selected={window.location.pathname == '/app/dashboard'}/>
			<SidebarButton icon={<House />} text={'Zuhause'} onClick={() => navigate("home")} selected={window.location.pathname == '/app/home'}/>
			<SidebarButton icon={<CalendarDays />} text={'Kalender'} onClick={() => navigate("calendar")} selected={window.location.pathname == '/app/calendar'}/>

			<div style={{ flex:1 }}></div>

			<SidebarButton icon={<Settings />} text={'Settings'} onClick={() => navigate("settings")} selected={window.location.pathname == '/app/settings'}/>
		</Box>
	);
}

export function App() {
	const TitleBox = ({ children, ...props }) => {
		return (
			<Box userSelect={'none'} height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'0.25rem'} bg={'bg.muted'} px={'0.5rem'} borderRadius={'md'} {...props}>
				{ children }
			</Box>
		);
	}

	const {height} = useViewport();

	return (
		<>
			<Box width={'100%'} height={'100%'} p={'0.5rem'} display={'flex'} flexDir={'column'} gap={'0.5rem'}>
				<Box width={'100%'} display={'flex'} flexDir={'row'} gap={'.5rem'} height={'1.5rem'}>
					<TitleBox>
						<Text fontSize={'xs'} fontWeight={'medium'}>Smarthome V 0.1</Text>
					</TitleBox>

					<TitleBox>
						<Text fontSize={'xs'} fontWeight={'medium'}>Made with Love</Text>
					</TitleBox>

					<div style={{ flex:1 }}></div>

					<TitleBox onClick={() => {console.log('Userbutton clicked')}} transitionDuration={'slow'} _hover={{bg:'bg.emphasized'}}>
						<Box display={'flex'} alignItems={'center'} gap={'0.25rem'}>
							<Text fontSize={'xs'} fontWeight={'medium'}>stickel.nico</Text>
							<User width={'15px'}/>
						</Box>
					</TitleBox>

					<TitleBox onClick={() => {console.log('LogOut clicked')}} transitionDuration={'slow'} _hover={{bg:'bg.emphasized'}}>
						<Box display={'flex'} alignItems={'center'} gap={'0.25rem'}>
							<LogOut width={'15px'}/>
						</Box>
					</TitleBox>
				</Box>

				<Box width={'100%'} height={`calc(${height}px - 3rem)`} display={'flex'} flexDir={'row'} gap={'0.5rem'}>
					<Sidebar />

					<Box bg={'bg.panel'} h={'100%'} flex={1} p={'0.5rem'} borderRadius={'lg'}>
						<Outlet />
					</Box>
				</Box>
			</Box>
		</>
	);
}

export default function() {
	return (
		<>
			<Routes>
				<Route path="/app" element={<App />}>
					<Route path="home" element={<HomeSegment />} />
					<Route path="dashboard" element={<DashboardSegment />} />
					<Route path="calendar" element={<CalendarSegment />} />
					<Route path="settings" element={<SettingsSegment />} />

					<Route index element={<Navigate to={'/app/dashboard'} />} />
				</Route>

				<Route path="*" element={<Navigate to="/app" />} />
			</Routes>
		</>
	);
}