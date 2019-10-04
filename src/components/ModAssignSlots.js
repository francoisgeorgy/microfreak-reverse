import {inject, observer} from "mobx-react";
import React, {Component} from "react";
import {MOD_ASSIGN_SLOT, MOD_ASSIGN_DEST} from "../model";
import "./ModAssignSlots.css";

class ModAssignSlots extends Component {

    // do it only if assign value != 0

    render() {
        const S = this.props.state;
        return (
            <div className="slots">
                {Object.getOwnPropertySymbols(MOD_ASSIGN_SLOT).map(
                    (slot, i) => {
                        const group = S.modAssignGroup(slot);
                        const control = S.modAssignControl(slot);
                        let target_name = '?';
                        let target_control = '?';
                        if (MOD_ASSIGN_DEST[group]) {
                            target_name = MOD_ASSIGN_DEST[group].name;
                            if (MOD_ASSIGN_DEST[group].control[control]) {
                                target_control = MOD_ASSIGN_DEST[group].control[control];
                            }
                        }
                        return (
                            <div key={i}>
                                <div>slot {i}: group {group}, control {control} : {target_name} {target_control}</div>
                            </div>
                        )
                    }
                )}
            </div>
        );

    }
}

export default inject('state')(observer(ModAssignSlots));
