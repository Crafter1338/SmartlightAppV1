import { useAuthentication } from "@/contexts/Authentication";
import { Box, Button, Card, ColorPicker, HStack, parseColor, Portal, Slider } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function SmartlightCard() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const uid = 'xxxx-xxxx-xxxx-xxxx'

    const [lightState, setLightState] = useState(false);
    const [brightness, setBrightness] = useState(0);

    const [primaryColor, setPrimaryColor] = useState();
    const [secondaryColor, setSecondaryColor] = useState();

    return (
        <>
            <Card.Root w={'100%'} maxW={'400px'}>
                <Card.Header>
                    <Box>
                        <Box display={'flex'} alignItems={'center'} gap={'1em'}>
                            <Card.Title>{name || 'Smartlight'}</Card.Title>
                            <Card.Description>{uid}</Card.Description>
                        </Box>

                        <Card.Description>{description || 'Keine Beschreibung'}</Card.Description>
                    </Box>
                </Card.Header>

                <Card.Body display={'flex'} flexDir={'column'} gap={'1em'}>
                    <Box display={'flex'} alignItems={'center'} flexDir={'row'} gap={'1em'}>
                        <Button flex={1} variant={lightState? 'solid':'subtle'}
                            onClick={() => setLightState((prev) => !prev)}
                        >
                            {lightState? 'Ausschalten':'Anschalten'}
                        </Button>

                        <Slider.Root variant='solid' disabled={!lightState} flex={1} defaultValue={[brightness]} min={0} max={255} step={1} size={'md'}
                            onChange={(e) => {setBrightness( Number((e.target as HTMLInputElement).value) )}}
                        >
                            <Slider.Label>Helligkeit</Slider.Label>
                            <Slider.Control>
                                <Slider.Track>
                                    <Slider.Range />
                                </Slider.Track>

                                <Slider.Thumb>
                                    <Slider.DraggingIndicator />
                                    <Slider.HiddenInput />
                                </Slider.Thumb>
                            </Slider.Control>
                        </Slider.Root>

                    </Box>

                    <ColorPicker.Root defaultValue={parseColor("#eb5e41")} w="100%">
                        <ColorPicker.HiddenInput />
                        <ColorPicker.Label>Primär</ColorPicker.Label>
                        <ColorPicker.Control w="100%">
                            <ColorPicker.Trigger disabled={!lightState} w="100%" px="2"  justifyContent={'start'} alignItems={'center'}>
                                <ColorPicker.ValueSwatch boxSize="6" />
                                <ColorPicker.ValueText minW="160px" />
                            </ColorPicker.Trigger>
                        </ColorPicker.Control>
                        <Portal>
                            <ColorPicker.Positioner>
                            <ColorPicker.Content>
                                <ColorPicker.Area/>
                                <HStack>
                                    <ColorPicker.EyeDropper size="sm" variant="outline" />
                                    <ColorPicker.Sliders />
                                    <ColorPicker.ValueSwatch />
                                </HStack>
                            </ColorPicker.Content>
                            </ColorPicker.Positioner>
                        </Portal>
                    </ColorPicker.Root>

                    <ColorPicker.Root defaultValue={parseColor("#eb5e41")} w="100%">
                        <ColorPicker.HiddenInput />
                        <ColorPicker.Label>Sekundär</ColorPicker.Label>
                        <ColorPicker.Control w="100%">
                            <ColorPicker.Trigger disabled={!lightState} w="100%" px="2"  justifyContent={'start'} alignItems={'center'}>
                                <ColorPicker.ValueSwatch boxSize="6" />
                                <ColorPicker.ValueText minW="160px" />
                            </ColorPicker.Trigger>
                        </ColorPicker.Control>
                        <Portal>
                            <ColorPicker.Positioner>
                            <ColorPicker.Content>
                                <ColorPicker.Area/>
                                <HStack>
                                    <ColorPicker.EyeDropper size="sm" variant="outline" />
                                    <ColorPicker.Sliders />
                                    <ColorPicker.ValueSwatch />
                                </HStack>
                            </ColorPicker.Content>
                            </ColorPicker.Positioner>
                        </Portal>
                    </ColorPicker.Root>
                </Card.Body>
            </Card.Root>
        </>
    );
}

export default function Dashboard() {
    const { verify } = useAuthentication();

    useEffect(() => {
        //verify();
    }, [])

    return (
        <>
            <Box p={'2em'}>
                <SmartlightCard />

            </Box>
        </>
    );
}