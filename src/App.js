import React, {Component} from 'react';
import './App.css';
import Midi, {PORT_OUTPUT} from "./components/Midi";
import {Provider} from "mobx-react";
import {state} from "./state/State";
import MidiPorts from "./components/MidiPorts";
import PresetSelector from "./components/PresetSelector";
import {portById, readPreset} from "./utils/midi";
import {Bytes} from "./components/Bytes";
import Data from "./components/Data";
import Actions from "./components/Actions";

const MESSAGE_TYPE = "sysex";
// const MESSAGE_TYPE = "midimessage";

class App extends Component {

    handleMidiInputEvent = (e) => {
        if (e.data[0] === 0xF8) {
            // we ignore Timing Clock messages
            return;
        }
        // if (global.dev) console.log("handleMidiInputEvent", hs(e.data), e);
        state.data.push(Array.from(e.data));    // e.data is UInt8Array
    };

/*
    sendIdRequest = () => {
        const P = state.midi.ports;
        for (const port_id of Object.keys(P)) {
            if (P[port_id].enabled && P[port_id].type === PORT_OUTPUT) {
                const port = portById(port_id);
                if (global.dev) console.log(`send ID request to ${port.name} ${port.id}`);
                port.sendSysex([0x7e, 0x7f, 0x06], [0x01]);  // use sendSysex to bypass the webmidijs internal checks.
            }
        }
    };

    sendPresetRequest = () => {
        const P = state.midi.ports;
        for (const port_id of Object.keys(P)) {
            if (P[port_id].enabled && P[port_id].type === PORT_OUTPUT) {
                const port = portById(port_id);
                if (global.dev) console.log(`send ID request to ${port.name} ${port.id}`);
                port.sendSysex([0x00, 0x20, 0x6b], [0x07, 0x01, 0x01, 0x01, 0x19, 0x01, 0x47, 0x01]);  // use sendSysex to bypass the webmidijs internal checks.
            }
        }
    };

    // 146x
    sendPresetRequestData = () => {
        const P = state.midi.ports;
        for (const port_id of Object.keys(P)) {
            if (P[port_id].enabled && P[port_id].type === PORT_OUTPUT) {
                const port = portById(port_id);
                if (global.dev) console.log(`send ID request to ${port.name} ${port.id}`);
                port.sendSysex([0x00, 0x20, 0x6b], [0x07, 0x01, 0x01, 0x01, 0x18, 0x00]);  // use sendSysex to bypass the webmidijs internal checks.
            }
        }
    };

    updateRef = () => {
        state.updateRef();
    };
*/

    render() {
        return (
            <Provider state={state}>
                <Midi messageType={MESSAGE_TYPE} onMidiInputEvent={this.handleMidiInputEvent} />
                <div className="App">
                    <h2>MicroFreak CC values</h2>
                    <MidiPorts messageType={MESSAGE_TYPE} onMidiInputEvent={this.handleMidiInputEvent} />
                    <PresetSelector />
{/*
                    <div>
                        <button type="button" onClick={this.sendIdRequest}>Request ID</button>
                        <button type="button" onClick={this.sendPresetRequest}>Request Preset Header</button>
                        <button type="button" onClick={this.sendPresetRequestData}>Request Preset Data</button>
                        <button type="button" onClick={readPreset}>Read Preset {state.preset.current}</button>
                        <button type="button" onClick={readPreset}>Use as ref and re-read preset {state.preset.current}</button>
                        <button type="button" onClick={this.updateRef}>Use as ref</button>
                    </div>
*/}
                    <Actions />
                    <Data />
                </div>
            </Provider>
        );
    }

}

export default App;
