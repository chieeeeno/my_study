import React from 'react'



class Page1 extends React.Component {
  // life cycle methods
  // Mounting =========================
  constructor(props) {
    super(props)
    this.state = {
      level:this.props.params.level
    }
    console.log(this.props.params.level)
    console.log(this.state.level)
  }

  // componentWillMount() {}

  render() {
    return(
      <div>
        {this.state.level} <br />
        
      </div>
    )
  }

  // componentDidMount() {}



  // Updating =========================
  // componentWillReceiveProps() {}

  // shouldComponentUpdate() {}

  // componentWillUpdate() {}
  // componentDidUpdate() {}


  // Unmounting =========================
  // componentWillUnmount() {}



  // methods =========================
  

}

Page1.propTypes = {
  params: React.PropTypes.object
};



export default Page1
