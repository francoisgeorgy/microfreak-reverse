import {inject, observer} from "mobx-react";
import React, {Component, Fragment} from "react";
import "./DeltaList.css";
import {MOD_DESTINATION, MOD_SOURCE} from "../model";
import {CYC_ENV, LFO, MOD_MATRIX, PITCH} from "../model";
import "./ComputedValues.css"

class ComputedValues extends Component {

    matrix = (source, dest) => {
        return (
            <div>
                {MOD_SOURCE[source]} &#10142; {MOD_DESTINATION[dest]}: {this.props.state.multibytesValue(MOD_MATRIX[source][dest])}
            </div>
        );
    };

    render() {
        const D = this.props.state.data;

        // if (!D || D.length === 0) return null;

        return (
            <div className="computed-values">
                <div className="mod-matrix">
                    <div></div>
                {Object.getOwnPropertySymbols(MOD_DESTINATION).map(
                    (sym, index) => {
                        return (<div>{MOD_DESTINATION[sym]}</div>)
                    }
                )}
                {Object.getOwnPropertySymbols(MOD_SOURCE).map(
                    (src, i) => {
                        return (
                            <Fragment>
                                <div>{MOD_SOURCE[src]}</div>
                                {Object.getOwnPropertySymbols(MOD_DESTINATION).map(
                                    (dst, index) => {
                                        //return (<div>{MOD_SOURCE[src]}-{MOD_DESTINATION[sym]}</div>)
                                        return <div>{this.props.state.multibytesValue(MOD_MATRIX[src][dst])}</div>
                                    }
                                )}
                            </Fragment>
                        )
                    }
                )}
                </div>
                {/*{this.matrix(CYC_ENV, PITCH)}*/}
                {/*{this.matrix(LFO, PITCH)}*/}
            </div>
        );

    }
}

export default inject('state')(observer(ComputedValues));
