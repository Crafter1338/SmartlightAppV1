import { Card, Box, Text, ColorPicker, Button, Separator, Portal, HStack, parseColor, Stat, Skeleton, SkeletonText, IconButton, Menu, Badge } from "@chakra-ui/react";

import { useState } from "react";

import { DeleteIcon, EllipsisVertical, Plus } from "lucide-react";
import { useEffect } from "react";
import { useBackend } from "../contexts/Backend";


function DragHandle() {
    //@dnd-kit -- Low priority
    return (
        <Box
            position={'absolute'}
            left={'37.5%'}
            top={0}
            mt={'0.5rem'}
            w={'25%'}
            h={'.4rem'}
            bg={'bg.emphasized'}
            borderRadius={'full'}
            cursor={'grab'}
            zIndex={10}
        />
    );
}

function BareStructure({device, loading, children}) {
	return (
		<>
			<Card.Root 
				width={'100%'} variant={'subtle'} p={'1rem'} 
				display={'flex'} flexDir={'column'} gap={'0.4rem'} userSelect={'none'}
			>
				<Card.Header p={0} display={'flex'} flexDir={'column'}>		
					<Skeleton loading={loading} display={'flex'} flexDir={'row'} alignItems={'center'} gap={'0.5rem'}>
						<Card.Title maxW={'85%'} mb={'0.25rem'} flexWrap={'wrap'} color={device?.online && "fg.info" || "fg.error"}>{device?.name}</Card.Title>
					</Skeleton>

                    {/*DEVICE MENU*/}
                    {!loading && <Menu.Root>
                        <Menu.Trigger asChild position={'absolute'} right={0} top={0} m={'0.5rem'}>
                            <IconButton variant={'outline'} size={'sm'}><EllipsisVertical/></IconButton>
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
                    </Menu.Root>}

					<Separator />
				</Card.Header>

				<Card.Body p={0} 
					display={'flex'} flexDir={'column'} gap={'0.75rem'}
				>
					{children}
				</Card.Body>
			</Card.Root>
		</>
	);
}

function SmartLightColorPicker({color, setColor, disabled}) {
	return (
		<>
			<ColorPicker.Root 
				size={'md'}
      			value={color} onValueChange={(e) => setColor(e.value)}
				disabled={disabled}
			>
				<ColorPicker.HiddenInput />

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
		</>
	);
}

export function SmartLight({deviceUID}) { //device.name, device.uid, device.color, device.state --> combination from online and offline document
	const {devices} = useBackend();
	
	const [device, setDevice] = useState({name: 'Smart Light', battery:100});
	const [loading, setLoading] = useState(true);

	const [primary, setPrimary] = useState(parseColor("#ffffff"));
    const [secondary, setSecondary] = useState(parseColor("#ffffff"));

	useEffect(() => {
		let device = devices.find(d => d?.uid == deviceUID);

		setDevice({name: 'Smart Thermometer', ...device});

			
		if (device) {
			setLoading(false)
		}
	}, [devices])

	return (
		<BareStructure device={device} loading={loading}>
			<Box display={'flex'} flexDir={'row'} gap={'0.75rem'} justifyContent={'space-between'} >
				<Skeleton loading={loading}>
					<Box alignItems={'center'} display={'flex'} flexDir={'column'} gap={'0.25rem'}>
						<Text fontSize={'sm'} color={"gray.400"}>Primär</Text>
						<SmartLightColorPicker disabled={!device?.online} color={primary} setColor={setPrimary}/>
					</Box>
				</Skeleton>

				<Skeleton loading={loading}>
					<Box alignItems={'center'} display={'flex'} flexDir={'column'} gap={'0.25rem'}>
						<Text fontSize={'sm'} color={"gray.400"}>Sekundär</Text>
						<SmartLightColorPicker disabled={!device?.online} color={secondary} setColor={setSecondary}/>
					</Box>
				</Skeleton>

				<Skeleton loading={loading}>
					<Box alignItems={'center'} display={'flex'} flexDir={'column'} gap={'0.25rem'}>
						<Text fontSize={'sm'} color={"gray.400"}>Ein / Aus</Text>
						<Button variant={'surface'} disabled={!device?.online}>Ein</Button>
					</Box>
				</Skeleton>
			</Box>

			<Skeleton loading={loading} mt={'auto'}>
				<Button variant={'outline'} _hover={{ bg:'bg.emphasized'}} w={'100%'}>Mehr</Button>
			</Skeleton>
		</BareStructure>
	)
}

export function SmartThermometer({deviceUID}) {
	const {devices} = useBackend();

	const [device, setDevice] = useState({name: 'Smart Thermometer', battery:100, temperature: 20, humidity: 50});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let device = devices.find(d => d?.uid == deviceUID);
		setDevice({name: 'Smart Thermometer', ...device});

		if (device) {
			setLoading(false)
		}
	}, [devices])

	const pretty = (num) => {
		let numString = String(Math.round(num*10)/10)

		if (!numString.includes('.')) {
			numString = numString + ".0";
		}

		return numString
	}

	return (
		<BareStructure device={device} loading={loading}>
			<Stat.Root flex={0}>
				<SkeletonText loading={loading} w={'50%'} noOfLines={1}>
					<Stat.Label>Temperatur:</Stat.Label>
				</SkeletonText>

				<Skeleton loading={loading}>
					<HStack>
						<Stat.ValueText alignItems={'baseline'} gap={'0.5rem'}>
							{pretty(device?.data?.temperature)}
							<Stat.ValueUnit>°C</Stat.ValueUnit>
						</Stat.ValueText>
					</HStack>
				</Skeleton>
			</Stat.Root>

			<Stat.Root flex={0}>
				<SkeletonText loading={loading} w={'50%'} noOfLines={1}>
					<Stat.Label>Luftfeuchtigkeit:</Stat.Label>
				</SkeletonText>

				<Skeleton loading={loading}>
					<HStack>
						<Stat.ValueText alignItems={'baseline'} gap={'0.5rem'}>
							{pretty(device?.data?.humidity)}
							<Stat.ValueUnit>%</Stat.ValueUnit>
						</Stat.ValueText>
					</HStack>
				</Skeleton>
			</Stat.Root>
		</BareStructure>
	)
}

export function SmartSensor({deviceUID}) { // NOT WORKING YET - LOW PRIORITY
	const [device, setDevice] = useState({name: 'Smart Sensor', battery:100})
	const [loading, setLoading] = useState(false);

	return (
		<BareStructure device={device} loading={loading}>
			<Stat.Root flex={0}>
				<SkeletonText loading={loading} w={'70%'} noOfLines={1}>
					<Stat.Label>Letzte Auslösung vor:</Stat.Label>
				</SkeletonText>

				<Skeleton loading={loading}>
					<HStack>
						<Stat.ValueText alignItems={'baseline'} gap={'0.5rem'}>
							0
							<Stat.ValueUnit>h</Stat.ValueUnit>
							0
							<Stat.ValueUnit>min</Stat.ValueUnit>
						</Stat.ValueText>
					</HStack>
				</Skeleton>
			</Stat.Root>

			<Button variant={'outline'} _hover={{ bg:'bg.emphasized'}} mt={'auto'}>Mehr</Button>
		</BareStructure>
	)
}