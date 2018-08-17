import React from 'react'
import classes from './SideDrawer.css'

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close]
  if(props.open) attachedClasses = [classes.SideDrawer, classes.Open]

  return (
    <React.Fragment>
      <div className={attachedClasses.join(' ')}>
        <p>This is the side drawer</p>
      </div>
    </React.Fragment>
  )
}

export default sideDrawer