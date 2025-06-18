import Structure from "./SegmentStructure";
import { Box, Text } from "@chakra-ui/react";
import { useRoom } from "../hooks/useRoom";
import { useBackend } from "../contexts/Backend";

function Room({ uid }) {
    const { room, updateData } = useRoom(uid);

    return (
        <Box width={'100%'} display={'flex'} flexDir={'column'} gap={'0.5rem'} pr={'0.5rem'}>
            <Text fontSize={'medium'} fontWeight={'medium'}>{room?.name}</Text>
            <Box display={'grid'} gridTemplateColumns={'repeat(10, 1fr)'} gridGap={'0.25rem'}>
                {room?.deviceUids?.length > 0 && room?.deviceUids?.map((uid) => {
                        if (uid) return (<> </>); //Device (uid)
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
            <Box width={'100%'} overflowY={'scroll'}>
                {roomUids.length > 0 && roomUids.map((uid) => {
                        if (uid) return (<Room uid={uid} key={uid} />);
                    }
                )}
            </Box>
        </Structure>
    );
}