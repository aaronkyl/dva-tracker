import React, { Component } from 'react'
import axios from 'axios'

import Layout from '../../components/Layout/Layout'
import InfoBoard from '../../components/Tracker/InfoBoard/InfoBoard'
import PurchaseCard from '../../components/Tracker/PurchaseCard/PurchaseCard'
import PurchaseHistory from '../../components/Tracker/PurchaseHistory/PurchaseHistory'
import NewPurchase from '../../components/Tracker/NewPurchase/NewPurchase'

class DVATracker extends Component {
  state = {
    purchases: [
      {
        date: '2018-08-15',
        sharePrice: 23.57,
        sharesPurchased: 1,
        portfolioValue: 3007.80,
        comparison: 206.51
      }, {
        date: '2018-08-14',
        sharePrice: 23.57,
        sharesPurchased: 10,
        portfolioValue: 1839.80,
        comparison: 206.51
      }
    ],
    totalShares: null,
    totalValue: null,
    initialInvestment: 0,
    monthlyIncrement: 500,
    dollarCostAveragingTarget: null,
    symbol: "AAPL",
    currentPrice: null,
    suggestedNoSharesToBuy: null,
    startDate: '02/01/2018',
    monthsSinceInception: 0,
    targetValue: 0,
    difference: 0
  }

  componentWillMount() {
    console.log('[componentWillMount()]')
    this.countTotalShares()
  }

  componentDidMount() {
    console.log('[componentDidMount()]')
    axios.get('https://marketdata.websol.barchart.com/getQuote.json?apikey=' + process.env.REACT_APP_BARCHART_API_KEY + '&symbols=' + this.state.symbol)
      .then(response => {
        return response.data.results[0].lastPrice
      })
      .then(currentPrice => {
        const totalValue = this.calculateTotalValue(currentPrice)
        const months = this.countMonthsSinceInception()
        const targetValue = this.calculateTargetValue(months)
        const suggestedPurchase = this.calculateSuggestedPurchase(targetValue, totalValue, currentPrice)
        const difference = this.calculateValueDifference(totalValue, targetValue)
        this.setState({
          currentPrice: currentPrice,
          totalValue: totalValue,
          monthsSinceInception: months,
          targetValue: targetValue,
          suggestedNoSharesToBuy: suggestedPurchase,
          difference: difference
        })
      })
      .catch(error => {
        console.log(error)
        return error
      })
    
      axios.get('https://dva-tracker.firebaseio.com/startDates.json')
        .then(response => {
          console.log(response)
        })
  }

  calculateSuggestedPurchase = (targetValue, totalValue, currentPrice) => {
    return ((targetValue - totalValue) / currentPrice).toFixed(1)
  }

  countMonthsSinceInception = () => {
    const today = new Date()
    const startDate = new Date(this.state.startDate)
    const startYear = startDate.getFullYear()
    const startMonth = startDate.getMonth()
    const years = today.getFullYear() - startYear
    const months = (years * 12) + (today.getMonth() - startMonth)
    return months
  }

  countTotalShares = () => {
    console.log('[countTotalShares()]')
    let totalShares = 0
    this.state.purchases.forEach(purchase => {
      totalShares = totalShares + purchase.sharesPurchased
    })
    this.setState({totalShares: totalShares})
  }

  calculateTotalValue = (currentPrice) => {
    console.log('[this.calculateTotalValue()]')
    return (this.state.totalShares * currentPrice).toFixed(2)
  }

  calculateTargetValue = (months) => {
    return (months * this.state.monthlyIncrement + this.state.initialInvestment).toFixed(2)
  }

  calculateValueDifference = (currentValue, targetValue) => {
    return (currentValue - targetValue).toFixed(2)
  }

  render() {
    console.log('rendering', this.state.totalShares)
    return (
      <Layout>
        <h1>DVA Tracker</h1>
        <div>Graph</div>
        <PurchaseCard>
          <InfoBoard 
            tickerSymbol={this.state.symbol}
            currentPrice={this.state.currentPrice}
            currentValue={this.state.totalValue}
            targetValue={this.state.targetValue}
            difference={this.state.difference}/>
          <NewPurchase 
            symbol={this.state.symbol} 
            currentPrice={this.state.currentPrice} 
            suggestedPurchase={this.state.suggestedNoSharesToBuy}
            totalValue={this.state.totalValue}/>
          <PurchaseHistory purchases={this.state.purchases} />
        </PurchaseCard>
      </Layout>
    )
  }
}

export default DVATracker