import React, { Fragment } from 'react'
import { DATE_GENERALE, GDPR } from './Props'
import Inputs from './Inputs'
import { Grid } from '@mui/material'
import { useAppContext } from '../../appContext'

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

      <Grid container spacing={1} alignItems="center">
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
        {ctx.state && ctx.state.jud && ctx.state.loc && GDPR(ctx.state.jud, ctx.state.loc).map( (e,i)=> (
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
        ))}

      </Grid>
    </Fragment>
  )
}
