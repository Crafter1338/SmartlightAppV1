import Structure from "./SegmentStructure";
import {
    Box,
    IconButton,
    Text,
    Dialog,
    CloseButton,
    Portal,
    Button,
    Input,
    Field,
    Checkbox,
    CheckboxGroup,
    Fieldset,
    For,
} from "@chakra-ui/react";

import { useRoom } from "../hooks/useRoom";
import { useBackend } from "../contexts/Backend";

import AutoDevice from "../assets/devices/AutoDevice";
import { useViewport } from "../contexts/Viewport";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

function Room({ uid }) {
    const { room, updateData } = useRoom(uid);
    const { width, isSm } = useViewport();

    let columns = Math.floor((width * 0.9) / 230);
    if (isSm) {
        columns = Math.floor((width * 0.9) / 160);
    }

    return (
        <Box width={"100%"} display={"flex"} flexDir={"column"} gap={"0.5rem"} pr={"0.5rem"}>
            <Text fontSize={"medium"} fontWeight={"medium"}>
                {room?.name}
            </Text>
            <Box display={"grid"} gridTemplateColumns={`repeat(${columns}, 1fr)`} gridGap={"0.4rem"}>
                {room?.device_uids?.length > 0 && room?.device_uids?.map((uid) => <AutoDevice uid={uid} key={uid} />)}
            </Box>
        </Box>
    );
}

function AddRoomModal() {
    const [room, setRoom] = useState({
        name: "",
        index: 0,
        device_uids: [],
    });
    const { devices, socket } = useBackend();

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <IconButton size={"sm"} variant={"subtle"} borderRadius={"100%"}>
                    <Plus width={"8px"} />
                </IconButton>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Raum Erstellen</Dialog.Title>
                        </Dialog.Header>

                        <Dialog.Body>
                            <Box display={"flex"} flexDir={"column"} gap={"0.75rem"}>
                                <Field.Root>
                                    <Field.Label>Raumname</Field.Label>
                                    <Input
                                        value={room.name}
                                        onChange={(e) =>
                                            setRoom((prev) => ({
                                                ...prev,
                                                name: String(e.target.value),
                                            }))
                                        }
                                    />
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label>Index</Field.Label>
                                    <Input
                                        value={room.index}
                                        onChange={(e) =>
                                            setRoom((prev) => ({
                                                ...prev,
                                                index: Number(e.target.value) || 0,
                                            }))
                                        }
                                    />
                                </Field.Root>

                                <Fieldset.Root maxH={"200px"} overflowY={"auto"}>
                                    <CheckboxGroup name="devices">
                                        <Fieldset.Legend fontSize="sm" mb="2">
                                            Geräte Auswählen
                                        </Fieldset.Legend>
                                        <Fieldset.Content>
                                            <For each={devices}>
                                                {(device) => {
                                                    if (device.room) {
                                                        return;
                                                    }
                                                    return (
                                                        <Checkbox.Root
                                                            key={device?.uid}
                                                            value={device?.uid}
                                                            onCheckedChange={(e) => {
                                                                if (e.checked == true) {
                                                                    setRoom((prev) => ({
                                                                        ...prev,
                                                                        device_uids: [
                                                                            ...prev?.device_uids,
                                                                            String(device?.uid),
                                                                        ],
                                                                    }));
                                                                } else {
                                                                    setRoom((prev) => ({
                                                                        ...prev,
                                                                        device_uids: prev?.device_uids.filter(
                                                                            (d) => String(d?.uid) == String(device?.uid)
                                                                        ),
                                                                    }));
                                                                }
                                                            }}
                                                        >
                                                            <Checkbox.HiddenInput />
                                                            <Checkbox.Control />

                                                            <Checkbox.Label>
                                                                {device?.name || device?.uid}
                                                            </Checkbox.Label>
                                                        </Checkbox.Root>
                                                    );
                                                }}
                                            </For>
                                        </Fieldset.Content>
                                    </CheckboxGroup>
                                </Fieldset.Root>
                            </Box>
                        </Dialog.Body>

                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>

                        <Dialog.Footer>
                            <Box
                                w={"100%"}
                                display={"flex"}
                                gap={"0.5rem"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                            >
                                <Dialog.ActionTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        flex={1}
                                        onClick={() => {
                                            console.log(JSON.stringify(room));
                                            socket.emit("room:add", { data: room });
                                            setRoom({ name: "", index: 0, device_uids: [] });
                                        }}
                                    >
                                        Erstellen
                                    </Button>
                                </Dialog.ActionTrigger>

                                <Dialog.ActionTrigger asChild>
                                    <Button variant={"outline"} flex={1} color={"fg.error"}>
                                        Abbrechen
                                    </Button>
                                </Dialog.ActionTrigger>
                            </Box>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

function RemoveRoomModal() {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <IconButton size={"sm"} variant={"subtle"} borderRadius={"100%"}>
                    <Minus width={"8px"} />
                </IconButton>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Raum Entfernen</Dialog.Title>
                        </Dialog.Header>

                        <Dialog.Body>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </p>
                        </Dialog.Body>

                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

export default function ({ setMobileDrawerOpen }) {
    const { rooms } = useBackend();

    return (
        <>
            <Structure
                title={"Zuhause"}
                setMobileDrawerOpen={setMobileDrawerOpen}
                titleChildren={
                    <Box
                        display={"flex"}
                        flex={1}
                        h={"100%"}
                        alignItems={"center"}
                        justifyContent={"end"}
                        gap={"0.5rem"}
                    >
                        <AddRoomModal />
                        <RemoveRoomModal />
                    </Box>
                }
            >
                <Box
                    width={"100%"}
                    height={"100%"}
                    overflowY={"scroll"}
                    scrollbarColor={"rgb(120,120,120) #111111"}
                    display={"flex"}
                    flexDir={"column"}
                    gap={"1rem"}
                >
                    {rooms.map((room) => (
                        <Room uid={room?.uid} key={room?.uid} />
                    ))}
                </Box>
            </Structure>
        </>
    );
}
