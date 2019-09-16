import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {PORT_OUTPUT} from "./Midi";
import {portById, sendPC} from "../utils/midi";
import * as WebMidi from "webmidi";
import "./PresetSelector.css";

class PresetSelector extends Component {

    setPreset = (e) => {
        if (!e.target.value) return;
        const v = parseInt(e.target.value, 10);
        if (v > 256) return;
        this.props.state.preset.current = v;
        // console.log("setPreset", this.props.state.preset.current, this.props.state.preset.reference);
        // this.selectPreset(this.props.state.preset.current - 1);
        sendPC(this.props.state.preset.current - 1);
    };

    render() {
        return (
            <div className="preset-selector">
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