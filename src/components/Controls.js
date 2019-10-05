import {inject, observer} from "mobx-react";
import React, {Component, Fragment} from "react";
import {CONTROL, MOD_MATRIX_DESTINATION, MOD_MATRIX, OSC_TYPE} from "../model";
import "./Controls.css"

class Controls extends Component {

    render() {
        const D = this.props.state.data;

        // if (!D || D.length === 0) return null;

        return (
            <div className="controls">
                {Object.getOwnPropertySymbols(CONTROL).map(
                    (sym, index) => {
                        const v = this.props.state.controlValue(CONTROL[sym], sym === OSC_TYPE);
                        const mapped = CONTROL[sym].mapping ? CONTROL[sym].mapping(v) : '';
                        return (
                            <Fragment key={index}>
                                <div>{CONTROL[sym].name}</div>
                                <div>{v} {mapped}</div>
                            </Fragment>
                        )
                    }
                )}
            </div>
        );

    }
}

export default inject('state')(observer(Controls));
