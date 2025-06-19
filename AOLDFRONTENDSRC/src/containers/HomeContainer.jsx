import { Box, Text } from "@chakra-ui/react";
import ContainerBare from "./ContainerBare";
import { SmartLight, SmartThermometer } from "../custom_components/Device";
import { useViewport } from "../contexts/Viewport";

function Room({ name, uid }) {
    const {width} = useViewport();
    let w = width*0.9;

    let widget_w = 220;
    let columns = Math.floor(w / widget_w);

    return (
        <Box width={'100%'} px={'.5rem'} display={'flex'} flexDir={'column'} gap={'0.5rem'}>
            <Text fontSize={'lg'} fontWeight={'medium'}>{name}:</Text>

            <Box display={'grid'} gridTemplateColumns={`repeat(${columns}, 1fr)`} gridGap={'0.5rem'}>
                <SmartLight deviceUID={'a796c904-81be-490f-a525-bacedf00d720'}/>
                <SmartThermometer deviceUID={'a796c904-81be-490f-a525-bacedf00d720'}/>
                <SmartLight deviceUID={'a796c904-81be-490f-a525-bacedf00d720'}/>
                <SmartThermometer deviceUID={'a796c904-81be-490f-a525-bacedf00d720'}/>
                <SmartLight deviceUID={'a796c904-81be-490f-a525-bacedf00d720'}/>
                <SmartThermometer deviceUID={'a796c904-81be-490f-a525-bacedf00d720'}/>
                <SmartLight deviceUID={'a796c904-81be-490f-a525-bacedf00d720'}/>
                <SmartThermometer deviceUID={'a796c904-81be-490f-a525-bacedf00d720'}/>
                <SmartLight deviceUID={'a796c904-81be-490f-a525-bacedf00d720'}/>
                <SmartThermometer deviceUID={'a796c904-81be-490f-a525-bacedf00d720'}/>

                <SmartLight deviceUID={'a796c904-81be-490f-a525-bacedf00d720'}/>
                <SmartThermometer deviceUID={'a796c904-81be-490f-a525-bacedf00d720'}/>
            </Box>
        </Box>
    );
}

export default function() {
    return (
        <ContainerBare title={'Zuhause'}>
            <Box width={'100%'} flex={1} overflowY={'scroll'}>
                <Room name={'Dachgeschoss'} uid={'c6d679d9-5962-4619-a9c4-a34c1835d66e'}/>
                <Room name={'Dachgeschoss'} uid={'c6d679d9-5962-4619-a9c4-a34c1835d66e'}/>
                <Room name={'Dachgeschoss'} uid={'c6d679d9-5962-4619-a9c4-a34c1835d66e'}/>
                <Room name={'Dachgeschoss'} uid={'c6d679d9-5962-4619-a9c4-a34c1835d66e'}/>
                <Room name={'Dachgeschoss'} uid={'c6d679d9-5962-4619-a9c4-a34c1835d66e'}/>
                <Room name={'Dachgeschoss'} uid={'c6d679d9-5962-4619-a9c4-a34c1835d66e'}/>
                
            </Box>
        </ContainerBare>
    );
}