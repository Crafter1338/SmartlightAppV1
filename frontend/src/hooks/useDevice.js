import { useMemo } from "react";
import { useBackend } from "../contexts/Backend";

export function useDevice(uid) {
    const { devices, socket } = useBackend();
    
    const device = useMemo(() => devices?.find(d => d?.uid === uid), [devices, uid]);

    const updateData = (newData) => {
        socket.emit("device:update", { uid, data: newData });
    }

    return {
        device,
        updateData,
    }
}