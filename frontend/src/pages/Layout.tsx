import { useViewport } from "@/contexts/Viewport";
import { Box, Button, CloseButton, Drawer, IconButton, Separator, Text } from "@chakra-ui/react";
import { useState } from "react";

import { House, LogOut, AlignJustify, Settings, UserRoundCog, Microchip } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "@/contexts/Authentication";

export default function Layout({ children }:any) {
    const { isSm } = useViewport();
    const navigate = useNavigate();

    const [drawerOpen, setDrawerOpen] = useState(false);

    const { email, signOut } = useAuthentication();

    return (
        <>
            <Box width={'100%'} height={'100%'} display={'flex'} flexDir={'column'}>
                {/* Drawer */}
                <Drawer.Root open={drawerOpen} placement={'start'}>
                    <Drawer.Backdrop />
                    <Drawer.Positioner>
                        <Drawer.Content>
                            <CloseButton onClick={() => setDrawerOpen(false)} pos={"absolute"} width={0} top={'0.5em'} right={'0.5em'}/>
                            
                            <Drawer.Header>
                                <Drawer.Title>Navigation</Drawer.Title>
                            </Drawer.Header>

                            <Separator/>

                            <Drawer.Body>
                                <Button width={'100%'} justifyContent={'start'} variant={"plain"} pl={0} gap={'0.8em'} _hover={{color:'blue.200'}}
                                    onClick={() => navigate('/dashboard')}
                                >
                                    <House/>
                                    Dashboard
                                </Button>

                                <Button width={'100%'} justifyContent={'start'} variant={"plain"} pl={0} gap={'0.8em'} _hover={{color:'blue.200'}}
                                    onClick={() => navigate('/settings')}
                                >
                                    <Settings/>
                                    Einstellungen
                                </Button>

                                <Box display={'flex'} alignItems={'center'} gap={"0.8em"} mt={!isSm? `2em`:'0em'} px={0} mx={0}>
                                    <Separator flex={1}/>

                                    <Text color={"fg.subtle"}><b>ADMIN</b></Text>

                                    <Separator flex={3}/>
                                </Box>

                                <Button width={'100%'} justifyContent={'start'} variant={"plain"} pl={0} gap={'0.8em'} _hover={{color:'blue.200'}}
                                    onClick={() => navigate('/admin/x')}
                                >
                                    <UserRoundCog />
                                    Accounts
                                </Button>

                                <Button width={'100%'} justifyContent={'start'} variant={"plain"} pl={0} gap={'0.8em'} _hover={{color:'blue.200'}}
                                    onClick={() => navigate('/admin/x')}
                                >
                                    <Microchip />
                                    Geräte
                                </Button>
                            </Drawer.Body>

                            <Separator/>

                            <Drawer.Footer display={'flex'} flexDir={'column'}>
                                <Text color={'fg.muted'} width={'100%'}>{ email }</Text>
                                <Button width={'100%'} variant={"subtle"} onClick={() => signOut()}>Abmelden</Button>
                            </Drawer.Footer>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Drawer.Root>

                {/* Topbar */}
                <Box display={'flex'} width={'100%'} p={"1em"} px={"1em"} bg="bg.subtle" gap={'1em'}>
                    <Box display={'flex'} flexDir={'column'} justifyContent={'center'}>
                        <IconButton onClick={() => setDrawerOpen((last) => !last)} variant={"ghost"}><AlignJustify /></IconButton>
                    </Box>
                    
                    <Box flex={1} display={'flex'} flexDir={'column'} justifyContent={'center'}>
                        <Text fontSize='xl'><b>Smartlights</b></Text>
                    </Box>

                    {!isSm &&
                        <Box flex={1} display={'flex'} flexDir={'row'} gap={"0.75em"} justifyContent={'end'} alignItems={'center'}>
                            <Text color={'fg.muted'}>{ email }</Text>
                            <IconButton variant={"ghost"} onClick={() => signOut()}><LogOut /></IconButton>
                        </Box>
                    }
                </Box>

                { children }
            </Box>
        </>
    );
}