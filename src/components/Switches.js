import {inject, observer} from "mobx-react";
import React, {Component, Fragment} from "react";
import {CONTROL, MOD_MATRIX_DESTINATION, MOD_MATRIX, SWITCH} from "../model";
import "./Switches.css"

class Switches extends Component {

    render() {
        // const D = this.props.state.data;

        // if (!D || D.length === 0) return null;

        return (
            <div className="switches">
                {Object.getOwnPropertySymbols(SWITCH).map(
                    (sym, index) => {
                        const raw = this.props.state.switchValue(SWITCH[sym], true);
                        return (
                            <Fragment key={index}>
                                <div>{SWITCH[sym].name}</div>
                                <div>{this.props.state.switchValue(SWITCH[sym])} {raw}</div>
                                <div>0x{raw.toString(16)}</div>
                            </Fragment>
                        )
                    }
                )}
            </div>
        );

    }
}

export default inject('state')(observer(Switches));
