import { useEffect, createContext, useContext, useState } from "react";
import { io } from "socket.io-client";

const Context = createContext(null);

const ADRESS = import.meta.env.VITE_BACKEND;

export function BackendProvider ({ children }) {
	const [socket, setSocket] = useState(null);
	const [devices, setDevices] = useState([null]);
	const [rooms, setRooms] = useState([null]);

	useEffect(() => {
		async function fetchInitialData() {
			try {
				const [ devicesRes, roomsRes ] = await Promise.all([
					fetch(`${ADRESS}/api/devices`),
					fetch(`${ADRESS}/api/rooms`),
				]);

				if (devicesRes.ok) {
					const _devices = await devicesRes.json();

					setDevices(_devices);
				}

				if (roomsRes.ok) {
					const _rooms = await roomsRes.json();

					setRooms(_rooms);
				}
			} catch (e) {
				console.error("Fehler beim Laden der Backend-Daten:", e);
			}
		}

		fetchInitialData();

		const s = io(`${ADRESS}`);
		setSocket(s);

		s.on("device:update", ({ uid, device }) => {
			setDevices(prev =>
				prev.map(d => (d.uid === uid ? { ...d, ...device, uid } : d))
			);
		});

		s.on("room:update", ({ uid, room }) => {
			setRooms(prev =>
				prev.map(r => (r.uid === uid ? { ...r, ...room, uid } : r))
				.sort((roomA, roomB) => roomA?.index || 0 - roomB?.index)
			);
		});

		s.on("room:add", ({ room }) => {
			setRooms(prev => 
				[...prev, room]
				.sort((roomA, roomB) => roomA?.index || 0 - roomB?.index)
			);
		});

		s.on("room:remove", ({ uid }) => {
			setRooms(prev => 
				prev.filter((r) => r.uid != uid) 
				.sort((roomA, roomB) => roomA?.index || 0 - roomB?.index)
			);
		});

		return () => {
			s.disconnect();
		};
	}, []);

	return (
		<>
			<Context.Provider value={{ socket, devices, rooms }}>
				{ children }
			</Context.Provider>
		</>
	);
}

export function useBackend() {
	const context = useContext(Context);
	if (!context) { throw new Error('context for useBackend missing!') }

	return context;
}