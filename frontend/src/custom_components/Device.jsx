import { Card, Box, Text, ColorPicker, Button, Separator, Portal, HStack, parseColor, Stat, Skeleton, SkeletonText, IconButton, Menu, Badge } from "@chakra-ui/react";

import { useState } from "react";

import { EllipsisVertical, Plus } from "lucide-react";
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
				width={'16rem'} variant={'subtle'} p={'1rem'} 
				display={'flex'} flexDir={'column'} gap={'0.4rem'} userSelect={'none'}
			>
				<Card.Header p={0} display={'flex'} flexDir={'column'} gap={'0.55rem'}>		
					<Skeleton loading={loading} display={'flex'} flexDir={'row'} alignItems={'center'} gap={'0.5rem'}>
						<Card.Title maxW={'85%'} flexWrap={'wrap'}>{device?.name}</Card.Title>
					</Skeleton>

					<Skeleton loading={loading} w={'60%'}>
						<Box display={'flex'} gap={'0.25rem'} alignItems={'center'}>
							<Box borderRadius={'0.1rem'} width={'0.7rem'} aspectRatio={1} background={device?.online? 'rgb(93, 228, 93)':'rgb(235, 72, 72)'} />
							<Text fontSize={'sm'} color={'fg.muted'}>Akkustand:</Text>
							<Text fontSize={'sm'} color={'fg.muted'}>{device?.battery}%</Text>
						</Box>
					</Skeleton>

                    {/*DEVICE MENU*/}
                    <Menu.Root>
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
                    </Menu.Root>

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

function SmartLightColorPicker({color, setColor}) {
	return (
		<>
			<ColorPicker.Root 
				size={'md'}
      			value={color} onValueChange={(e) => setColor(e.value)}
			>
				<ColorPicker.HiddenInput />

				<ColorPicker.Label>Sekundär</ColorPicker.Label>

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
	const [device, setDevice] = useState({name: 'Smart Light', battery:100});
	const [loading, setLoading] = useState(false);

	const [primary, setPrimary] = useState(parseColor("#ffffff"));
    const [secondary, setSecondary] = useState(parseColor("#ffffff"));

	return (
		<BareStructure device={device} loading={loading}>
			<Box display={'flex'} flexDir={'row'} gap={'0.75rem'} justifyContent={'space-between'} mt={'auto'}>
				<Skeleton loading={loading}>
					<SmartLightColorPicker color={primary} setColor={setPrimary}/>
				</Skeleton>

				<Skeleton loading={loading}>
					<SmartLightColorPicker color={secondary} setColor={setSecondary}/>
				</Skeleton>

				<Skeleton loading={loading}>
					<Box flex={1} display={'flex'} flexDir={'column'} h={'100%'}>
						<Text flex={1} fontSize={'sm'} textAlign={'center'} fontWeight={'medium'}>Ein / Aus</Text>
						<Button variant={'outline'}>Aus</Button>
					</Box>
				</Skeleton>
			</Box>

			<Skeleton loading={loading}>
				<Button variant={'outline'} _hover={{ bg:'bg.emphasized'}} w={'100%'}>Mehr</Button>
			</Skeleton>
		</BareStructure>
	)
}

export function SmartThermometer({deviceUID}) {
	const {devices} = useBackend();

	const [device, setDevice] = useState({name: 'Smart Thermometer', battery:100, temperature: 20, humidity: 50});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setDevice({name: 'Smart Thermometer', ...devices.find(d => d.uid == deviceUID)});
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