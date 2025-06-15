import { Box, Text } from "@chakra-ui/react";

//TODO: Implement useRoom and useDevice
export default function({name, children}) {
    return (
        <>
            {/*ROOM*/}
            <Box
                width={'100%'} p={'0.75rem'}
                display={'flex'} flexDir={'column'} gap={'0.75rem'}
            >
                {/*ROOM TITLE*/}
                <Box
                    display={'flex'} flexDir={'row'} gap={'0.75rem'} alignItems={'center'}
                >
                    <Text flex={1} fontSize={'xl'} fontWeight={'medium'}>{name || 'Unbenannt'}</Text>
                </Box>

                {/*DEVICES WRAPPER*/}
                <Box 
                    width={'100%'} display={'flex'} flexDir={'row'} gap={'1rem'} flexWrap={'wrap'}
                >
                    {children}
                </Box>
            </Box>
        </>
    );
}