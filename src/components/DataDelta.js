import {inject, observer} from "mobx-react";
import React, {Component} from "react";
import {h} from "../utils/hexstring";
import "./Bytes.css";

class DataDelta extends Component {
    render() {
        const D = this.props.state.data;
        const R = this.props.state.dataRef;
        // console.log("DataDelta", !!R);
        return (
            <div className="bytes">
                <div>
                    <div className="row-head"></div>
                    <div>00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31</div>
                </div>
                <div>
                    <div className="row-head"></div>
                    <div>-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --</div>
                </div>
                {D.map(
                    (a, i) => {
                        return (
                            <div key={i}>
                                <div className="row-head">{i}:</div>
                                {a && a.map(
                                    (b, k) => {
                                        if (R && (b !== R[i][k])) {
                                            // console.log("diff", i, k);
                                            return <span className="d" title={`${i} ${k}`}>{h(b)} </span>
                                        } else {
                                            return `${h(b)} `
                                        }
                                    }
                                )}
                            </div>
                        );
                    }
                )}
            </div>
        );
    }
}

export default inject('state')(observer(DataDelta));
