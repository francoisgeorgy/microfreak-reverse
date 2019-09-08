import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {PORT_OUTPUT} from "./Midi";
import {portById} from "../utils/midi";
import * as WebMidi from "webmidi";
import "./PresetSelector.css";

class PresetSelector extends Component {

/*
    state = {
        direct_access: false
    };

    toggleDirectAccess = () => {
        this.setState({direct_access: !this.state.direct_access})
    };
*/
    selectPreset = n => {
        const P = this.props.state.midi.ports;
        // const out = outputById(this.props.state.midi.output);
        for (const port_id of Object.keys(P)) {
            if (P[port_id].type === PORT_OUTPUT) {
                const port = portById(port_id);
                if (global.dev) console.log(`send PC ${n} to ${port.name} ${port.id}`);
                port.sendControlChange(WebMidi.MIDI_CONTROL_CHANGE_MESSAGES.bankselectcoarse, n < 128 ? 0 : 1);
                port.sendProgramChange(n % 128);
            }
        }
    };

    setPreset = (e) => {
        if (!e.target.value) return;
        const v = parseInt(e.target.value, 10);
        if (v > 256) return;
        this.props.state.preset.current = v;
        console.log("setPreset", this.props.state.preset.current, this.props.state.preset.reference);
        this.selectPreset(this.props.state.preset.current - 1);
    };

    render() {
        return (
            <div>
                preset: <input type="number" id="preset" name="preset" min="1" max="256" value={this.props.state.preset.current} onChange={this.setPreset} />
            </div>
        );

/*
        const pc = [];
        for (let i=0; i<256; i++){
            pc.push(<div key={i} onClick={() => this.selectPreset(i)}>{i}</div>);
        }

        return (
            <div className="preset-selector">
                <div className="seq-access">
                    <div>prev</div>
                    <div>next</div>
                    <div className="toggle" onClick={this.toggleDirectAccess}>&#8943;</div>
                </div>
                <div className="direct-access">{this.state.direct_access && pc}</div>
            </div>
        );
*/
    }

}

export default inject('state')(observer(PresetSelector));