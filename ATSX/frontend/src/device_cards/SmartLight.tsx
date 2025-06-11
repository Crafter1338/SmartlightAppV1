import { Box, Button, Card, ColorPicker, HStack, Portal, Separator, Status, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function() { //later: pass uid --> this also handles information updating and so on
    const [primary, setPrimary] = useState('#ffffff');
    const [secondary, setSecondary] = useState('#ffffff');
    
    const [name, setName] = useState('Smart Light');
    const [isOnline, setIsOnline] = useState(true);
    const [battery, setBattery] = useState(100);

    return (
        <>
            <Card.Root width={'15rem'} variant={'subtle'} p={'1rem'} display={'flex'} flexDir={'column'} gap={'0.25rem'}>
                <Card.Header p={0}>
                    <Status.Root size={'lg'} colorPalette={isOnline? 'green':'red'} position={'absolute'} right={'0px'} mr={'1rem'}>
                        <Status.Indicator/>
                    </Status.Root>

                    <Card.Title width={'90%'}>
                        {name}
                    </Card.Title>
                </Card.Header>

                <Card.Body p={0} display={'flex'} flexDir={'column'} gap={'0.75rem'}>
                    <Box display={'flex'} gap={'0.25rem'}>
                        <Text fontSize={'sm'} color={'fg.muted'}>Akkustand:</Text>
                        <Text fontSize={'sm'} color={'fg.muted'}>{battery}%</Text>
                    </Box>

                    <Separator />

                    <Box display={'flex'} flexDir={'row'} gap={'0.75rem'} mt={'auto'}>
                        <ColorPicker.Root size={'md'}>
                            <ColorPicker.HiddenInput />

                            <ColorPicker.Label>Primär</ColorPicker.Label>

                            <ColorPicker.Control display={'flex'} justifyContent={'center'} alignContent={'center'}>
                                <ColorPicker.Trigger />
                            </ColorPicker.Control>

                            <Portal>
                                <ColorPicker.Positioner>
                                    <ColorPicker.Content>
                                        <ColorPicker.Area />

                                        <HStack>
                                            <ColorPicker.EyeDropper size="xs" variant="outline" />
                                            <ColorPicker.Sliders />
                                        </HStack>

                                    </ColorPicker.Content>
                                </ColorPicker.Positioner>
                            </Portal>
                        </ColorPicker.Root>

                        <ColorPicker.Root size={'md'}>
                            <ColorPicker.HiddenInput />

                            <ColorPicker.Label>Sekundär</ColorPicker.Label>

                            <ColorPicker.Control  display={'flex'} justifyContent={'center'} alignContent={'center'}>
                                <ColorPicker.Trigger />
                            </ColorPicker.Control>

                            <Portal>
                                <ColorPicker.Positioner>
                                    <ColorPicker.Content>
                                        <ColorPicker.Area />

                                        <HStack>
                                            <ColorPicker.EyeDropper size="xs" variant="outline" />
                                            <ColorPicker.Sliders />
                                        </HStack>

                                    </ColorPicker.Content>
                                </ColorPicker.Positioner>
                            </Portal>
                        </ColorPicker.Root>

                        <Box flex={1} display={'flex'} flexDir={'column'}>
                            <Text flex={1} fontSize={'sm'} textAlign={'center'} fontWeight={'medium'}>Ein / Aus</Text>
                            <Button variant={'outline'}>Aus</Button>
                        </Box>
                    </Box>

                    <Button variant={'outline'} _hover={{ bg:'bg.emphasized'}}>Mehr</Button>
                </Card.Body>
            </Card.Root>
        </>
    );
}