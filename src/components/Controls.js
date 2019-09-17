import {inject, observer} from "mobx-react";
import React, {Component, Fragment} from "react";
import {CONTROL, MOD_DESTINATION, MOD_MATRIX} from "../model";
import "./Controls.css"

class Controls extends Component {

    render() {
        const D = this.props.state.data;

        // if (!D || D.length === 0) return null;

        return (
            <div className="controls">
                {Object.getOwnPropertySymbols(CONTROL).map(
                    (sym, index) => {
                        return (
                            <Fragment key={index}>
                                <div>{CONTROL[sym].name}</div>
                                <div>{this.props.state.controlValue(CONTROL[sym])}</div>
                            </Fragment>
                        )
                    }
                )}
            </div>
        );

    }
}

export default inject('state')(observer(Controls));
