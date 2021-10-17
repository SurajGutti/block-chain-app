import React from "react";

export function hashDetailsTable(index, size, previous, next){
    return(<table className="ui very basic collapsing celled table">
        <tbody>
        <tr>
            <td>
                <h5 className="ui image header">
                    <div className="content">Block Index</div>
                </h5>
            </td>
            <td>{index}</td>
        </tr>
        <tr>
            <td>
                <h5 className="ui image header">
                    <div className="content">Size</div>
                </h5>
            </td>
            <td>{size}</td>
        </tr>
        <tr>
            <td>
                <h5 className="ui image header">
                    <div className="content">Previous hash</div>
                </h5>
            </td>
            <td>{previous}</td>
        </tr>
        <tr>
            <td>
                <h5 className="ui image header">
                    <div className="content">Next Hash</div>
                </h5>
            </td>
            <td>{next}</td>
        </tr>
        </tbody>
    </table>)
}