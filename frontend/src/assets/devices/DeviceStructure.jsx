import { Box } from "@chakra-ui/react";

export default function({ children, device }) {
    return (
        <Box width={'100%'} height={'20vh'} bg={'red'}>
            {device?.uid}
            {children}
        </Box>
    );
}