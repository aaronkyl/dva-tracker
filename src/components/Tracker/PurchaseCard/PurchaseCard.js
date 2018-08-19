import React from 'react'
import classes from './PurchaseCard.css'

const purchaseCard = (props) => (
  <div className={classes.PurchaseCard}>
    {props.children}
  </div>
)

export default purchaseCard