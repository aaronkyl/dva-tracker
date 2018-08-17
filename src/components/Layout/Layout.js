import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

toggleSideDrawer = () => {
  this.setState((prevState) => {
    return {showSideDrawer: !prevState.showSideDrawer}
  })
}

  render() {
    return (
      <Aux>
        <SideDrawer />
        <button onClick={this.toggleSideDrawer}>Click Me!</button>
      </Aux>
    )
  }
}

export default Layout