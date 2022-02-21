import React, {Component} from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';

import './styles/App.css';
import DeviceStatus from './components/DeviceStatus';
import LedDriver from './components/LedDriver';
import RightBar from './components/RightBar';
import LedDriverColorPicker from './components/LedDriver/LedDriverColorPicker';

class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      device:{
        status: false
      },
      LedDriverColorPicker: {
        visible: false
      }
    }

    this.showColorPicker = this.showColorPicker.bind(this);
    this.hideColorPicker = this.hideColorPicker.bind(this);
  }

  componentDidMount(){

      axios.post('http://10.0.0.55/src_check/')
          .then(res => {
              this.setState(props => ({
                  device: {
                      status: (res.data.success === '1') ? true : false
                  }
              }));
          })
          .catch( err => {
            console.log('Nie połączono z urządzeniem');
          });

  }


  showColorPicker(){
    this.setState(props => ({
      LedDriverColorPicker: {
        visible: true
      } 
    }), () => {
      console.log(this.state.LedDriverColorPicker.visible);
    });
    
  }

  hideColorPicker(){
    this.setState(props => ({
      LedDriverColorPicker: {
        visible: false
      } 
    }), () => {
      
    });
  }

  render(){
    return (
          <div>
          
          <DeviceStatus status={this.state.device.status.toString()} />
          <Container>
            <header id="main" className="d-flex align-items-center">
              <div>
                <h1>Cameolon homekit</h1>
                <h5>Sterowanie oświetleniem</h5>
              </div>
            </header>

            <LedDriver device={this.state.device} />
            <RightBar toggleColorPicker={this.showColorPicker} />

            <LedDriverColorPicker toggleColorPicker={this.hideColorPicker} isVisible={this.state.LedDriverColorPicker.visible.toString()} />
      
        </Container>
        </div>
      );
    }
}

export default App;
