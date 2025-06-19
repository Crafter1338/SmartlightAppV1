import Structure from "./SegmentStructure";
import { Box, Text } from "@chakra-ui/react";

import { useRoom } from "../hooks/useRoom";
import { useBackend } from "../contexts/Backend";

import AutoDevice from "../assets/devices/AutoDevice";
import { useViewport } from "../contexts/Viewport";

function Room({ uid }) {
    const { room, updateData } = useRoom(uid);
    const { width, isSm } = useViewport();

    let columns = Math.floor( (width*0.9)/230 );
    if (isSm) {
        columns = Math.floor( (width*0.9)/160 );
    }

    return (
        <Box width={'100%'} display={'flex'} flexDir={'column'} gap={'0.5rem'} pr={'0.5rem'}>
            <Text fontSize={'medium'} fontWeight={'medium'}>{room?.name}</Text>
            <Box display={'grid'} gridTemplateColumns={`repeat(${columns}, 1fr)`} gridGap={'0.4rem'}>
                {room?.device_uids?.length > 0 && room?.device_uids?.map((uid) => (<AutoDevice uid={uid} key={uid} />))}
            </Box>
        </Box>
    );
}

export default function({ setMobileDrawerOpen }) {
    const { rooms } = useBackend();

    return (
        <Structure title={'Zuhause'} setMobileDrawerOpen={ setMobileDrawerOpen }>
            <Box width={'100%'} height={'100%'} overflowY={'scroll'} scrollbarColor={'rgb(120,120,120) #111111'}>
                {rooms.map((room) => (<Room uid={room?.uid} key={room?.uid} />))}
            </Box>
        </Structure>
    );
}