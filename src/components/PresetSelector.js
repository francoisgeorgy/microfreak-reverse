import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {PORT_OUTPUT} from "./Midi";
import {portById, sendPC} from "../utils/midi";
import * as WebMidi from "webmidi";
import "./PresetSelector.css";

class PresetSelector extends Component {

    state = {
        p: '1'
    };

    setPreset = (e) => {
        let s = e.target.value;
        if (s) {
            let v = parseInt(s, 10);
            if (v > 256) {
                s = '256';
                v = 256;
            }
            if (v < 1) {
                s = '1';
                v = 1;
            }
            this.props.state.preset.current = v;
        }
        this.setState({p: s});
    };

    go = () => {
        sendPC(this.props.state.preset.current - 1);
    };

    render() {
        return (
            <div className="preset-selector">
                preset: <input type="number" id="preset" name="preset" min="1" max="256" value={this.state.p} onChange={this.setPreset} />
                <button onClick={this.go}>go</button>
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