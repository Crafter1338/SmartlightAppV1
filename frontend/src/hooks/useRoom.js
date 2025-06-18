import { useMemo } from "react";
import { useBackend } from "../contexts/Backend";

export function useRoom(uid) {
    const { rooms, socket } = useBackend();
    
    const room = useMemo(() => rooms?.find(r => r?.uid === uid), [rooms, uid]);

    const updateData = (newData) => {
        socket.emit("room:update", { uid, data: newData });
    }

    return {
        room,
        updateData,
    }
}