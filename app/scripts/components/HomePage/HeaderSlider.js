import React from 'react';
import Transition from 'react-addons-css-transition-group';


const images = [
  '../../../assets/bookheader1.jpeg',
  '../../../assets/boyreading.jpeg',
  '../../../assets/girlreading.jpg',
  '../../../assets/reading.jpeg',
]

const Slider = React.createClass({
  getInitialState: function () {
    return {showing: 0}
  },

  componentDidMount: function () {
    let interval = setInterval(() => {
    if (this.state.showing === images.length-1) {
      this.setState({showing: 0}) } else {
        this.setState({showing: this.state.showing + 1})
      }
    }, 12000)
    this.setState({interval: interval})
    //use settimeout?
  },

  componentWillUnmount: function () {
    clearInterval(this.state.interval);
  },

  render: function () {
    let image = <img key={this.state.showing} className="current" src={images[this.state.showing]}/>
    return (
      <div className="slider">
        <Transition transitionName="slide-left" transitionEnterTimeout={12000} transitionLeaveTimeout={24000}>
            {image}
        </Transition>
      </div>
    )
}
});

export default Slider;
