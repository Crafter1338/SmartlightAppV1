import { Box, IconButton, Separator, Text, Menu, Portal } from "@chakra-ui/react";
import { EllipsisVertical } from "lucide-react";

export default function({ children, device }) {
    return (
        <Box width={'100%'} height={'12rem'} bg={'bg.muted'} borderRadius={'lg'} p={'.5rem'} display={'flex'} flexDir={'column'} gap={'0.25rem'}>
            <Box width={'100%'} display={'flex'} flexDir={'column'} gap={'0.5rem'}>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Text flex={1} fontSize={'lg'} fontWeight={'medium'}>{device?.name || String(device?.variant).charAt(0).toUpperCase() + String(device?.variant).substring(1)}</Text>
                    
                    <Menu.Root>
                        <Menu.Trigger asChild>
                            <IconButton variant={'outline'} size={'2xs'}><EllipsisVertical/></IconButton>
                        </Menu.Trigger>

                        <Portal>
                            <Menu.Positioner>
                                <Menu.Content display={'flex'} flexDir={'column'} gap={'0.25rem'}>
                                    <Menu.ItemGroup>
                                        <Menu.Item value="control_device" transition={'.2s ease all'}>Gerät steuern</Menu.Item>
                                        <Menu.Item value="show_device_data" transition={'.2s ease all'}>Daten anzeigen</Menu.Item>
                                    </Menu.ItemGroup>
                                    
                                    <Separator />

                                    <Menu.ItemGroup>
                                        <Menu.Item 
                                            value="remove_device" transition={'.2s ease all'} bg={'bg.error'} color={'fg.error'} _hover={{bg:'bg.emphasized'}}
                                        >
                                            Gerät ausblenden
                                        </Menu.Item>
                                    </Menu.ItemGroup>
                                </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                </Box>
                <Separator />
            </Box>

            <Box width={'100%'} flex={1} >
                {children}
            </Box>

            <Box display={'flex'} gap={'0.25rem'}>
                <Text userSelect={'none'} flex={1} textAlign={'right'} fontSize={'2xs'} color={'fg.muted'}>#</Text>
                <Text userSelect={'text'} fontSize={'2xs'} color={'fg.muted'}>{device?.uid}</Text>
            </Box>
        </Box>
    );
}