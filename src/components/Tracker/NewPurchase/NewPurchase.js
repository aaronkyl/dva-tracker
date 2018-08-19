import React, { Component } from 'react'
import axios from 'axios'
import classes from './NewPurchase.css'

class newPurchase extends Component {
  state = {
    symbol: "AAPL",
    currentPrice: null,
    sharesToBuy: 0
  }

  componentDidMount() {
    axios.get('https://marketdata.websol.barchart.com/getQuote.json?apikey=API_KEY_HERE&symbols=' + this.state.symbol)
      .then(response => {
        this.setState({currentPrice: response.data.results[0].lastPrice})
      })
      .catch(error => {
        console.log(error)
        return error
      })
  }

  updateSharesToBuyHandler(e) {
    let numberShares = e.target.value
    this.setState({sharesToBuy: numberShares})
  }

  render() {
    return (
      <div>
        <h2 className={classes.NewPurchase}>New Purchase</h2>
        <h4>{this.state.currentPrice}</h4>
        <input type='number' onChange={(e) => this.updateSharesToBuyHandler(e)} value={this.state.sharesToBuy} />
      </div>
    )
  }
}

export default newPurchase