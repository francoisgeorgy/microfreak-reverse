import {decorate, observable} from 'mobx';
import {PORT_INPUT, PORT_OUTPUT} from "../components/Midi";
import {ASSIGN1, DEFAULT_msb_mask, DEFAULT_sign_mask, MOD_ASSIGN_SLOT, multibytesValue} from "../model";

class State {

    midi = {
        ports: {},
    };

    // preset = new Array(127).fill(0);

    preset = {
        current: 1,
        reference: null,
        current_counter: 0
    };

    lock = false;

    data = [];
    dataRef = [];   // copy used as reference for comparisons

    addPort(port) {
        // eslint-disable-next-line
        if (this.midi.ports.hasOwnProperty(port.id) && this.midi.ports[port.id] !== null) {
            // already registered
            return false;
        }
        if (global.dev) console.log('State.addPort', port.type, port.name, port.id);
        this.midi.ports[port.id] = {
            type: port.type,
            name: port.name,
            manufacturer: port.manufacturer,
            enabled: false
            // minimized: false,   // TODO
            // nb_messages: 0,
            // solo: false,        // TODO
            // color: null,        // TODO
            // muted: false,       // TODO
            // hidden: false       // TODO
        };
        return true;
    }

    removePort(port_id) {
        if (global.dev) console.log('State.removePort', port_id);
        // delete this.midi.ports[port.id];    // do not use delete with mobx; see https://github.com/mobxjs/mobx/issues/822
        this.midi.ports[port_id] = null;
    }

    removeAllPorts() {
        if (global.dev) console.log('State.removeAllPorts');
        // delete this.midi.ports[port.id];    // do not use delete with mobx; see https://github.com/mobxjs/mobx/issues/822
        this.midi.ports = {};
    }

    enablePort(port_id) {
        if (this.midi.ports[port_id]) {
            this.midi.ports[port_id].enabled = true;
        }
    }

    disablePort(port_id) {
        // this.midi.input = null;
        if (this.midi.ports[port_id]) {
            this.midi.ports[port_id].enabled = false;
            // this.midi.ports[port_id].solo = false;
            // this.midi.ports[port_id].muted = false;
        }
    }

    /**
     *
     * @param port
     * @param messageType only used if port is input
     * @param onMidiInputEvent only used if port is input
     */
    connectPort(port, messageType = null, onMidiInputEvent = null) {
        if (global.dev) console.log(`Midi.connectPort: ${port.type} ${port.id} ${port.name}`);
        if (port.type === PORT_INPUT) {
            if (port.hasListener(messageType, 'all', onMidiInputEvent)) {
                console.warn(`Midi.connectPort: ${port.id} ${port.name} : ${messageType} messages on all channels listener already connected`);
            } else {
                if (global.dev) console.log(`Midi.connectPort: ${port.id} ${port.name} : add listener for ${messageType} messages on all channels`);
                port.addListener(messageType, 'all', onMidiInputEvent);
            }
        }

        // there is nothing else to do to "connect" an OUTPUT port.

        this.enablePort(port.id);

        // if (global.dev) console.log(`Midi.connectPort: set input input_device_id=${port.id} in preferences`);
        // savePreferences({input_device_id: port.id});
    }

    disconnectPort(port, updatePreferences=false) {
        if (port) {     // port is probably already null
            if (global.dev) console.log(`Midi.disconnectPort: ${port.type} ${port.id} ${port.name}`);
            if (port.type === PORT_INPUT) {
                if (port.removeListener) port.removeListener();
            }

            // there is nothing to do to "connect" an OUTPUT port.

            this.disablePort(port.id);

            // if (global.dev) console.log(`Midi.connectInput: connect input set input_device_id=null in preferences`);
            // if (updatePreferences) savePreferences({input_device_id: null});
        }
    }

    disconnectAllPorts(updatePreferences=false) {
        if (global.dev) console.log('Midi.disconnectAllPorts');
        // for (let port of this.midi.ports) {
        //     this.disconnectPort(port);
        // }
        for (const port_id of Object.keys(this.midi.ports)) {
            this.disconnectPort(port_id);
        }
    }

    /**
     * Returns true if at least one input is enabled
     */
    hasInputEnabled() {
        for (const port_id of Object.keys(this.midi.ports)) {
            if (this.midi.ports[port_id].type === PORT_INPUT && this.midi.ports[port_id].enabled) return true;
        }
        return false;
    }

    /**
     * Returns true if at least one output is enabled
     */
    hasOutputEnabled() {
        for (const port_id of Object.keys(this.midi.ports)) {
            if (this.midi.ports[port_id].type === PORT_OUTPUT && this.midi.ports[port_id].enabled) return true;
        }
        return false;
    }

    hasInputAndOutputEnabled() {
        return this.hasInputEnabled() && this.hasOutputEnabled();
    }

    updateRef() {
        // console.log("updateRef: copy current to reference", JSON.stringify(this.data), JSON.stringify(this.dataRef));
        this.dataRef = JSON.parse(JSON.stringify(this.data));
        this.preset.reference = this.preset.current;
        // console.log(JSON.stringify(this.data), JSON.stringify(this.dataRef));
    }

    clearRef() {
        this.dataRef = [];
    }

    modMatrixValue(m) {

        // const D = this.props.state.data;
        // console.log("m", m, D.length);
        if (this.data.length < 39) return 0;  //FIXME

        if (!m) {
            console.log("modMatrixValue, no def for", m);
            return 0;
        }

        const mask_msb = m.msb.length === 3 ? m.msb[2] : DEFAULT_msb_mask;
        const mask_sign = m.sign.length === 3 ? m.sign[2] : DEFAULT_sign_mask;

        const raw = multibytesValue(
            this.data[ m.MSB[0] ][ m.MSB[1] ],
            this.data[ m.LSB[0] ][ m.LSB[1] ],
            this.data[ m.msb[0] ][ m.msb[1] ],
            mask_msb,
            this.data[ m.sign[0] ][ m.sign[1] ],
            mask_sign);

        return Math.round(raw * 1000 / 32768) / 10;
    }

    controlValue(m) {

        // const D = this.props.state.data;
        // console.log("m", m, D.length);

        if (this.data.length < 39) return 0;  //FIXME

        const mask_msb = m.msb.length === 3 ? m.msb[2] : DEFAULT_msb_mask;
        // const mask_sign = m.sign.length === 3 ? m.sign[2] : DEFAULT_sign_mask;

        const raw = multibytesValue(
            this.data[ m.MSB[0] ][ m.MSB[1] ],
            this.data[ m.LSB[0] ][ m.LSB[1] ],
            this.data[ m.msb[0] ][ m.msb[1] ],
            mask_msb,
            0, 0);

        //TODO: apply mapping or round value
        return Math.round(raw * 1000 / 32768) / 10;
    }

    switchValue(m) {

        // const D = this.props.state.data;
        // console.log("m", m, D.length);
        if (this.data.length < 39) return 0;  //FIXME

        const mask_msb = m.msb.length === 3 ? m.msb[2] : DEFAULT_msb_mask;
        // const mask_sign = m.sign.length === 3 ? m.sign[2] : DEFAULT_sign_mask;

        const raw = multibytesValue(
            this.data[ m.MSB[0] ][ m.MSB[1] ],
            this.data[ m.LSB[0] ][ m.LSB[1] ],
            this.data[ m.msb[0] ][ m.msb[1] ],
            mask_msb,
            0, 0);

        // return Math.round(raw * 1000 / 32768) / 10;

        return m.mapping ? m.mapping(raw) : raw;
    }

    /**
     *
     * @param assign_slot ASSIGN1, ASSIGN2 or ASSIGN3 symbol
     */
    modAssignGroup(slot) {
        if (this.data.length < 39) return;  //FIXME
        const m = MOD_ASSIGN_SLOT[slot].group;
        const group = this.data[ m[0] ][ m[1] ];
        console.log("modAssignGroup", m, group);
        return group;
    };

    /**
     *
     * @param assign_slot ASSIGN1, ASSIGN2 or ASSIGN3 symbol
     */
    modAssignControl(slot) {
        if (this.data.length < 39) return;  //FIXME
        const m = MOD_ASSIGN_SLOT[slot].control;
        const control = this.data[ m[0] ][ m[1] ];
        return control;
    };

}

// https://mobx.js.org/best/decorators.html
decorate(State, {
    midi: observable,
    preset: observable,
    data: observable,
    dataRef: observable,
    lock: observable
});

export const state = new State();
