import {inject, observer} from "mobx-react";
import React, {Component} from "react";
import {MOD_ASSIGN_SLOT, MOD_ASSIGN_TARGET} from "../model";
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
                        let gn = '?';
                        let cn = '?';
                        if (MOD_ASSIGN_TARGET[group]) {
                            gn = MOD_ASSIGN_TARGET[group].name;
                            if (MOD_ASSIGN_TARGET[group].control[control]) {
                                cn = MOD_ASSIGN_TARGET[group].control[control];
                            }
                        }
                        return (
                            <div key={i}>
                                <div>group {group}, control {control} : {gn} {cn}</div>
                            </div>
                        )
                    }
                )}
            </div>
        );

    }
}

export default inject('state')(observer(ModAssignSlots));
