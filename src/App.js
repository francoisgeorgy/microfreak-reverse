import React, {Component} from 'react';
import Midi from "./components/Midi";
import {Provider} from "mobx-react";
import {state} from "./state/State";
import MidiPorts from "./components/MidiPorts";
import PresetSelector from "./components/PresetSelector";
import Data from "./components/Data";
import Actions from "./components/Actions";
import DeltaList from "./components/DeltaList";
import './App.css';
import {h, hs} from "./utils/hexstring";
import ModMatrix from "./components/ModMatrix";
import Controls from "./components/Controls";
import Switches from "./components/Switches";
import ModAssignSlots from "./components/ModAssignSlots";

const MESSAGE_TYPE = "sysex";
// const MESSAGE_TYPE = "midimessage";

class App extends Component {

    constructor(props) {
        super(props);
        this.inputOpenFileRef = React.createRef();
    }

    handleMidiInputEvent = (e) => {

        if (e.data[0] === 0xF8) {
            // we ignore Timing Clock messages
            return;
        }
        // if (global.dev) console.log("handleMidiInputEvent", hs(e.data), e);
        //state.data.push(Array.from(e.data));    // e.data is UInt8Array
        // do not store sysex header, sysex footer, man. id and constant data header:

        // answers:                     1  2  3  4  5  6  7  8  9  A  B  C  D  E  F  10 11 12 13 14 15 16 17 18 19 1A 1B 1C 1D 1E 1F 20
        // F0 00 20 6B 07 01 nn 20 16   00 23 56 43 4F 44 54 79 10 70 65 63 0C 2B 0A 46 00 50 61 72 61 6D 31 63 03 6E 44 20 46 50 61 72    F7
        //  0  1  2  3  4  5  6  7  8    9

        //TODO: use the sequence number to order the answers

        // eslint-disable-next-line no-undef
        // console.log(e.data.length, hs(e.data));

        if (e.data.length != 42) {
            console.log("do not store answer", hs(e.data));
            return;
        }

        // TODO: move into store:
        state.data.push(Array.from(e.data.slice(9, e.data.length - 1)));    // e.data is UInt8Array
    };

    exportAsFile = () => {

        // data to string
        let s = '';
        for (const bytes of state.data) {
            s += hs(bytes) + ' ';
        }

        let url = window.URL.createObjectURL(new Blob([s], {type: "text/plain"}));

        // let now = new Date();
        // let timestamp =
        //     now.getUTCFullYear() + "-" +
        //     ("0" + (now.getUTCMonth() + 1)).slice(-2) + "-" +
        //     ("0" + now.getUTCDate()).slice(-2) + "-" +
        //     ("0" + now.getUTCHours()).slice(-2) + "" +
        //     ("0" + now.getUTCMinutes()).slice(-2) + "" +
        //     ("0" + now.getUTCSeconds()).slice(-2);
        // let filename = `mf-reverse-${state.preset.current}.${timestamp}`;
        let filename = `mf-reverse-${state.preset.current}`;

        let shadowlink = document.createElement("a");
        shadowlink.download = filename + ".txt";
        shadowlink.style.display = "none";
        shadowlink.href = url;

        document.body.appendChild(shadowlink);
        shadowlink.click();
        document.body.removeChild(shadowlink);

        setTimeout(function() {
            return window.URL.revokeObjectURL(url);
        }, 1000);
    };

/*
    fillRandom = () => {
        const N = 40;
        for (let i=0; i < N; i++) {
            state.data.push(Array.from({length: 32}, () => Math.floor(Math.random() * 128)));
        }
    };
*/

    render() {
        return (
            <Provider state={state}>
                <Midi messageType={MESSAGE_TYPE} onMidiInputEvent={this.handleMidiInputEvent} />
                <div className="App">
                    <MidiPorts messageType={MESSAGE_TYPE} onMidiInputEvent={this.handleMidiInputEvent} />
                    <div className="row v-spaced">
                        <PresetSelector />
                        <Actions />
                    </div>
                    <div className="cols">
                        <div>
                            {/*<DeltaList />*/}
                            {/*<button type="button" onClick={this.fillRandom}>random</button>*/}
                            <button type="button midi-ok" onClick={this.exportAsFile}>Save to file</button>
                            <Data />
                        </div>
                        <div>
                            <ModMatrix />
                            <ModAssignSlots />
                            <Controls />
                            <Switches />
                        </div>
                    </div>
                </div>
            </Provider>
        );
    }

}

export default App;
