import React, { Component } from 'react'
import Layout from '../../components/Layout/Layout'
import PurchaseHistory from '../../components/PurchaseHistory/PurchaseHistory'

class DVATracker extends Component {
  state = {
    purchases: [{
      date: '2018-08-15',
      sharePrice: 23.57,
      sharesPurchased: 18,
      portfolioValue: 1839.80,
      comparison: 206.51
    }, {
      date: '2018-08-15',
      sharePrice: 23.57,
      sharesPurchased: 18,
      portfolioValue: 1839.80,
      comparison: 206.51
    }]
  }

  render() {
    return (
      <Layout>
        <h1>DVA Tracker</h1>
        <div>Graph</div>
        <div>Line for next purchase</div>
        <PurchaseHistory purchases={this.state.purchases} />
      </Layout>
    )
  }
}

export default DVATracker