import React from 'react'
import classes from './Purchase.css'

const purchase = (props) => (
  <div className={classes.Purchase}>
    <div>{props.date}</div>
    <div>$ {props.sharePrice}</div>
    <div>{props.sharesPurchased}</div>
    <div>$ {isNaN(props.sharePrice) ? props.sharePrice : props.sharePrice * props.sharesPurchased}</div>
    <div>$ {props.portfolioValue}</div>
    <div>$ {props.comparison}</div>
  </div>
)

export default purchase