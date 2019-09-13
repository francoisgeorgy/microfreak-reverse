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
