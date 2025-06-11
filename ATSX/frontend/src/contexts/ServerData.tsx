import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const backend = "http://localhost:3000";

type ServerDataContextType = {
    socket: Socket | null;

    rooms: any[];
    devices: Record<string, any>;

    subscribeToDevice: Function;
    unsubscribeFromDevice: Function;

    unsubscribeFromAllDevices: Function;
    subscribeToAllDevices: Function;

    deviceUids: string[];
};

const ServerDataContext = createContext<ServerDataContextType | undefined>(undefined);

export const ServerDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const socketRef = useRef<Socket | null>(null);

    const [devices, setDevices] = useState({});
    const [rooms, setRooms] = useState([]);

    const [subscribedDevices, setSubscribedDevices] = useState<string[]>([]);

    const [deviceUids, setDeviceUids] = useState<string[]>([]);

    const subscribeToDevice = (uid: string) => {
        if (!socketRef.current || subscribedDevices.includes(uid)) return;

        socketRef.current.emit("subscribe", { uid });

        socketRef.current.on(`device:${uid}`, (data: any) => {
            setDevices(prev => ({ ...prev, [uid]: data }));
        });

        setSubscribedDevices(prev => [...prev, uid]);
    };

    const unsubscribeFromDevice = (uid: string) => {
        if (!socketRef.current) return;

        socketRef.current.emit("unsubscribe", { uid });
        socketRef.current.off(`device:${uid}`);

        setSubscribedDevices(prev => prev.filter(id => id !== uid));
    };

    const unsubscribeFromAllDevices = () => {
        if (!socketRef.current) return;

        subscribedDevices.forEach(uid => {
            socketRef.current!.emit("unsubscribe", { uid });
            socketRef.current!.off(`device:${uid}`);
        });

        setSubscribedDevices([]);
    }

    const subscribeToAllDevices = () => {
        if (!socketRef.current) return;

        unsubscribeFromAllDevices();

        subscribedDevices.forEach(uid => {
            socketRef.current!.emit("subscribe", { uid });
            socketRef.current!.on(`device:${uid}`, (data: any) => {
                setDevices(prev => ({ ...prev, [uid]: data }));
            });
        });

        setSubscribedDevices(deviceUids);
    } 

    useEffect(() => {
        const socket = io(backend, {
            transports: ["websocket"],
            reconnection: true,
        });

        socketRef.current = socket;

        fetch(backend+"/api/fetch-devices")
            .then(res => res.json())
            .then(data => {
                setDevices(data)

                let uids: string[] = []
                for (const [deviceUid, _deviceData] of Object.entries(data)) {
                    uids.push(deviceUid);
                }

                setDeviceUids(uids)
            });

        fetch(backend+"/api/fetch-rooms")
            .then(res => res.json())
            .then(data => setRooms(data));

        socketRef.current.on('device_uids', (data: string[]) => {
            setDeviceUids(data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <ServerDataContext.Provider value={{ socket: socketRef.current, rooms, devices, subscribeToDevice, unsubscribeFromDevice, unsubscribeFromAllDevices, subscribeToAllDevices, deviceUids }}>
            {children}
        </ServerDataContext.Provider>
    );
};

export function useServerData() {
    const context = useContext(ServerDataContext);
    if (!context || !context.socket) { throw new Error("useServerData must be used within a ServerDataProvider")}

    return context;
}