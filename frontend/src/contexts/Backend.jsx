import { useEffect, createContext, useContext, useState } from "react";
import { io } from "socket.io-client";

const Context = createContext(null);

const ADRESS = "http://http://srv868971.hstgr.cloud/";

export function BackendProvider ({ children }) {
	const [socket, setSocket] = useState(null);
	const [devices, setDevices] = useState([null]);
	const [rooms, setRooms] = useState([null]);
	
	const [deviceUids, setDeviceUids] = useState([null]);

	useEffect(() => {
		async function fetchInitialData() {
			try {
				const [devicesRes, roomsRes, deviceUidRes] = await Promise.all([
					fetch(`${ADRESS}/api/devices`),
					fetch(`${ADRESS}/api/rooms`),
					fetch(`${ADRESS}/api/devices-uids`),
				]);

				if (devicesRes.ok) setDevices(await devicesRes.json());
				if (roomsRes.ok) setRooms(await roomsRes.json());
				if (deviceUidRes.ok) setDeviceUids(await deviceUidRes.json());
			} catch (e) {
				console.error("Fehler beim Laden der Backend-Daten:", e);
			}
		}

		fetchInitialData();

		const s = io(`${ADRESS}:2000`);
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
			<Context.Provider value={{ socket, devices, rooms, deviceUids }}>
				{ children }
			</Context.Provider>
		</>
	);
}

export function useBackend() {
	const context = useContext(Context)
	if (!context) { throw new Error('context for useBackend missing!') }

	return context;
}