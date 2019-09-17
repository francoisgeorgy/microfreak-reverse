import {inject, observer} from "mobx-react";
import React, {Component} from "react";
import "./DeltaList.css";
import {h} from "../utils/hexstring";
import {CYC_ENV, DEFAULT_msb_mask, DEFAULT_sign_mask, LFO, matrix, PITCH} from "../model";
import {getRightShift} from "../utils/bits-utils";

class ComputedValues extends Component {

    matrixValue = (MSB, LSB, msb_byte, mask_msb, sign_byte, mask_sign) => {

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

    v = m => {
        const D = this.props.state.data;
        console.log("m", m, D.length);
        if (D.length < 39) return;

        const mask_msb = m.msb.length === 3 ? m.msb[2] : DEFAULT_msb_mask;
        const mask_sign = m.sign.length === 3 ? m.sign[2] : DEFAULT_sign_mask;

        return this.matrixValue(
            D[ m.MSB[0] ][ m.MSB[1] ],
            D[ m.LSB[0] ][ m.LSB[1] ],
            D[ m.msb[0] ][ m.msb[1] ],
            mask_msb,
            D[ m.sign[0] ][ m.sign[1] ],
            mask_sign)
    };

    matrix = (source, dest) => {
        return (
            <div>
                {matrix[source][dest].name}: {this.v(matrix[source][dest])}
            </div>
        );
    };

    render() {
        const D = this.props.state.data;

        if (!D || D.length === 0) return null;

        // const a = this.matrixValue(D[23][0], D[23][1], D[23][2]);

        return (
            <div className="computedvalues">
                {this.matrix(CYC_ENV, PITCH)}
                {this.matrix(LFO, PITCH)}
            </div>
        );

    }
}

export default inject('state')(observer(ComputedValues));
