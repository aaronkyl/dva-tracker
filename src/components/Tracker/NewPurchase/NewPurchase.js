import React, { Component } from 'react'
import classes from './NewPurchase.css'

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

  updateTotal() {
    console.log('updating')
    let total = this.props.currentPrice * this.state.sharesToBuy
    this.setState({total: total})
  }

  render() {
    let sharesToBuyValue = this.state.sharesToBuy ? this.state.sharesToBuy : ''
    let currentPrice = this.props.currentPrice ? '$' + this.props.currentPrice : 'Loading...'
    return (
      <div className={classes.NewPurchase}>
        <h2>New Purchase</h2>
        <h4>{currentPrice}</h4>
        <input type='number' onChange={(e) => this.updateSharesToBuyHandler(e)} value={sharesToBuyValue} required />
        <h4>Total: $ {this.state.total.toFixed(2)}</h4>
      </div>
    )
  }
}

export default newPurchase