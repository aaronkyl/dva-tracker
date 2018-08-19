import React from 'react'
import classes from './PurchaseHeader.css'

const purchaseHeader = (props) => (
  <div className={classes.PurchaseHeader}>
    <div>DATE</div>
    <div>SHARE PRICE</div>
    <div>SHARES PURCHASED</div>
    <div>TOTAL</div>
    <div>PORTFOLIO VALUE</div>
    <div>COMPARISON</div>
  </div>
)

export default purchaseHeader