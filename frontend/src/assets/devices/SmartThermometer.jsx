import { Box } from "@chakra-ui/react";
import Structure from "./DeviceStructure";
import { useDevice } from "../../hooks/useDevice";

export default function({ device, updateDevice }) {
    return (
        <Structure device={device}>
            <Box width={'100%'} height={'100%'}>
                
            </Box>
        </Structure>
    );
}