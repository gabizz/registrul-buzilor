import { Tab, Tabs } from '@mui/material'
import React from 'react'
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles(theme => ({
  tabsRoot: {
    minHeight: "10px"
  },

  tabRoot: {
    border: "1px dotted grey",
    borderBottom: "none",
    background: "white",
    
    borderRadius: "5px 5px 0 0",
    // fontSize: "0.7rem",
    padding: "0 15px 0 15px",
    minHeight: "25px",
    textTransform: "none",
    fontWeight: 700, color: "navy"
    },
  tabSelected: {
      // fontSize: "0.7rem",  
      // background: "green",
      borderBottom: "none",
      background: "lightblue",
      border: "1px solid black",
      borderRadius: "5px 5px 0 0",
      color: "green",
      padding: "0 15px 0 15px",
      textTransform: "none",
      fontWeight: 700,
      
     
  }


    
  
}))

export const MyTabs = props => {
  const classes = useStyles()
  return (
    <Tabs {...props} classes = {{root: classes.tabsRoot}} />
  )
}
  


export const  MyTab = (props) => {
  const classes = useStyles()
  return (
      <Tab   {...props} classes = {{root: classes.tabRoot, selected: classes.tabSelected}}/>
  )
}
