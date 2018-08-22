import React from 'react'
import classes from './PurchaseHistory.css'
import PurchaseHeader from './PurchaseHeader/PurchaseHeader'
import Purchase from './Purchase/Purchase'
import Spinner from '../../UI/Spinner/Spinner'

const purchaseHistory = (props) => {
  const purchases = props.purchases.sort((a,b) => {
    return new Date(b.date) - new Date(a.date)
  })
  .map((purchase, index) => {
    return <Purchase 
      key={index + purchase.date + purchase.sharesPurchased}
      date={purchase.date.split('T')[0]}
      sharePrice={purchase.sharePrice.toFixed(2)}
      sharesPurchased={purchase.sharesPurchased}
      portfolioValue={purchase.portfolioValue.toFixed(2)}
      comparison={purchase.comparison.toFixed(2)}
    />
  })

  return (
    <div className={classes.PurchaseHistory}>
      <PurchaseHeader />
      {props.purchases ? purchases : <Spinner />}
    </div>
  )
}

export default purchaseHistory