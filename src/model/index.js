

const _0_100 = function (v) {
    return Math.floor(v / 127 * 100 + 0.5);
};


const _osc_type = function (v) {
    switch (v) {
        case 10:
            return "Basic Waves";
        case 21:
            return "Superwave";
        case 32:
            return "Wavetable";
        case 42:
            return "Harmonic";
        case 53:
            return "KarplusStrong";
        case 64:
            return "V. Analog";
        case 74:
            return "Waveshaper";
        case 85:
            return "Two Op. FM";
        case 95:
            return "Formant";
        case 106:
            return "Chords";
        case 117:
            return "Speech";
        case 127:
            return "Modal";
        default:
            return v;
    }
};


export const control = {
    "glide" : 5,
    "osc_type" : 9,
    "osc_wave" : 10,
    "osc_timbre" : 12,
    "osc_shape" : 13,
    "filter_cutoff" : 23,
    "filter_resonance" : 83,
    "cycling_env_rise" : 102,
    "cycling_env_fall" : 103,
    "cycling_env_hold" : 28,
    "cycling_env_amount" : 24,
    "arp_seq_rate_free" : 91,
    "arp_seq_rate_sync" : 92,
    "lfo_rate_free" : 93,
    "lfo_rate_sync" : 94,
    "envelope_attack" : 105,
    "envelope_decay" : 106,
    "envelope_sustain" : 29,
    "keyboard_hold_button" : 64,
    "keyboard_spice" : 2,
    // "Keyboard Pitch Bend	Pitchbend,
    // "Keyboard Pressure	Aftertouch,
};

// default mask for LSB and MSB : 0x7f
// default mask for MSB_lsb : 0x01
// default mask for sign in MSB_lsb : 0x02


export const matrix = {
    // TODO: nibble
    cycenv: {
        pitch: {
            name: 'Cyclic Env --> Pitch',
            LSB_msb: [22, 8, 0b01100000],   // for each byte: [row, column, mask]   mask if optional, default is 0x7F
            LSB: [22, 14],
            MSB: [22, 15]
        },
        wave: {
            name: '',
            LSB_msb: [24, 2, 0b00000110],
            LSB: [24, 3],
            MSB: [24, 0]
        },
        timbre: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        cutoff: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        assign1: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        assign2: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        assign3: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        }
    },
    env: {
        pitch: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        wave: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        timbre: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        cutoff: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        assign1: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        assign2: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        assign3: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        }
    },
    lfo: {
        pitch: {
            name: 'LFO -> Pitch',
            LSB_msb: [23, 0], LSB: [23, 1], MSB: [23, 2]
        },
        wave: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        timbre: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        cutoff: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        assign1: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        assign2: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        assign3: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        }
    },
    press: {
        pitch: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        wave: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        timbre: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        cutoff: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        assign1: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        assign2: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        assign3: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        }
    },
    key_arp: {
        pitch: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        wave: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        timbre: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        cutoff: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        assign1: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        assign2: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        },
        assign3: {
            name: '',
            LSB_msb: [0, 0], LSB: [0, 0], MSB: [0, 0]
        }
    }
};

export const control_details = {
    [control.glide]: {
        name: "Glide",
        mapping: null
    },
    [control.osc_type]: {
        name: "Type",
        mapping: _osc_type
    },
    [control.osc_wave]: {
        name: "Wave",
        mapping: null
    },
    [control.osc_timbre]: {
        name: "Timbre",
        mapping: null
    },
    [control.osc_shape]: {
        name: "Shape",
        mapping: null
    },
    [control.filter_cutoff]: {
        name: "Cutoff",
        mapping: null
    },
    [control.filter_resonance]: {
        name: "Resonance",
        mapping: null
    },
    [control.cycling_env_rise]: {
        name: "Rise",
        mapping: _0_100
    },
    [control.cycling_env_fall]: {
        name: "Fall",
        mapping: null
    },
    [control.cycling_env_hold]: {
        name: "Hold",
        mapping: null
    },
    [control.cycling_env_amount]: {
        name: "Amount",
        mapping: null
    },
    [control.arp_seq_rate_free]: {
        name: "Rate free",
        mapping: null
    },
    [control.arp_seq_rate_sync]: {
        name: "Rate sync",
        mapping: null
    },
    [control.lfo_rate_free]: {
        name: "Rate free",
        mapping: null
    },
    [control.lfo_rate_sync]: {
        name: "Rate sync",
        mapping: null
    },
    [control.envelope_attack]: {
        name: "Attack",
        mapping: null
    },
    [control.envelope_decay]: {
        name: "Decay/Rel",
        mapping: null
    },
    [control.envelope_sustain]: {
        name: "Sustain",
        mapping: null
    },
    [control.keyboard_hold_button]: {
        name: "Hold",
        mapping: null
    },
    [control.keyboard_spice]: {
        name: "Spice",
        mapping: null
    }
};
