import React from "react";
import {h} from "../utils/hexstring";
import {observer} from "mobx-react";
import "./Bytes.css";

export const Bytes = observer(({bytes}) => {
    // if (global.dev) console.log("Bytes", bytes);

    return (
        <div className="bytes">
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
