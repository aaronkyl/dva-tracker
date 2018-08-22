import React, { Component } from 'react'
import classes from './NewPurchase.css'
import axios from 'axios'

class newPurchase extends Component {
  state = {
    sharesToBuy: 0,
    total: 0
  }

  updateSharesToBuyHandler(e) {
    let numberShares = e.target.value
    this.setState({
        sharesToBuy: numberShares,
        total: numberShares * this.props.currentPrice
    })
  }

  // updateTotal() {
  //   console.log('updating')
  //   let total = this.props.currentPrice * this.state.sharesToBuy
  //   this.setState({total: total})
  // }

  recordPurchaseHandler = (event) => {
    if (this.state.sharesToBuy) {
      const purchaseDetails = {
        date: new Date(),
        sharePrice: +this.props.currentPrice,
        sharesPurchased: +this.state.sharesToBuy,
        purchaseTotal: +this.state.total,
        portfolioValue: +this.props.totalValue + +this.state.total,
        comparison: 50
      }

      axios.post("https://dva-tracker.firebaseio.com/purchases.json", purchaseDetails)
        .then(response => {
          this.props.fetchData()
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
      }
  }

  render() {
    let sharesToBuyValue = this.state.sharesToBuy ? this.state.sharesToBuy : ''
    let suggestedPurchase = this.props.suggestedPurchase ? this.props.suggestedPurchase + ' shares' : 'Calculating...'
    return (
      <div className={classes.NewPurchase}>
        <h2>New Purchase</h2>
        <div>
          <h4>Suggested Purchase:</h4>
          <p>{suggestedPurchase}</p>
        </div>
        <div>
          <h4>Actual Purchase:</h4>
          <input type='number' onChange={(e) => this.updateSharesToBuyHandler(e)} value={sharesToBuyValue} />
        </div>
        <h4>Total: $ {this.state.total.toFixed(2)}</h4>
        <button onClick={this.recordPurchaseHandler}>Save</button>
      </div>
    )
  }
}

export default newPurchase