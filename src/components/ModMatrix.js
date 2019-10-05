import {inject, observer} from "mobx-react";
import React, {Component, Fragment} from "react";
import {
    ASSIGN1,
    ASSIGN2,
    ASSIGN3,
    MOD_ASSIGN_DEST,
    MOD_GROUP_MOD_DEST, MOD_GROUP_NAME,
    MOD_MATRIX_DESTINATION,
    MOD_SOURCE
} from "../model";
import "./ModMatrix.css"

class ModMatrix extends Component {

/*
    matrix = (source, dest) => {
        return (
            <div>
                {MOD_SOURCE[source]} &#10142; {MOD_DESTINATION[dest]}: {this.props.state.modMatrixValue(MOD_MATRIX[source][dest])}
            </div>
        );
    };
*/
/*env-pitch: {this.props.state.modMatrixValue(MOD_MATRIX[MOD_SRC_ENV][PITCH])}*/

    Mods = (src, dest) => {
        console.log("Mods", src, dest);     // Symbol(MOD_SRC_CYC_ENV) Symbol(PITCH)

        const S = this.props.state;

        let mods = [];

        for (let slot of [ASSIGN1, ASSIGN2, ASSIGN3]) {
            // const slot = ASSIGN1;

            const dest_def = S.modAssignDest(slot);
            if (!dest_def) {
                continue;
            }

            // console.log("MODS", slot);

            // const mod_target = MOD_GROUP_MOD_DEST[dest]
            //const control = dest_def.control[S.modAssignControlNum(dest)];
            // console.log("Mods matrix mod", src, dest, MOD_GROUP_MOD_DEST[dest], dest_def);

            if (MOD_GROUP_MOD_DEST[dest] === dest_def.mod_group) {
                console.log("Mods matrix mod dest def", slot, src, dest, dest_def);
                const control = dest_def.control[S.modAssignControlNum(slot)];
                if (control === src) {
                    // console.log("Mods matrix mod ifself", src, dest, control, dest_def.mod_group);
                    // console.log("Mods matrix mod ifself sources", Object.keys(MOD_SOURCE));
                    // return <div>mods {MOD_DESTINATION[control]} {MOD_GROUP_NAME[dest_def.mod_group]}</div>
                    // return <div>{S.modDestName(slot)}</div>;
                    for (let mod_src of Object.getOwnPropertySymbols(MOD_SOURCE)) {
                        // console.log("Mods matrix mod v", mod_src, slot);
                        const v = S.modMatrixValue(mod_src, slot, true);
                        if (v !== 0) {
                            mods.push(<div>{MOD_SOURCE[mod_src]} {v}</div>);
                        }
                    }
                }
            }

        }

        return mods;

        //
        // ModMatrix.js:82 ------ Symbol(MOD_SRC_LFO) x Symbol(OSC_WAVE) ------
        // ModMatrix.js:28 Mods Symbol(MOD_SRC_LFO) Symbol(OSC_WAVE)
        // ModMatrix.js:36 Mods matrix mod   Symbol(MOD_SRC_LFO)    Symbol(OSC_WAVE)    Symbol(MOD_GROUP_MATRIX_WAVE)   {mod_group: Symbol(MOD_GROUP_MATRIX_WAVE), control: {…}}

        // Mods Symbol(MOD_SRC_CYC_ENV) Symbol(PITCH)
        // modAssignDest 11 (2) [21, 5] {mod_group: Symbol(MOD_GROUP_MATRIX_WAVE), control: {…}}

    };

    render() {
        // const D = this.props.state.data;
        // if (!D || D.length === 0) return null;
        const S = this.props.state;
        return (
            <div className="mod-matrix">
                <div></div>
                {Object.getOwnPropertySymbols(MOD_MATRIX_DESTINATION).map(
                    (dest, i) => {
                        return (<div key={i} className="mod-matrix-dest">{S.modDestName(dest)}</div>);
/*
                        let d = MOD_DESTINATION[dest];
                        if (dest === ASSIGN1 || dest === ASSIGN2 || dest === ASSIGN3) {
                            const group = S.modAssignGroup(dest);
                            const control_num = S.modAssignControlNum(dest);
                            let group_name = '?';
                            let control_name = '?';
                            if (group) {
                                group_name = group.name;
                                if (group.control[control_num]) {
                                    control_name = MOD_ASSIGN_DEST[group].control[control_num];
                                    d = `${group_name} ${control_name}`;
                                }
                            }
                        }
                        return (<div key={i} className="mod-matrix-dest">{d}</div>)
*/
                    }
                )}

                {Object.getOwnPropertySymbols(MOD_SOURCE).map(
                    (src, i) => {
                        return (
                            <Fragment key={i}>
                                <div>{MOD_SOURCE[src]}</div>
                                {Object.getOwnPropertySymbols(MOD_MATRIX_DESTINATION).map(
                                    (dst, j) => {
                                        console.log(`------ ${src.toString()} x ${dst.toString()} ------`);
                                        const r = S.modMatrixValue(src, dst, true);
                                        return <div key={j}>{r}<br/>0x{r.toString(16)}<br/>{Math.round(r * 1000 / 32768) / 10}<br/>{this.Mods(src, dst)}</div>
                                    }
                                )}
                            </Fragment>
                        )
                    }
                )}
            </div>
        );

    }
}

export default inject('state')(observer(ModMatrix));
