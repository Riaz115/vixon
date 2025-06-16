import React from "react";
import style from "./loader.module.css"

export function Loader(props) {
    return (<>
        {props.loading &&
            <div className={style.backdrop}>
                <div className={style.spinner}>
                </div>

            </div>}
    </>)
}