import React from 'react'
import classes from './PurchaseHistory.css'
import Purchase from './Purhcase/Purchse'

const purchaseHistory = (props) => {
  const purchases = props.purchases.map(purchase => {
    return <Purchase 
      key={purchase.date + purchase.sharesPurchased}
      date={purchase.date}
      sharePrice={purchase.sharePrice}
      sharesPurchased={purchase.sharesPurchased}
      portfolioValue={purchase.portfolioValue}
      comparison={purchase.comparison}
    />
  })

  return (
    <div className={classes.PurchaseHistory}>
      {purchases}
    </div>
  )
}

export default purchaseHistory