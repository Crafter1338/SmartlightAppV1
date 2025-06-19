import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router";

import { House, LayoutDashboard, CalendarDays, User, LogOut, Settings } from "lucide-react";
import { Box, IconButton, Text, Drawer, Portal, HStack, Button, CloseButton } from "@chakra-ui/react";

import HomeSegment from "./segments/Home";
import DashboardSegment from "./segments/Dashboard";
import CalendarSegment from "./segments/Calendar";
import SettingsSegment from "./segments/Settings";
import { useViewport } from "./contexts/Viewport";
import { useState } from "react";

function Sidebar({ setMobileDrawerOpen }) {
	const navigate = useNavigate();

	const SidebarButton = ({ icon, text, onClick, selected }) => { 
		return (
			<Box display={'flex'} flexDir={'column'} gap={'0.15rem'} onClick={() => {setMobileDrawerOpen(false); onClick()}} userSelect={'none'} alignItems={'center'}>
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

export function App({ mobileDrawerOpen, setMobileDrawerOpen}) {
	const TitleBox = ({ children, ...props }) => {
		return (
			<Box userSelect={'none'} height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'0.25rem'} bg={'bg.muted'} px={'0.5rem'} borderRadius={'md'} {...props}>
				{ children }
			</Box>
		);
	}

	const {height, isSm} = useViewport();

	return (
		<>
			<Box width={'100%'} height={'100%'} p={'0.5rem'} display={'flex'} flexDir={'column'} gap={'0.5rem'}>
				<Box width={'100%'} display={'flex'} flexDir={'row'} gap={'.5rem'} height={'1.5rem'}>
					<TitleBox onClick={() => {if (isSm) {setMobileDrawerOpen(prev => !prev)}}} transitionDuration={'slow'} _hover={{bg:'bg.emphasized'}}>
						<Text fontSize={'xs'} fontWeight={'medium'}>Smarthome V 0.1</Text>
					</TitleBox>

					{!isSm && <TitleBox>
						<Text fontSize={'xs'} fontWeight={'medium'}>Made with Love</Text>
					</TitleBox>}

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
					{!isSm && <Sidebar setMobileDrawerOpen={setMobileDrawerOpen}/>}

					{isSm &&
						 <Drawer.Root size={'xs'} placement={'top'} open={mobileDrawerOpen} onOpenChange={(e) => setMobileDrawerOpen(e.open)}>
							<Portal>
								<Drawer.Backdrop />
								<Drawer.Positioner>
									<Drawer.Content>
										<Drawer.Header>
											<Drawer.Title>Navigation</Drawer.Title>
										</Drawer.Header>

										<Drawer.Body>
											<Sidebar setMobileDrawerOpen={setMobileDrawerOpen}/>
										</Drawer.Body>

										<Drawer.CloseTrigger asChild>
											<CloseButton size="sm" />
										</Drawer.CloseTrigger>
									</Drawer.Content>
								</Drawer.Positioner>
							</Portal>
						</Drawer.Root>
					}

					<Box bg={'bg.panel'} h={'100%'} flex={1} p={'0.5rem'} borderRadius={'lg'}>
						<Outlet setMobileDrawerOpen={setMobileDrawerOpen}/>
					</Box>
				</Box>
			</Box>
		</>
	);
}

export default function() {
	const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

	return (
		<>
			<Routes>
				<Route path="/app" element={<App setMobileDrawerOpen={setMobileDrawerOpen} mobileDrawerOpen={mobileDrawerOpen} />}>
					<Route path="home" element={<HomeSegment setMobileDrawerOpen={setMobileDrawerOpen}/>} />
					<Route path="dashboard" element={<DashboardSegment setMobileDrawerOpen={setMobileDrawerOpen}/>} />
					<Route path="calendar" element={<CalendarSegment setMobileDrawerOpen={setMobileDrawerOpen}/>} />
					<Route path="settings" element={<SettingsSegment setMobileDrawerOpen={setMobileDrawerOpen}/>} />

					<Route index element={<Navigate to={'/app/dashboard'} />} />
				</Route>

				<Route path="/sign-in" element={<Navigate to="/app" />} />
				<Route path="/sign-up" element={<Navigate to="/app" />} />

				<Route path="*" element={<Navigate to="/app" />} />
			</Routes>
		</>
	);
}