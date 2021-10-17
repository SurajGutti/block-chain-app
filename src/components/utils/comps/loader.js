import React from "react";

export function loader(){
    return (<div id={"loader"} className="ui segment">
        <div style={{
            paddingTop:'5rem'
        }} className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
        </div>
        <p></p>
    </div>)
}