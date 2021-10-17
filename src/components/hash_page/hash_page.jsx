import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet.css';
import { hashData } from "../utils/handlers/getData"
import { loader } from "../utils/comps/loader"
import { hashDetailsTable } from "../utils/comps/hashDetailsTable"

class HashPage extends Component{
    constructor(props) {
        super(props);
        this.state = { hashdata: [], check: false, hasError: false };
        this.toggleTable = this.toggleTable.bind(this);
    }

    componentDidMount() {
        // eslint-disable-next-line
        const hashdata = this.props?.location.state.hash;
        console.log(`block value`, hashdata);
        hashData(hashdata).then(item => {
            this.setState({ hashdata: item });
            console.log(`Result`, item);
        });
    }

    async toggleTable(){
        this.setState(prevState => ({
            check: !prevState.check
        }));
        console.log(`Show table turned on: ${this.state.check}`);
    }

    // eslint-disable-next-line react/require-render-return
    render() {
        console.log('hashdata from render()', this.state.hashdata);
        const { hashdata } = this.state;

        return (
            <div className={'mainback'} style={{paddingTop:'5rem'}}>
                <center>
                    <div className="ui card" style={{width:'71rem'}}>
                        <div className="content">
                            <div className="header">Hash Value</div>
                        </div>
                        {!Object.keys(hashdata).length ? loader() : <h4 className="ui sub header">{hashdata.hash}</h4>}
                        <div className="ui small feed">
                            {Object.keys(hashdata).length &&(hashDetailsTable(hashdata.block_index, hashdata.size,
                                hashdata.prev_block, hashdata.next_block))}
                        </div>
                    </div>
                </center>
                {Object.keys(hashdata).length &&(<div className="container" style={{paddingTop:'5rem'}}>
                        {!this.state.check &&(<button className="fluid ui button" onClick={this.toggleTable}>
                            Previous Transactions🔻</button>)}
                        {this.state.check &&(
                            <button className="fluid ui button" onClick={this.toggleTable}>🔺</button>)}
                        {this.state.check &&(<div className="scrollit">
                        <table id="blocktable" className="ui celled padded table">
                        <thead>
                        <tr>
                            <th className="single line">Block Hash</th>
                            <th>Block Time</th>
                            <th>Block Height</th>
                        </tr>
                        </thead>
                        <tbody>
                        {hashdata.tx && hashdata.tx.map((d, i) => {
                            const {hash, time, block_index} = d;
                            return (
                                <tr key={i}>
                                    <td>{hash}</td>
                                    <td>{time}</td>
                                    <td>{block_index}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table></div>)}
                </div>)}
            </div>
        )
    }
}

export default HashPage;