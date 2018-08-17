import React, { Component } from 'react'
import Layout from '../../components/Layout/Layout'

class DVATracker extends Component {
  render() {
    return (
      <Layout>
        <h1>DVA Tracker</h1>
        <div>Graph</div>
        <div>Line for next purchase</div>
        <div>list of past purchases</div>
      </Layout>
    )
  }
}

export default DVATracker