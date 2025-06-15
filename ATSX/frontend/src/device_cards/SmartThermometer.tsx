import { Box, Card, HStack, Separator, Stat, Status, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function() {
    const [temperature, _setTemperature] = useState(20);
    const [humidity, _setHumidity] = useState(60);

    const [name, _setName] = useState('Smart Thermo');
    const [isOnline, _setIsOnline] = useState(true);
    const [battery, _setBattery] = useState(100);

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
                        <Text fontSize={'sm'} color={'fg.muted'}>Akkustand: </Text>
                        <Text fontSize={'sm'} color={'fg.muted'}>{battery}%</Text>
                    </Box>

                    <Separator />

                    <Stat.Root>
                        <Stat.Label>Temperatur:</Stat.Label>

                        <HStack>
                            <Stat.ValueText alignItems={'baseline'} gap={'0.5rem'}>
                                {temperature} 
                                <Stat.ValueUnit>°C</Stat.ValueUnit>
                            </Stat.ValueText>
                        </HStack>
                    </Stat.Root>

                    <Stat.Root>
                        <Stat.Label>Luftfeuchtigkeit:</Stat.Label>

                        <HStack>
                            <Stat.ValueText alignItems={'baseline'} gap={'0.5rem'}>
                                {humidity}
                                <Stat.ValueUnit>%</Stat.ValueUnit>
                            </Stat.ValueText>
                        </HStack>
                    </Stat.Root>
                </Card.Body>
            </Card.Root>
        </>
    );
}