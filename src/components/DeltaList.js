import {inject, observer} from "mobx-react";
import React, {Component} from "react";
import "./DeltaList.css";
import {h} from "../utils/hexstring";

class DeltaList extends Component {
    render() {
        const D = this.props.state.data;
        const R = this.props.state.dataRef;

        if (!D || !R || D.length === 0 || R.length === 0) return null;

        return (
            <div className="deltalist">
                {D.map(
                    (sysex, s) => {
                        return sysex.map(
                            (byte, b) => {
                                if (byte !== R[s][b]) {
                                    return <div key={`${s}${b}`}>D[{s}][{b}] ({h(R[s][b])}) {h(byte)}</div>
                                }
                            }
                        );
                    }
                )}
            </div>
        );

    }
}

export default inject('state')(observer(DeltaList));
