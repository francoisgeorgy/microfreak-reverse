import React, {Component} from 'react';
import './App.css';
import Midi from "./components/Midi";
import {Provider} from "mobx-react";
import {state} from "./state/State";
import MidiPorts from "./components/MidiPorts";
import PresetSelector from "./components/PresetSelector";

class App extends Component {

    handleMidiInputEvent = (e) => {
        if (e.data[0] === 0xF8) {
            // we ignore Timing Clock messages
            return;
        }
        // if (global.dev) console.log("handleMidiInputEvent", hs(e.data), e);
        if (global.dev) console.log(`handleMidiInputEvent: ${e.controller.number}=${e.value}`);
        state.preset[e.controller.number] = e.value;
    };

    render() {


        return (
            <Provider state={state}>
                <Midi messageType="controlchange" onMidiInputEvent={this.handleMidiInputEvent} />
                <div className="App">
                    <h2>MicroFreak CC values</h2>
                    <MidiPorts messageType="controlchange" onMidiInputEvent={this.handleMidiInputEvent} />
                    <PresetSelector />
                    <div>
                    </div>
                </div>
            </Provider>
        );
    }

}

export default App;
