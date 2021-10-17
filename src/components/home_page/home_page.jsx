import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet.css';
import { blockData } from "../utils/handlers/getData";
import { Link } from "react-router-dom";
import { loader } from "../utils/comps/loader";

class HomePage extends Component{
    constructor(props) {
        super(props);
        this.state = { data: [], hasError: false };
    }

    componentDidMount() {
        try {
            blockData().then(item => {
                this.setState({data: item})
                console.log("res", item)
                if (!item.length){
                    console.log('No data returned');
                    this.setState({ hasError:true })
                }
            })
        }
        catch (error){
            this.setState({hasError: true})
            console.log(`Error occurred: ${error}`)
        }
    }

    // eslint-disable-next-line react/require-render-return
    render() {
        if (this.state.hasError) {
            return (
                <h2 className="ui header">
                    <div className="content" style={{
                        paddingTop: `5rem`,
                        paddingLeft: `15rem`
                    }}>
                        Something Went Wrong!
                        <div className="sub header">Please make sure that the server is running!</div>
                    </div>
                </h2>
            )
        }

        const { data } = this.state;

        return (
                <div className={"mainback"} style={{

                }}>
                    <div className="container">
                        <div className="mainhead" style={{
                            paddingTop:'2.5rem'
                        }}>
                            <h2 className="ui header">
                                    <div className="content">
                                        Block Chain Info
                                        <div className="sub header">All the latest transactions - at one place!</div>
                                    </div>
                            </h2>
                            <hr/>
                        </div>
                    </div>


                    <div className="container" style={{paddingTop:'5rem'}}>
                        {!Object.keys(data).length &&( loader() )}
                        {Object.keys(data).length &&(<div className="scrollit"><table id="blocktable" className="ui celled padded table">
                            <thead>
                            <tr>
                                <th className="single line">
                                    <center>Block Hash</center>
                                </th>
                                <th>
                                    <center>Block Time</center>
                                </th>
                                <th>
                                    <center>Block Height</center>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.length && data.map((d, i) => {
                                const {hash, time, height} = d;
                                return (
                                    <tr className={"blocksection"} key={i}>
                                        <td onClick={() => {
                                            console.log(hash, typeof hash);
                                        }}>
                                            <Link to={{
                                                pathname: `/hashpage`,
                                                state: {hash}
                                            }}>{hash}</Link>
                                        </td>
                                        <td>
                                            {time}
                                        </td>
                                        <td>
                                            <center>{height}</center>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table></div>)}
                    </div>
                </div>
            )
    }
}

export default HomePage;