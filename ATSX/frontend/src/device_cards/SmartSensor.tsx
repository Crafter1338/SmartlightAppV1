import { Box, Card, HStack, Separator, Stat, Status, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function() {
    const [name, setName] = useState('Smart Sensor');
    const [isOnline, _setIsOnline] = useState(true);
    const [battery, _setBattery] = useState(100);

    const [lastTrigger, _setLastTrigger] = useState(Date.now())

    const [passedHours, setPassedHours] = useState(0)
    const [passedMinutes, setPassedMinutes] = useState(0)
    const [_passedSeconds, setPassedSeconds] = useState(0)

    useEffect(() => { // from chat
        const interval = setInterval(() => {
            const now = Date.now();
            const diffMs = now - lastTrigger;

            const totalSeconds = Math.floor(diffMs / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            setPassedHours(hours);
            setPassedMinutes(minutes);
            setPassedSeconds(seconds);
        }, 1000);

        return () => clearInterval(interval);
    }, [lastTrigger]);

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
                        <Stat.Label>Letzte Auslösung vor:</Stat.Label>

                        <HStack>
                            <Stat.ValueText alignItems={'baseline'} gap={'0.5rem'}>
                                {passedHours}
                                <Stat.ValueUnit>h</Stat.ValueUnit>
                                {passedMinutes}
                                <Stat.ValueUnit>min</Stat.ValueUnit>
                            </Stat.ValueText>
                        </HStack>
                    </Stat.Root>

                    <Button variant={'outline'} _hover={{ bg:'bg.emphasized'}} mt={'auto'}>Mehr</Button>
                </Card.Body>
            </Card.Root>
        </>
    );
}