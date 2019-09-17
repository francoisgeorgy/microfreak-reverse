
// TODO: move into model
import {h} from "../utils/hexstring";
import {getRightShift} from "../utils/bits-utils";

export const matrixValue = (MSB, LSB, msb_byte, mask_msb, sign_byte, mask_sign) => {

    console.log("matrixValue", h(MSB), h(LSB), h(msb_byte), mask_sign, mask_msb);

    const j = getRightShift(mask_sign);
    const sign_bit = (sign_byte >> j) & 0x01;

    const k = getRightShift(mask_msb);
    const msb_bit = (msb_byte >> j) & 0x01;

    // const neg = msb & 0x02;
    const high = (MSB & 0x7f) << 8;
    const mid  = LSB & 0x7f;
    const low = msb_bit << 7;
    const n = high + mid + low;
    let f;
    if (sign_bit) {
        const c2 = ((~n) & 0x7fff) + 1;
        f = - (c2 * 1000 / 32768);
    } else {
        f = n * 1000 / 32768;
    }
    return Math.round(f) / 10;
};


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

export const DEFAULT_msb_mask = 0x01;
export const DEFAULT_sign_mask = 0x02;

export const CYC_ENV = Symbol();
export const ENV = Symbol();
export const PRESS = Symbol();
export const KEY_ARP = Symbol();
export const LFO = Symbol();

export const PITCH = Symbol();
export const WAVE = Symbol();
export const TIMBRE = Symbol();
export const CUTOFF = Symbol();
export const ASSIGN1 = Symbol();
export const ASSIGN2 = Symbol();
export const ASSIGN3 = Symbol();

// names (labels)
export const MOD_SOURCE = {
    [CYC_ENV] : 'Cyclic Env',
    [ENV]: 'Env',
    [LFO]: 'LFO',
    [PRESS]: 'Pressure',
    [KEY_ARP]: 'Key/Arp'
};

// names (labels)
export const MOD_DESTINATION = {
    [PITCH]: 'Pitch',
    [WAVE]: 'Wave',
    [TIMBRE]: 'Timbre',
    [CUTOFF]: 'Cutoff',
    [ASSIGN1]: 'Assign 1',
    [ASSIGN2]: 'Assign 2',
    [ASSIGN3]: 'Assign 3'
};

// [row, col] for data receives when reading preset. Data does not include sysex header, sysex footer, man. id and constant data header
export const MOD_MATRIX = {
    // TODO: nibble
    [CYC_ENV]: {
        [PITCH]: {
            MSB: [22, 15],
            LSB: [22, 14],
            msb: [22, 8, 0x20],
            sign: [22, 8, 0x40]
        },
        [WAVE]: {
            MSB: [24, 3],
            LSB: [24, 2],
            msb: [24, 0, 0x02],
            sign: [24, 0, 0x04]
        },
        [TIMBRE]: {
            MSB: [25, 22],
            LSB: [25, 21],
            msb: [25, 16, 0x10],
            sign: [25, 16, 0x20]
        },
        [CUTOFF]: {
            MSB: [27, 10],
            LSB: [27, 9],
            msb: [27, 8, 0x01],
            sign: [27, 8, 0x02]
        },
        [ASSIGN1]: {
            MSB: [28, 29],
            LSB: [28, 28],
            msb: [28, 24, 0x08],
            sign: [28, 24, 0x10]
        },
        [ASSIGN2]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        },
        [ASSIGN3]: {
            MSB: [0, ],
            LSB: [0, ],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        }
    },
    [ENV]: {
        [PITCH]: {
            MSB: [22, 25],
            LSB: [22, 23],
            msb: [22, 16, 0x01],
            sign: [22, 16, 0x02]
        },
        [WAVE]: {
            MSB: [24, 3],
            LSB: [24, 2],
            msb: [24, 0, 0x02],
            sign: [24, 0, 0x04]
        },
        [TIMBRE]: {
            MSB: [25, 31],
            LSB: [25, 30],
            msb: [25, 24, 0x20],
            sign: [25, 24, 0x40]
        },
        [CUTOFF]: {
            MSB: [27, 19],
            LSB: [27, 18],
            msb: [27, 16, 0x02],
            sign: [27, 16, 0x04]
        },
        [ASSIGN1]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        },
        [ASSIGN2]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        },
        [ASSIGN3]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        }
    },
    [LFO]: {
        [PITCH]: {    // OK
            MSB: [23, 2],
            LSB: [23, 1],
            msb: [23, 0]
        },
        [WAVE]: {
            MSB: [24, 21],
            LSB: [24, 20],
            msb: [24, 16, 0x04],
            sign: [24, 16, 0x08]
        },
        [TIMBRE]: {
            MSB: [26, 9],
            LSB: [26, 7],
            msb: [26, 1, 0x02],
            sign: [26, 1, 0x04]
        },
        [CUTOFF]: {
            MSB: [27, 28],
            LSB: [27, 27],
            msb: [27, 24, 0x02],
            sign: [27, 24, 0x04]
        },
        [ASSIGN1]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        },
        [ASSIGN2]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        },
        [ASSIGN3]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        }
    },
    [PRESS]: {
        [PITCH]: {
            MSB: [23, 11],
            LSB: [23, 10],
            msb: [23, 8, 0x02],
            sign: [23, 8, 0x04]

        },
        [WAVE]: {
            MSB: [24, 30],
            LSB: [24, 29],
            msb: [24, 24, 0x10],
            sign: [24, 24, 0x20]

        },
        [TIMBRE]: {
            MSB: [26, 18],
            LSB: [26, 17],
            msb: [26, 16, 0x01],
            sign: [26, 16, 0x02]

        },
        [CUTOFF]: {
            MSB: [28, 5],
            LSB: [28, 4],
            msb: [28, 0, 0x08],
            sign: [28, 0, 0x10]

        },
        [ASSIGN1]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        },
        [ASSIGN2]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        },
        [ASSIGN3]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        }
    },
    [KEY_ARP]: {
        [PITCH]: {
            MSB: [23, 20],
            LSB: [23, 19],
            msb: [23, 16, 0x04],
            sign: [23, 16, 0x08]
        },
        [WAVE]: {
            MSB: [25, 7],
            LSB: [25, 6],
            msb: [25, 0, 0x20],
            sign: [25, 0, 0x40]
        },
        [TIMBRE]: {
            MSB: [26, 27],
            LSB: [26, 26],
            msb: [26, 24, 0x02],
            sign: [26, 24, 0x04]
        },
        [CUTOFF]: {
            MSB: [28, 14],
            LSB: [28, 13],
            msb: [28, 8, 0x10],
            sign: [28, 8, 0x20]
        },
        [ASSIGN1]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        },
        [ASSIGN2]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
        },
        [ASSIGN3]: {
            MSB: [0, 0],
            LSB: [0, 0],
            msb: [0, 0, 0x01],
            sign: [0, 0, 0x02]
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
