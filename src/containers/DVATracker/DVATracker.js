import React, { Component } from 'react'
import axios from 'axios'

import Layout from '../../components/Layout/Layout'
import PurchaseCard from '../../components/Tracker/PurchaseCard/PurchaseCard'
import PurchaseHistory from '../../components/Tracker/PurchaseHistory/PurchaseHistory'
import NewPurchase from '../../components/Tracker/NewPurchase/NewPurchase'

class DVATracker extends Component {
  state = {
    purchases: [
      {
        date: '2018-08-15',
        sharePrice: 23.57,
        sharesPurchased: 18,
        portfolioValue: 3007.80,
        comparison: 206.51
      }, {
        date: '2018-08-14',
        sharePrice: 23.57,
        sharesPurchased: 18,
        portfolioValue: 1839.80,
        comparison: 206.51
      }
    ],
    totalShares: null,
    totalValue: null,
    monthlyIncrement: 500,
    symbol: "AAPL",
    currentPrice: null
  }

  componentWillMount() {
    console.log('[componentWillMount()]')
    this.countTotalShares()
  }

  componentDidMount() {
    console.log('[componentDidMount()]')
    axios.get('https://marketdata.websol.barchart.com/getQuote.json?apikey=API_KEY_HERE&symbols=' + this.state.symbol)
      .then(response => {
        return response.data.results[0].lastPrice
      })
      .then(lastPrice => {
        let totalValue = this.calculateTotalValue(lastPrice)
        this.setState({
          currentPrice: lastPrice,
          totalValue: totalValue
        })
      })
      .catch(error => {
        console.log(error)
        return error
      })
  }

  countTotalShares() {
    console.log('[countTotalShares()]')
    let totalShares = 0
    this.state.purchases.forEach(purchase => {
      totalShares = totalShares + purchase.sharesPurchased
    })
    this.setState({totalShares: totalShares})
  }

  calculateTotalValue(currentPrice) {
    console.log('[this.calculateTotalValue()]')
    return this.state.totalShares * currentPrice
  }

  render() {
    console.log('rendering', this.state.totalShares)
    return (
      <Layout>
        <h1>DVA Tracker</h1>
        <div>Graph</div>
        <PurchaseCard>
          <NewPurchase symbol={this.state.symbol} currentPrice={this.state.currentPrice} />
          <PurchaseHistory purchases={this.state.purchases} />
        </PurchaseCard>
      </Layout>
    )
  }
}

export default DVATracker