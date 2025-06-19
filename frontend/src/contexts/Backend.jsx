import { useEffect, createContext, useContext, useState } from "react";
import { io } from "socket.io-client";

const Context = createContext(null);

//const ADRESS = "http://192.168.2.116:2000";
const ADRESS = "http://31.97.47.250:2000";

export function BackendProvider ({ children }) {
	const [socket, setSocket] = useState(null);
	const [devices, setDevices] = useState([null]);
	const [rooms, setRooms] = useState([null]);
	
	const [deviceUids, setDeviceUids] = useState([null]);
	const [roomUids, setRoomUids] = useState([null]);

	useEffect(() => {
		async function fetchInitialData() {
			try {
				const [ devicesRes, roomsRes ] = await Promise.all([
					fetch(`${ADRESS}/api/devices`),
					fetch(`${ADRESS}/api/rooms`),
				]);

				if (devicesRes.ok) {
					const _devices = await devicesRes.json();

					setDeviceUids(_devices.map((d) => d.uid));
					setDevices(_devices);
				}

				if (roomsRes.ok) {
					const _rooms = await roomsRes.json();

					setRoomUids(_rooms.map((r) => r.uid));
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
			);
		});

		return () => {
			s.disconnect();
		};
	}, []);

	return (
		<>
			<Context.Provider value={{ socket, devices, rooms, deviceUids, roomUids }}>
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