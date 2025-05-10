import { useAuthentication } from "@/contexts/Authentication";
import { Box, Button, Card, ColorPicker, HStack, parseColor, Portal, Slider } from "@chakra-ui/react";
import { useEffect } from "react";

function SmartlightCard() {
    return (
        <>
            <Card.Root w={'100%'} maxW={'400px'}>
                <Card.Header>
                    <Box>
                        <Box display={'flex'} alignItems={'center'} gap={'1em'}>
                            <Card.Title>Smartlight</Card.Title>
                            <Card.Description>xxxx-xxxx-xxxx-xxxx</Card.Description>
                        </Box>

                        <Card.Description>Keine Beschreibung</Card.Description>
                    </Box>
                </Card.Header>

                <Card.Body display={'flex'} flexDir={'column'} gap={'1em'}>
                    <Box display={'flex'} alignItems={'center'} flexDir={'row'} gap={'1em'}>
                        <Button flex={1} variant={'subtle'}>Anschalten</Button>

                        <Slider.Root disabled flex={1} defaultValue={[50]} min={0} max={255} step={1} size={'md'}>
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
                            <ColorPicker.Trigger disabled w="100%" px="2"  justifyContent={'start'} alignItems={'center'}>
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
                            <ColorPicker.Trigger disabled w="100%" px="2"  justifyContent={'start'} alignItems={'center'}>
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