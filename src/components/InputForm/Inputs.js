import { Checkbox, FormControlLabel, InputAdornment, MenuItem, Radio, RadioGroup, TextareaAutosize, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React, { Fragment } from 'react'
import FancyInput from "../FancyInput"
import { useAppContext } from '../../appContext'
import { MdCalendarViewMonth, MdOutlineEditCalendar } from 'react-icons/md'
import SIRUTA from '../../../lib/siruta'

export default function Inputs({ type, kkey, value, label, options, onChange}) {

    const [ctx] = useAppContext()
  return (
    <Fragment>
    {type == "divider"  
        && <Typography variant = "subtitle1" color="primary" fontWeight={800}>{label}</Typography>} 
    {type === "text" 
        && <FancyInput size="small" fullWidth label = {label} value = {value} onChange = {ev => onChange(kkey, ev.target.value)} />}
    {type === "number"
         && <FancyInput size="small"  fullWidth label = {label} value = {value} type="number" onChange = {ev => onChange(kkey, +ev.target.value)} />}
    {type === "date" 
        && <DatePicker
        type="date"
        label={label}
        value={value}
        
        onChange={ev => onChange(kkey, ev)}
        renderInput={(params) => <FancyInput 
                size="small" {...params} 
                // InputProps = {{
                //     endAdornment:(
                //         <InputAdornment  positon="end"><MdOutlineEditCalendar color="red"/></InputAdornment>
                //     )
                // }}
        
        />}
      />
        
    }
    {type === "radio"  && <Fragment>
        <Typography variant = "subtitle" color="primary" fontWeight={800}>{label}</Typography>
        <RadioGroup  value={+value} row onChange = {ev=> onChange(kkey, ev.target.value)}>
        {options.map( (e,i) => (
            <Fragment key = {i}>
                <FormControlLabel 
                    label = {e.label}
                    control = {<Radio size="small" value = {e.value} />}
                
                />
            </Fragment>
        ))}
        </RadioGroup>
        </Fragment>
    }
    { type === "checkbox" 
        && <FormControlLabel 
                onChange = {ev => onChange(kkey, ev.target.checked ? "1":"0" )}
                label = {<Typography variant = "subtitle" color="primary" fontWeight={800}>{label}</Typography>}
                control = {<Checkbox
                        checked = {Boolean(parseInt(value))} 
                        // checked = {Boolean(0)}
                    />}
        />
    }

    {type  === "jud"  
        && <FancyInput 
                label="JUDEȚ"
                fullWidth size="small" 
                value = {value} onChange = {ev => onChange(kkey, ev.target.value)} select>
            {SIRUTA.filter( el => el.parent === 1).map((e,i)=>(
                <MenuItem key={i} value = {e.siruta}>
                    {e.denloc}
                </MenuItem>
            ))}
        </FancyInput>
    
    }

    {type  === "loc" 
        && <FancyInput 
            label="LOCALITATE"
            fullWidth size="small" 
            value = {value} 
            onChange = {ev => onChange(kkey, ev.target.value)} select>
            {SIRUTA.filter( el => el.parent === ctx.state.jud ).map((e,i)=>(
                <MenuItem key={i} value = {e.siruta}>
                    {e.denloc}
                </MenuItem>
            ))}
        </FancyInput>
    
    }

    {type  === "select"  
        && <FancyInput 
                label={label}
                fullWidth size="small" 
                value = {ctx.state[kkey] } onChange = {ev => onChange(kkey, ev.target.value)} select>
                
            {options.map((e,i)=>(
                <MenuItem key={i} value = {e.value}>
                    {e.label}
                </MenuItem>
            ))}
        </FancyInput>   
    
    }

    {type === "textarea" 
        && 
        <Fragment>
            <Typography variant = "subtitle" color="primary" fontWeight={800}>{label}</Typography>
        <TextareaAutosize style = {{width: "100%", minHeight: "50px"}} value= {value} onChange = {ev => onChange(kkey, ev.target.value)} />
        </Fragment>
            
    
    }
    </Fragment>
  )
    
  
   
  
   
}
