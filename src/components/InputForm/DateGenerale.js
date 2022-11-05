import React, { Fragment } from 'react'
import { DATE_GENERALE, GDPR } from './Props'
import Inputs from './Inputs'
import { Alert, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material'
import { useAppContext } from '../../appContext'
import { Box } from '@mui/system'

export default function DateGenerale() {

  const [ctx, setCtx] = useAppContext()
  const changeHandler = (ev, val) => {
    setCtx({
      state: {
        ...ctx.state,
        [ev]: val
      }
    })
  }
  return (
    <Fragment>

      <Grid container spacing={1} alignItems="center" justifyContent="flex-start">
       
        {DATE_GENERALE.map((e, i) => (
          <Fragment key={i}>
            <Grid item sm={e.sm ?? true} xs={12}>
              <Inputs
                type={e.type}
                kkey={e.key}
                value={ctx.state[e.key]}
                label={e.label}
                options={e.options}
                onChange={changeHandler}
              />
            </Grid>
          </Fragment>
        ))}
      </Grid>

      <Grid container spacing={1} alignItems="center">
        {Boolean(ctx.state && ctx.state.jud && ctx.state.loc) 
          ? GDPR(ctx.state.jud, ctx.state.loc).map( (e,i)=> (
            <Fragment key={i}>
              <Grid item sm={e.sm || true} xs={12}>
                <Inputs
                  type={e.type}
                  kkey={e.key}
                  value={ctx.state[e.key]}
                  label={e.label}
                  options={e.options}
                  onChange={changeHandler}
                />
              </Grid>
              
            </Fragment>
        )
      
        )
        : <Box sx = {{p:2}}>
          <Alert severity="error">
          Pentru a putea tipări formularul, este oblgatoriu să alegeți județul și localitatea pentru care se face declarația 
          și să vă exprimați acordul pentru procesarea datelor cu caracter personal.
        </Alert>
        </Box>}

      </Grid>
    </Fragment>
  )
}
