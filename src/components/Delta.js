import {inject, observer} from "mobx-react";
import React, {Component} from "react";
// import {h} from "../utils/hexstring";
// import "./Bytes.css";

class Delta extends Component {
/*
    render() {
        const D = this.props.state.data;
        const R = this.props.state.reference;
        return (
            <div className="bytes">
                {D.map(
                    (a, i) => {
                        return <div key={i}>{a && Array.from(a).map(
                            (b, k) => {
                                if (b !== R[i][k]) {
                                    return <span className="d">{h(b)} </span>
                                } else {
                                    return `${h(b)} `
                                }
                            }
                        )}</div>;
                    }
                )}
            </div>
        );
    }
*/
    render () {
        return <div>delta</div>;
    }
}

export default inject('state')(observer(Delta));
