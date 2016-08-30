import React from 'react';
import Transition from 'react-addons-css-transition-group';


const images = [
  '../../../assets/boyreading.jpeg',
  '../../../assets/girlreading.jpg',
  '../../../assets/reading.jpeg',
  '../../../assets/bookheader1.jpeg'
]

const Slider = React.createClass({
  getInitialState: function () {
    return {showing: false}
  },

  componentDidMount: function () {
    setInterval(() => {
    if (this.state.showing === this.props.images.length-1) {
      this.setState({showing: 0}) } else {
        this.setState({showing: this.state.showing + 1})
      }
    }, 3000)
  },

  render: function () {
    console.log(this.props);
    // let images = (<img className="current" src={this.props.images[this.state.showing]}/>)
    return (
      <div className="slider">
        <Transition transitionName="slide-left" transitionEnterTimeout={2000} transitionLeaveTimeout={4000}>
          {images}
        </Transition>
      </div>
    )
}
});

export default Slider;
