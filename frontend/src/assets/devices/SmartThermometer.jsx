import { Box, HStack, Stat } from "@chakra-ui/react";
import Structure from "./DeviceStructure";

export default function({ device, updateDevice }) {
    	const pretty = (num) => {
		let numString = String(Math.round(num*10)/10)

		if (!numString.includes('.')) {
			numString = numString + ".0";
		}

		return numString
	}

    return (
        <Structure device={device}>
            <Box width={'100%'} height={'100%'}>
                <Stat.Root flex={0}>
                    <Stat.Label>Temperatur:</Stat.Label>

                    <HStack>
                        <Stat.ValueText alignItems={'baseline'} gap={'0.5rem'}>
                            {pretty(device?.data?.temperature)}
                            <Stat.ValueUnit>°C</Stat.ValueUnit>
                        </Stat.ValueText>
                    </HStack>
                </Stat.Root>

                <Stat.Root flex={0}>
                        <Stat.Label>Luftfeuchtigkeit:</Stat.Label>

                        <HStack>
                            <Stat.ValueText alignItems={'baseline'} gap={'0.5rem'}>
                                {pretty(device?.data?.humidity)}
                                <Stat.ValueUnit>%</Stat.ValueUnit>
                            </Stat.ValueText>
                        </HStack>
                </Stat.Root>
            </Box>
        </Structure>
    );
}