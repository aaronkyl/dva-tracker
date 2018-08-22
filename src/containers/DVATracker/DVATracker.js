import React, { Component } from 'react'
import axios from 'axios'

import Layout from '../../components/Layout/Layout'
import InfoBoard from '../../components/Tracker/InfoBoard/InfoBoard'
import PurchaseCard from '../../components/Tracker/PurchaseCard/PurchaseCard'
import PurchaseHistory from '../../components/Tracker/PurchaseHistory/PurchaseHistory'
import NewPurchase from '../../components/Tracker/NewPurchase/NewPurchase'

class DVATracker extends Component {
  state = {
    purchases: [],
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
    axios.get('https://dva-tracker.firebaseio.com/purchases.json')
      .then(response => {
        const purchases = Object.keys(response.data)
          .map(purchase => response.data[purchase])
        this.setState({purchases: purchases})
      })
      .catch(error => {
        console.log(error)
        return error
      })
  }

  componentDidMount() {
    console.log('[componentDidMount()]')
    this.fetchData()
  }

  fetchData = () => {
    axios.all([
      axios.get('https://dva-tracker.firebaseio.com/purchases.json'),
      axios.get('https://marketdata.websol.barchart.com/getQuote.json?apikey=' + process.env.REACT_APP_BARCHART_API_KEY + '&symbols=' + this.state.symbol)
    ])
    .then(axios.spread((purchasesRes, barchartRes) => {
      console.log(purchasesRes)
      console.log(barchartRes)
      const purchases = Object.keys(purchasesRes.data)
        .map(purchase => purchasesRes.data[purchase])
        console.log('purchases', purchases)
      const currentPrice = barchartRes.data.results[0].lastPrice
      const totalShares = this.countTotalShares(purchases)
      const totalValue = this.calculateTotalValue(currentPrice, totalShares)
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
        difference: difference,
        totalShares: totalShares,
        trigger: false
      })
    }))
    .catch(error => console.log(error)) 
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

  countTotalShares = (purchases) => {
    console.log('[countTotalShares()]', purchases)
    let totalShares = 0
    purchases.forEach(purchase => {
      totalShares = totalShares + +purchase.sharesPurchased
    })
    return totalShares
  }

  calculateTotalValue = (currentPrice, totalShares) => {
    console.log('[this.calculateTotalValue()]')
    return (totalShares * currentPrice).toFixed(2)
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
            totalValue={this.state.totalValue}
            fetchData={this.fetchData}/>
          <PurchaseHistory purchases={this.state.purchases} loadPurchaseHistory={this.loadPurchaseHistory}/>
        </PurchaseCard>
      </Layout>
    )
  }
}

export default DVATracker