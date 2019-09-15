import {inject, observer} from "mobx-react";
import React, {Component} from "react";
import "./DeltaList.css";
import {h} from "../utils/hexstring";

class ComputedValues extends Component {

    function matrixValue(b1, b2, b3) {
        const neg = b1 & 0x02;
        const high = (b3 & 0x7f) << 8;
        const mid  = b2 & 0x7f;
        const low = (b1 & 0x01) << 7;
        const n = high + mid + low;
        let f;
        if (neg) {
            const c2 = ((~n) & 0x7fff) + 1;
            f = - (c2 * 1000 / 32768);
        } else {
            f = n * 1000 / 32768;
        }
        return Math.round(f) / 10;
    }

    render() {
        const D = this.props.state.data;

        if (!D || D.length === 0) return null;

        const a = this.matrixValue(D[23][0], D[23][1], D[23][2]);

        return (
            <div className="computedvalues">
                {a}
            </div>
        );

    }
}

export default inject('state')(observer(ComputedValues));
