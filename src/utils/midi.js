import WebMidi from "webmidi";
import {state} from "../state/State";
import {PORT_OUTPUT} from "../components/Midi";

const wait = ms => new Promise(r => setTimeout(r, ms));

// The MF answer within 2ms typically.

const WAIT_BETWEEN_MESSAGES = 20;

export function portById(id) {
    if (!id) return null;
    let p = WebMidi.inputs.find(item => item.id === id);
    if (p) {
        return p;
    } else {
        return WebMidi.outputs.find(item => item.id === id);
    }
}

/*
function inputById(id) {
    return WebMidi.inputs.find(item => item.id === id);
}

function outputById(id) {
    return WebMidi.outputs.find(item => item.id === id);
}
*/

/*
function inputName(id) {
    let i = inputById(id);
    return i ? i.name : null;
}

function outputName(id) {
    let i = outputById(id);
    return i ? i.name : null;
}
*/

function sendPresetRequest() {
    const P = state.midi.ports;
    for (const port_id of Object.keys(P)) {
        if (P[port_id].enabled && P[port_id].type === PORT_OUTPUT) {
            const port = portById(port_id);
            if (global.dev) console.log(`send ID request to ${port.name} ${port.id}`);
            port.sendSysex([0x00, 0x20, 0x6b], [0x07, 0x01, 0x01, 0x01, 0x19, 0x01, 0x47, 0x01]);  // use sendSysex to bypass the webmidijs internal checks.
        }
    }
}

// 146x
function sendPresetRequestData() {
    const P = state.midi.ports;
    for (const port_id of Object.keys(P)) {
        if (P[port_id].enabled && P[port_id].type === PORT_OUTPUT) {
            const port = portById(port_id);
            // if (global.dev) console.log(`send ID request to ${port.name} ${port.id}`);
            port.sendSysex([0x00, 0x20, 0x6b], [0x07, 0x01, 0x01, 0x01, 0x18, 0x00]);  // use sendSysex to bypass the webmidijs internal checks.
        }
    }
}

export async function readPreset() {
    sendPresetRequest();
    await wait(2 * WAIT_BETWEEN_MESSAGES);
    for (let i=0; i < 146; i++) {
        // console.log("readPreset", i);
        sendPresetRequestData();
        await wait(2 * WAIT_BETWEEN_MESSAGES);
    }
}
