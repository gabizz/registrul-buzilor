import React from 'react'
import {  TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme=>({
    textField: { background: 'white'},
    input: { fontWeight: 600, fontSize: '0.75em', color: theme.palette.primary.dark,
   
},
    inputLabel: { fontSize: '0.9em'}
}))

const FunkyInput = (props, {...rest}) => {


    const classes = useStyles()
    return <TextField 
            variant = "outlined"
            size = "small"
            fullWidth = {props.fullWidth || true}
            classes = {{root: classes.textField}} 
            InputProps = {{className: classes.input}} 
            InputLabelProps = {{className: classes.inputLabel}}
            {...{...props, value: props.value || '' }}
            disabled = {props.disabled}
            {...rest}
            
            /> 
    
}

export default FunkyInput