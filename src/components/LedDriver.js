import React, { Component } from 'react';
import axios from 'axios';
import '../styles/LedDriver.css';

import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';

class LedDriver extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            device: {
                status: false
            },
            countClick: 0,
            lastClicked: 0,
        }

        this.driverCLick = this.driverCLick.bind(this);
        
    }

    componentDidUpdate(prevProps, prevState){
        if( prevProps.device.status !== prevState.device.status ){
            this.setState({
                device: {
                    status: this.props.device.status
                }
            });
        }
    }

    driverCLick(){
        this.setState((prevState, props) => ({
            device: {
                status: !prevState.device.status ? true : false
            }
        }), () => {
            axios.post('http://10.0.0.55/src_status/?availability='+this.state.device.status.toString())
            .catch(err => {
                this.setState(props => ({
                    device: {
                        status: false
                    }
                }));
            });
        });
    }

    render() {
        return (
            <div className="driver-box" onClick={this.driverCLick} dv-status={this.state.device.status.toString()} >
                <div className="driver-box--content d-flex align-items-center">
                    <div>
                        <h2><EmojiObjectsOutlinedIcon fontSize="large" /></h2>
                        <p className="mb-0">Oświetlenie LED {this.state.clicked}</p>
                        { (this.props.device.status) ? <p className="device-active-text">Aktywny</p> : '' }
                    </div>
                </div>
            </div>
        )
    }
}

export default LedDriver
