import Structure from "./SegmentStructure";
import { Box, Text } from "@chakra-ui/react";

import { useRoom } from "../hooks/useRoom";
import { useBackend } from "../contexts/Backend";

import AutoDevice from "../assets/devices/AutoDevice";

function Room({ uid }) {
    const { room, updateData } = useRoom(uid);

    return (
        <Box width={'100%'} display={'flex'} flexDir={'column'} gap={'0.5rem'} pr={'0.5rem'}>
            <Text fontSize={'medium'} fontWeight={'medium'}>{room?.name}</Text>
            <Box display={'grid'} gridTemplateColumns={'repeat(7, 1fr)'} gridGap={'0.4rem'}> {/* REPEAT AS MUCH AS SCREEN GIVES !!! */}
                {room?.device_uids?.length > 0 && room?.device_uids?.map((uid) => {
                        if (uid) return (<AutoDevice uid={uid} key={uid}/>);
                    }
                )}
            </Box>
        </Box>
    );
}

export default function() {
    const {roomUids} = useBackend();

    return (
        <Structure title={'Zuhause'}>
            <Box width={'100%'} height={'100%'} overflowY={'scroll'} scrollbarColor={'rgb(120,120,120) #111111'}>
                {roomUids.length > 0 && roomUids.map((uid) => {
                        if (uid) return (<Room uid={uid} key={uid} />);
                    }
                )}
            </Box>
        </Structure>
    );
}