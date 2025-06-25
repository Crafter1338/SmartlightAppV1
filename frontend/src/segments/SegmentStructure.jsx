import { Box, Text } from "@chakra-ui/react";

export default function ({ children, title, titleChildren, setMobileDrawerOpen }) {
    return (
        <Box height={"100%"} width={"100%"} display={"flex"} gap={"0.5rem"} flexDir={"column"} userSelect={"none"}>
            <Box
                borderRadius={"md"}
                bgColor={"bg.muted"}
                p={"0.25rem"}
                px={".5rem"}
                gap={"0.25rem"}
                display={"flex"}
                flexDir={"row"}
                alignItems={"center"}
                onClick={() => setMobileDrawerOpen((prev) => !prev)}
            >
                <Text fontSize={"xl"} fontWeight={"medium"}>
                    {title}
                </Text>
                {titleChildren}
            </Box>

            <Box width={"100%"} height={"calc(100% - 3rem)"} p={"0.25rem"} display={"flex"} flexDir={"column"}>
                {children}
            </Box>
        </Box>
    );
}
