import {inject, observer} from "mobx-react";
import React, {Component} from "react";
import "./DeltaList.css";
import {h} from "../utils/hexstring";
import {matrix} from "../model";
import {getRightShift} from "../utils/bits-utils";

class ComputedValues extends Component {

    matrixValue = (MSB, LSB, LSB_msb, mask=0x03) => {

        console.log("matrixValue", h(MSB), h(LSB), h(LSB_msb), mask);

        const j = getRightShift(mask);
        const msb = LSB_msb >> j;

        const neg = msb & 0x02;
        const high = (MSB & 0x7f) << 8;
        const mid  = LSB & 0x7f;
        const low = (msb & 0x01) << 7;
        const n = high + mid + low;
        let f;
        if (neg) {
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

        const mask = m.LSB_msb.length === 3 ? m.LSB_msb[2] : 0x03;

        return this.matrixValue(
            D[ m.MSB[0] ][ m.MSB[1] ],
            D[ m.LSB[0] ][ m.LSB[1] ],
            D[ m.LSB_msb[0] ][ m.LSB_msb[1] ],
            mask)
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
                {this.matrix('cycenv', 'pitch')}
                {this.matrix('lfo', 'pitch')}
            </div>
        );

    }
}

export default inject('state')(observer(ComputedValues));
