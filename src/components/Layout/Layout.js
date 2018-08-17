import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
// import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

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
    console.log(this.state.showSideDrawer)
    return (
      <Aux>
        {/* <SideDrawer open={this.state.showSideDrawer} /> */}
        <p>toolbar goes here</p>
        <main>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout