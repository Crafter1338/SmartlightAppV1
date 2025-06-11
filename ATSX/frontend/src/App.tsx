import { Box } from "@chakra-ui/react";

import HomeDevices from "./pages/HomeDevices";

export default function () {
	return (
		<>
			<Box display={'flex'} flexDir={'row'} height={'100%'} width={'100%'}>
				<HomeDevices />
			</Box>
		</>
	);
}