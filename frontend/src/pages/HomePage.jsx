import { Box, Text, IconButton, Menu, Portal, Separator } from "@chakra-ui/react";

import { EllipsisVertical, Plus } from "lucide-react";
import Room from "../custom_components/Room";
import { SmartLight, SmartSensor, SmartThermometer } from "../custom_components/Device";

import { useBackend } from "../contexts/Backend.jsx";
import { useEffect } from "react";

export default function() {
	const {devices} = useBackend();

	return (
		<>
			{/* WRAPPER */}
			<Box
				w={'100%'} h={'100%'} p={'1rem'}
			>
				{/* VISUAL BOX */}
				<Box
					w={'100%'} h={'100%'} p={'1rem'} bg={'rgb(15,15,15)'} borderRadius={'2xl'}
					display={'flex'} flexDir={'column'} gap={'1rem'}
				>
					{/* TITLE */}
					<Box
						display={'flex'} flexDir={'row'} gap={'0.75rem'} alignItems={'center'}
					>
						<Text flex={1} fontSize={'2xl'} fontWeight={'medium'}>Zuhause</Text>

						<Menu.Root>
							<Menu.Trigger asChild>
								<IconButton variant={'ghost'} size={'xl'}><EllipsisVertical/></IconButton>
							</Menu.Trigger>

							<Portal>
								<Menu.Positioner>
									<Menu.Content display={'flex'} flexDir={'column'} gap={'0.25rem'}>
										<Menu.ItemGroup>
											<Menu.Item value="edit_home" transition={'.2s ease all'}>Zuhause anpassen</Menu.Item>
											<Menu.Item value="edit_rooms" transition={'.2s ease all'}>Räume anpassen</Menu.Item>
											<Menu.Item value="edit_devices" transition={'.2s ease all'}>Geräte anpassen</Menu.Item>
										</Menu.ItemGroup>
									</Menu.Content>
								</Menu.Positioner>
							</Portal>
						</Menu.Root>
					</Box>

					<Separator />

					{/*ROOM WRAPPER*/}
					<Box
						flex={1} flexDir={'column'} gap={'0.75rem'} alignItems={'center'} overflowY={'scroll'} 
						css={{ // Hide Scrollbar
							scrollbarWidth: 'none',
							'&::-webkit-scrollbar': {
								display: 'none',
							},
						}}
					>
						<Room name={'Wohnzimmer'}>
							{devices?.map(device => {
								if (!device) {return}
                                switch (device?.variant) {
                                    case 'smartlight':
                                        return <SmartLight key={device?.uid} deviceUID={device?.uid} />;
                                    case 'thermometer':
                                        return <SmartThermometer key={device?.uid} deviceUID={device?.uid} />;
                                    case 'sensor':
                                        return <SmartSensor key={device?.uid} deviceUID={device?.uid} />;
                                    default:
                                        console.warn(`Unbekannter Gerätevariante: ${device?.variant} für Gerät ${device?.uid}`);
                                        return null;
                                }
                            })}
						</Room>
					</Box>
				</Box>
			</Box>
		</>
	);
}