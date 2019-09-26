import React from "react";
import {h} from "../utils/hexstring";
import {observer} from "mobx-react";
import "./Bytes.css";

export const Bytes = observer(({bytes}) => {
    // if (global.dev) console.log("Bytes", bytes);

    return (
        <div className="bytes">
            <div>
                <div className="row-head"></div>
                <div>00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31</div>
            </div>
            <div>
                <div className="row-head"></div>
                <div>-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --</div>
            </div>
            {bytes.map((a, i) => {
                return (
                    <div key={i}>
                        <div className="row-head">{i}:</div>
                        {a && a.map(b => `${h(b)} `)}
                    </div>
                );
            }
            )}
        </div>
    );


    /*
        if (Array.isArray(bytes[0])) {
            // array of array of bytes
            return (
                <div className="debug-data">
                    {bytes.map(a => {
                            console.log("a", a);
                            return <div>{a && Array.from(a).map(b => `${h(b)} `)}</div>;
                        }
                    )}
                </div>
            );
        } else {
            // array of bytes
            return (
                <div className="debug-data">
                    {bytes && Array.from(bytes).map(b => {
                        console.log("b", b);
                        return `${b} `;
                    })}
                </div>
            );
        }
    */
});
