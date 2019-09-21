import {inject, observer} from "mobx-react";
import React, {Component} from "react";
import {portById, readPreset} from "../utils/midi";
import {PORT_OUTPUT} from "./Midi";

class Actions extends Component {

/*
    sendIdRequest = () => {
        const P = this.props.state.midi.ports;
        for (const port_id of Object.keys(P)) {
            if (P[port_id].enabled && P[port_id].type === PORT_OUTPUT) {
                const port = portById(port_id);
                if (global.dev) console.log(`send ID request to ${port.name} ${port.id}`);
                port.sendSysex([0x7e, 0x7f, 0x06], [0x01]);  // use sendSysex to bypass the webmidijs internal checks.
            }
        }
    };

    sendPresetRequest = () => {
        const P = this.props.state.midi.ports;
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
        const P = this.props.state.midi.ports;
        for (const port_id of Object.keys(P)) {
            if (P[port_id].enabled && P[port_id].type === PORT_OUTPUT) {
                const port = portById(port_id);
                if (global.dev) console.log(`send ID request to ${port.name} ${port.id}`);
                port.sendSysex([0x00, 0x20, 0x6b], [0x07, 0x01, 0x01, 0x01, 0x18, 0x00]);  // use sendSysex to bypass the webmidijs internal checks.
            }
        }
    };
*/

    updateRef = () => {
        this.props.state.updateRef();
    };

    updateRefAndRead = () => {
        this.props.state.updateRef();
        // noinspection JSIgnoredPromiseFromCall
        readPreset();
    };

    clearRef = () => {
        this.props.state.clearRef();
    };

    render() {
        const S = this.props.state;
        return (
            <div>
                {/*<button type="button" onClick={this.sendIdRequest}>Request ID</button>*/}
                {/*<button type="button" onClick={this.sendPresetRequest}>Request Preset Header</button>*/}
                {/*<button type="button" onClick={this.sendPresetRequestData}>Request Preset Data</button>*/}
                <button type="button" onClick={readPreset}>Read preset {S.preset.current}</button>
                <button type="button" onClick={this.updateRefAndRead}>Update ref and read preset {S.preset.current}</button>
                <button type="button" onClick={this.updateRef}>Update ref</button>
                <button type="button" onClick={this.clearRef}>Clear ref</button>
                {/*{S.preset.current_counter > 0 && <span> [{Math.round(S.preset.current_counter / 40 * 100)}%]</span>}*/}
            </div>
        );
    }
}

export default inject('state')(observer(Actions));
