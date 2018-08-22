import React from 'react'
import classes from './InfoBoard.css'
import Spinner from '../../UI/Spinner/Spinner'

const infoBoard = (props) => {
  const differenceColor = props.difference > 0 ? 'Green' : 'Red'
  const infoBoard = (
    <React.Fragment>
      <table>
        <tr>
          <td className={classes.TableHeader}>Investment:</td>
          <td>{props.tickerSymbol}</td>
        </tr>
        <tr>
          <td className={classes.TableHeader}>Current Share Price:</td>
          <td>$ {props.currentPrice}</td>
        </tr>
      </table>
      <table>
        <tr>
          <td className={classes.TableHeader}>Target Portfolio Value:</td>
          <td>$ {props.targetValue}</td>
        </tr>
        <tr>
          <td className={classes.TableHeader}>Current Portfolio Value:</td>
          <td>$ {props.currentValue}</td>
        </tr>
        <tr>
          <td className={classes.TableHeader}>Difference:</td>
          <td className={classes[differenceColor]}>$ {props.difference}</td>
        </tr>
      </table>
    </React.Fragment>
  )
  return (
    <div className={classes.InfoBoard}>
      {props.currentPrice ? infoBoard : <Spinner />}
    </div>
  )
}

export default infoBoard