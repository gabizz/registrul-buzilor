import { Checkbox, FormControlLabel, Grid, InputAdornment, MenuItem, Radio, RadioGroup, TextareaAutosize, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React, { Fragment } from 'react'
import FancyInput from "../FancyInput"
import { useAppContext } from '../../appContext'
import { MdCalendarViewMonth, MdCheckBox, MdCheckBoxOutlineBlank, MdOutlineEditCalendar } from 'react-icons/md'
import SIRUTA, { getSiruta } from '../../../lib/siruta'
import moment from 'moment'
import { FaRegSquare, FaRegCheckSquare} from "react-icons/fa"

export default function PrintInputs({ type, kkey, value, label, options }) {

    const [ctx] = useAppContext()
    return (
        <Fragment>
            {type == "divider" 
                && <Typography variant="subtitle2"  fontWeight={400} style={{lineHeight:1.2}}>{label}</Typography>
            }

            {(type === "text" || type==="number")
                && <div style = {{lineHeight:0.5}}>
                    <Typography variant = "caption">{label}</Typography><br />
                    <div align="center">
                    <strong><small>{value ?? "---"}</small></strong>
                    </div>
                    <br/><br/>

                </div>
                

            }

            {type === "date" && <Fragment>
                <Typography variant="caption">{label}</Typography><br />
                <div align="center">
                <strong>{value ? moment(value).format("DD.MM.YYYY") : "---"}</strong>
                </div>
            </Fragment>}

            {(type === "radio") && <Fragment>
                <Grid container spacing={1}>

                    {/* <Typography variant = "subtitle" color="primary" fontWeight={800}>{label}</Typography> */}

                    {options.map((e, i) => (
                        <Grid item key={i}>
                            <Grid container>
                            <Grid item>
                            {/* <Typography variant="caption">{e.label}</Typography> */}
                            <small>{e.label}</small>
                            </Grid>
                            <Grid item style = {{paddingTop: "3px", paddingLeft: "2px"}}>
                                {/* <input type="checkbox"  defaultChecked = {Boolean(e.value) === Boolean(value)} /> */}
                               {Boolean(e.value) === Boolean(value) ? <FaRegSquare/> : <FaRegCheckSquare/>} 
                     
                            </Grid>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Fragment>
            }

            {type === "checkbox" && (
                <Fragment>

                    {value == 1
                        ? <>
                        <MdCheckBox size = "1em" color="black"/>
                            {' '}
                            <Typography variant="caption">{label}</Typography>
                        </>
                        :  <>
                        <MdCheckBoxOutlineBlank size = "1em"/>
                            {' '}
                            <Typography variant="caption">{label}</Typography>
                        </>
                    }

                </Fragment>
            )}

            {type === "jud" && (
                <div style = {{lineHeight:0.5}}>
                    <Typography variant="caption">{label || "JUDEȚUL: "} </Typography><br/>
                    <strong>{getSiruta(value)}</strong>
                </div>
            )}



            {type === "loc" && (
                  <div style = {{lineHeight:0.5}}>
                  <Typography variant="caption">{label || "LOCALITATEA: "} </Typography><br/>
                  <strong>{getSiruta(value)}</strong>
              </div>
            )}

            {type === "select" && (
                <Fragment>
                    {console.log("options:", ctx.state.e7, kkey, ctx.state[kkey])}
                    <Typography variant = "caption" fontWeight={700}>
                    {options.find(el => el.value == ctx.state[kkey]) ? options.find(el => el.value == ctx.state[kkey])['label'] : "---  "}
                    </Typography>
                </Fragment>
            )}





        </Fragment>)


}
