import React, { Fragment } from 'react'
import { DECLARATIE_EPURARE } from './Props'
import Inputs from './Inputs'
import { Grid } from '@mui/material'
import { useAppContext } from '../../appContext'

export default function DeclaratieColectare() {

  const [ctx, setCtx] = useAppContext()
  const changeHandler = (ev, val) => {
    setCtx({state: {
      ...ctx.state,
      [ev]: val
    }})
  }
  return (
    <Fragment>
      <Grid container spacing = {1} alignItems="center">
        {DECLARATIE_EPURARE.map((e,i) =>(
          <Fragment key = {i}>
              <Grid item sm = {e.sm}>
                <Inputs 
                  type = {e.type}
                  kkey = {e.key}
                  value = {ctx.state[e.key]}
                  label = {e.label}
                  options = {e.options}
                  onChange = {changeHandler}
                />
              </Grid>
          </Fragment>
        ))}
        </Grid>
    </Fragment>
  )
}
