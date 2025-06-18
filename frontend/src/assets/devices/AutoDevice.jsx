import { useDevice } from "../../hooks/useDevice";
import SmartThermometer from "./SmartThermometer";

export default function({ uid }) {
    const {device, updateDevice} = useDevice(uid);

    if (device.variant == "thermometer") {
        return <SmartThermometer device={device} updateDevice={updateDevice} />
    }
}