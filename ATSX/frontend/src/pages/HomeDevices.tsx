import { Box, IconButton, Separator, Text, Menu, Portal } from "@chakra-ui/react";

import { EllipsisVertical, Plus } from "lucide-react";

import SmartLight from "../device_cards/SmartLight";
import SmartThermometer from "../device_cards/SmartThermometer";
import SmartSensor from "../device_cards/SmartSensor";

export default function() {
    return (
        <>
            <Box flex={1} h={'100%'} p={'0.75rem'} display={'flex'} flexDir={'column'} gap={'0.75rem'}>
                <Box w={'100%'} flex={1} borderRadius={'md'} bg={'bg.subtle'} p={'1rem'} display={'flex'} flexDir={'column'} gap={'1rem'} overflowY={'scroll'}
                    css={{
                        scrollbarWidth: 'none', // Firefox
                        '&::-webkit-scrollbar': {
                            display: 'none', // Chrome, Safari
                        },
                    }}
                >

                    <Box display={'flex'} flexDir={'row'} gap={'0.75rem'} alignItems={'center'}>
                        <Text flex={1} fontSize={'2xl'} fontWeight={'medium'}>Zuhause</Text>

                        <IconButton variant={'ghost'} size={'xl'}><Plus/></IconButton>	

                        <Menu.Root>
                            <Menu.Trigger asChild>
                                <IconButton variant={'ghost'} size={'xl'}><EllipsisVertical/></IconButton>
                            </Menu.Trigger>

                            <Portal>
                                <Menu.Positioner>
                                    <Menu.Content>
                                        <Menu.ItemGroup>
                                            <Menu.Item value="edit_rooms" transition={'.2s ease all'}>Räume anpassen</Menu.Item>
                                            <Menu.Item value="edit_devices" transition={'.2s ease all'}>Geräte anpassen</Menu.Item>
                                        </Menu.ItemGroup>
                                        
                                        <Separator />

                                        <Menu.ItemGroup>
                                            <Menu.Item value="add_device" transition={'.2s ease all'}>Gerät hinzufügen</Menu.Item>
                                            <Menu.Item
                                                value="remove_device"
                                                color="fg.error"
                                                _hover={{ bg: "bg.error", color: "fg.error" }}
                                                transition={'.2s ease all'}
                                            >
                                                Gerät entfernen
                                            </Menu.Item>
                                        </Menu.ItemGroup>
                                    </Menu.Content>
                                </Menu.Positioner>
                            </Portal>
                        </Menu.Root>
                    </Box>

                    <Separator />

                    <Box width={'100%'} display={'flex'} flexDir={'column'} gap={'0.75rem'} p={'0.75rem'}>
                        <Box display={'flex'} flexDir={'row'} gap={'0.75rem'} alignItems={'center'}>
                            <Text flex={1} fontSize={'xl'} fontWeight={'medium'}>Wohnzimmer</Text>
                        </Box>

                        <Box width={'100%'} display={'flex'} flexDir={'row'} gap={'1rem'} flexWrap={'wrap'}>
                            <SmartLight />
                            <SmartThermometer />
                        </Box>
                    </Box>
                </Box>

                {/*<Box w={'100%'} borderRadius={'md'} bg={'bg.subtle'} p={'1rem'} gap={'0.75rem'}>

                </Box>*/}
            </Box>
        </>
    );
}