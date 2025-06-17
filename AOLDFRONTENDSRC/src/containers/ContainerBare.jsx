import { Box, Text } from "@chakra-ui/react";
import { useViewport } from "../contexts/Viewport";

export default function({ children, title, titleChildren, ...props}) {

    return (
        <Box height={'100%'} bg={'green'} width={'100%'} {...props} display={'flex'} gap={'0.5rem'} flexDir={'column'}>
            <Box borderRadius={'md'} bgColor={'bg.muted'} p={'0.25rem'} px={'.5rem'} gap={'0.25rem'} display={'flex'} flexDir={'row'} alignItems={'center'}>
                <Text fontSize={'xl'} fontWeight={'medium'}>{title}</Text>
                { titleChildren }
            </Box>

            <Box width={'100%'} flex={1} p={'0.25rem'} overflowY="auto" bg={'red'}>
                { children }
            </Box>
        </Box>
    );
}