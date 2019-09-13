import {inject, observer} from "mobx-react";
import React, {Component, Fragment} from "react";
import {Bytes} from "./Bytes";
import DataDelta from "./DataDelta";

class Data extends Component {
    render() {
        const S = this.props.state;
        return (
            <Fragment>
                <div>
                    <h4>{S.preset.current} [{S.preset.current_counter}]</h4>
                    {S.dataRef.length === 0 && <Bytes bytes={S.data} />}
                    {S.dataRef.length > 0 && <DataDelta />}
                </div>
                <div>
                    <h4>ref {S.preset.reference}:</h4>
                    <Bytes bytes={S.dataRef} />
                </div>
            </Fragment>
        );
    }
}

export default inject('state')(observer(Data));
