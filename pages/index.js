import React, { Fragment, useState, useEffect, useMemo, useRef } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from "../src/Link"
import { MenuItem, TextField, Grid, Typography, FormControlLabel, FormGroup, Checkbox, Hidden, Divider, Button, Radio, RadioGroup } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers'
import { useAppContext } from '../src/appContext';
import SIRUTA from "../src/siruta"
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';

import PrintTpl from '../src/components/PrintTpl';
import { b64_encode } from '../src/b64';
import { makeStyles } from '@mui/styles';



const useStyles = makeStyles(theme => ({
  visuallyHidden: {
    "@media screen": {display: "none"}
  }
}))

export default function Index() {

  const [ctx, setCtx] = useAppContext()
  const [citiesList, setCitiesList] = useState([])
  const printRef = useRef()
  const classes = useStyles()

  const JUDETE = useMemo(() => SIRUTA.filter(el => el.parent === 1), [])



  const dtHandler = dt => ev => setCtx({ state: { ...ctx.state, [dt]: ev } })

  const textHandler = name => ev => setCtx({ state: {...ctx.state, [name]: ev.target.value }})

  const radioHandler = name => ev => {
    console.log("Ev:", ev.target.value)
    setCtx({ state: {...ctx.state, [name]: ev.target.value }})
  }
  const judChangeHandler = ev => {
    const judId = ev.target.value
    const cities = SIRUTA.filter(el => el.parent === judId)
    setCitiesList(cities)
    setCtx({ state: { ...ctx.state, jud: judId, loc: cities && cities[0]['siruta'] } })
  }

  const locChangeHandler = ev => setCtx({
    state: {
      ...ctx.state,
      loc: ev.target.value
    }
  })

  const printHandler = useReactToPrint({content: () => printRef.current})
  return (
    <Fragment>

      <Container maxWidth="lg" sx={{ position: "absolote",  background: "lightgrey" }}>
        <Box sx={{ my: 1, position: "relative" }}>
          <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: "center", fontSize: "1rem" }}>
            DECLARAȚIE DE ÎNREGISTRARE<br />
            în Registrul de evidență a sistemelor individuale adecvate pentru colectarea apelor uzate

          </Typography>


        </Box>
      </Container>
      <Container maxWidth="lg">
     
        <Box sx={{ m:0, p: 2, border: "2px dashed grey",  height: "80vh", overflow: "hidden" }} >
          
          <Grid container spacing={1} >
            
            <Grid item xs={12} sm={3}>
              <TextField
                select value={ctx.state.jud} onChange={judChangeHandler} fullWidth size="small"
                label="JUDETUL"
              >
                {JUDETE.map((e, i) => (
                  <MenuItem key={i} value={e.siruta}>
                    {e.denloc}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                select value={ctx.state.loc} onChange={locChangeHandler} fullWidth size="small"
                label="LOCALITATEA" placeholder='alegeti  localitatea'
              >
                {citiesList.map((e, i) => (
                  <MenuItem key={i} value={e.siruta}>
                    {e.denloc}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={true} />
            
            <Grid item xs={12} sm={3}>
              <DatePicker
                type="date"
                label="DATA DEPUNERII"
                value={ctx.state.dt}
                onChange={dtHandler("dt")}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </Grid>
            <Grid item sm = {12}><Divider/></Grid>
            {/* <Hidden smDown>
              <Grid item sm={12}>
                <Typography variant="subtitle1" align="center" fontWeight={900} fontSize="0.9rem">
                  DECLARAȚIE DE ÎNREGISTRARE <br />
                  în Registrul de evidență a sistemelor individuale adecvate pentru colectarea apelor uzate
                  <br /> din localitatea {' '}
                  {ctx.state.loc ? SIRUTA.find(el => el.siruta === ctx.state.loc)['denloc'] : "---"},
                  județul {ctx.state.jud ? SIRUTA.find(el => el.siruta === ctx.state.jud)['denloc'] : "---"}
                </Typography>
              </Grid>
            </Hidden> */}
            <Grid item sm={12}>
              <Box sx={{ background: "none", p: 0.5, height: "68vh", overflow: "auto" }}>

                <Grid container spacing={1}>
                  <Grid item sm={12}>
                    <Typography variant="subtitle2" fontWeight={800}>
                      1. Tipul înscrierii
                    </Typography>
                    <RadioGroup
                      row
                      value = {ctx.state.r1}
                      onChange = {radioHandler("r1")}
                    >
                    <FormControlLabel
                      label="PERSOANA FIZICA"
                      control={<Radio value = {1}/>}
                    />
                    <FormControlLabel
                      label="PERSOANA JURIDICĂ"
                      control={<Radio  value= {0}/>}
                    />
                    </RadioGroup>
                    
                  </Grid>
                  <Grid item sm={12}>
                    <Typography variant="subtitle2" fontWeight={800}>
                      2. Numele și prenumele dumneavoastră/Denumirea entității juridice și număr persoane deservite de SIA
                    </Typography>

                    <TextField 
                      variant="filled" fullWidth  size="small"
                      value = {ctx.state.r2}
                      onChange = {textHandler("r2")}  
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <Typography variant="subtitle2" fontWeight={800}>
                      3. CNP/CUI
                    </Typography>
                    <TextField 
                      variant="filled" fullWidth sx={{ px: 0 }} size="small"
                      value = {ctx.state.r3}
                      onChange = {textHandler("r3")}  
                      label = {<small>în cazul persoanelor fizice se va completa CNP-ul, iar îb cazul persoanelor juridice se va completa CUI-ul entității juridice</small>}
                    />
                  </Grid>

                  <Grid item sm={12}>
                    <Typography variant="subtitle2" fontWeight={800}>
                      4. Adresa completă
                    </Typography>

                    <TextField 
                      variant="filled" fullWidth  size="small"
                      value = {ctx.state.r4}
                      onChange = {textHandler("r4")}  
                      label = {<small>
                        Strada, numărul, detaliile imobilului (bloc, etaj, apartament), oraș, județ
                      </small>}
                    />
                  </Grid>

                  <Grid item sm={6}>
                    <Typography variant="subtitle2" fontWeight={800}>
                      5. Telefon
                    </Typography>
                    
                    <TextField 
                      variant="filled" fullWidth  size="small"
                      value = {ctx.state.r5}
                      onChange = {textHandler("r5")}  
                    />
                  </Grid>

                  <Grid item sm={6}>
                    <Typography variant="subtitle2" fontWeight={800}>
                      6. Adresa de e-mail
                    </Typography>
                    <TextField 
                      variant="filled" fullWidth  size="small"
                      value = {ctx.state.r6}
                      onChange = {textHandler("r6")}  
                    />
                  </Grid>

                  <Grid item sm={12}>
                    <Typography variant="subtitle2" fontWeight={800}>
                      
                      7. Activitatea principală conform CAEN
                    </Typography>
                    <Typography variant="caption" color="error">
                      IMPORTANT! Acest câmp se completează numai în cazul PERSOANELOR JURIDICE
                    </Typography>
                    <TextField 
                      variant="filled" fullWidth  size="small"
                      value = {ctx.state.r7}
                      onChange = {textHandler("r7")}  
                      disabled = {Boolean(+ctx.state.r1) ? true : false}
                    />
                  </Grid>

                  <Grid item sm={12}>
                    <Typography variant="subtitle2" fontWeight={800}>
                      
                      8. Descrierea activității societății
                    </Typography>
                    <Typography variant="caption" color="error">
                      IMPORTANT! Acest câmp se completează numai în cazul PERSOANELOR JURIDICE
                    </Typography>
                    <br />
                    <TextField 
                      variant="filled" fullWidth  size="small"
                      value = {ctx.state.r8}
                      onChange = {textHandler("r8")}  
                      disabled = {Boolean(+ctx.state.r1) ? true : false}
                     
                    />
                  </Grid>
                </Grid>

                <Grid item sm={12}>
                  <br/>
                  <Typography variant="subtitle2" fontWeight={800}>
                    9. Dețineți autorizație de mediu?
                  </Typography>
                  <Typography variant="caption" color="error">
                    IMPORTANT! Acest câmp se completează numai în cazul PERSOANELOR JURIDICE
                  </Typography>
                  <RadioGroup
                      row
                      value = {ctx.state.r9}
                      onChange = {radioHandler("r9")}
                    >
                    <FormControlLabel
                      label="DA"
                      control={<Radio value = {1} disabled = {Boolean(+ctx.state.r1) ? true : false}  />}
                    />
                    <FormControlLabel
                      label="NU"
                      control={<Radio  value= {0} disabled = {Boolean(+ctx.state.r1) ? true : false}/>}
                    />
                    </RadioGroup>
                </Grid>


                <Grid item sm={12}>
                  <Typography variant="subtitle2" fontWeight={800}>
                    <br />
                    10. Numărul și data autorizației de mediu (dacă există) – opțional
                  </Typography>
                  <Typography variant="caption" color="error">
                    IMPORTANT! Acest câmp se completează numai în cazul PERSOANELOR JURIDICE
                  </Typography>
                  <br />
                  <TextField 
                    variant="filled" 
                    value = {ctx.state.r10}
                    onChange = {textHandler("r10")}
                    fullWidth  
                    size="small"
                    disabled = {Boolean(+ctx.state.r1) ? true : false || Boolean(+ctx.state.r9) ? false : true }
                    
                  />
                </Grid>

                <Grid item sm={12}>
                  <br />
                  <Typography variant="subtitle2" fontWeight={800}>
                    11. Sistemul individual de care beneficiați și capacitate proiectată
                  </Typography>
                  <Typography variant="caption" color="error">
                    IMPORTANT! Acest câmp se completează numai în cazul PERSOANELOR JURIDICE
                  </Typography>
                  <br />
                  <RadioGroup
                      row
                      value = {ctx.state.r11}
                      onChange = {radioHandler("r11")}
                    >
                    <FormControlLabel
                      label="Colectare"
                      control={<Radio value = {1} disabled = {Boolean(+ctx.state.r1) ? true : false}  />}
                    />
                    <FormControlLabel
                      label="Epurare"
                      control={<Radio  value= {0} disabled = {Boolean(+ctx.state.r1) ? true : false}/>}
                    />
                    </RadioGroup>
                    {parseInt(ctx.state.r11) === 1  && (
                    <TextField 
                    value = {ctx.state.r111}
                    onChange = {textHandler("r111")}
                    size="small" label="capacitate" 
                    disabled = {Boolean(+ctx.state.r1) ? true : false}
                    />
                    )}

                </Grid>

                <Grid item sm={12}>
                  <br/>
                  <Typography variant="subtitle2" fontWeight={800}>
                    12. Sursa de alimentare cu apă de care beneficiați
                  </Typography>
                  <Typography variant="caption" color="error">
                    Bifați toate opțiunile care se aplică.
                  </Typography>
                  <RadioGroup
                      row
                      value = {ctx.state.r12}
                      onChange = {radioHandler("r12")}
                    >
                    <FormControlLabel
                      label="Din rețeaua publică"
                      control={<Radio value = {1} disabled = {Boolean(+ctx.state.r1) ? true : false}  />}
                    />
                    <FormControlLabel
                      label="Din surse individuale"
                      control={<Radio  value= {0} disabled = {Boolean(+ctx.state.r1) ? true : false}/>}
                    />
                    </RadioGroup>
                 
                </Grid>

                <Grid item sm={12}>
                  <Typography variant="subtitle2" fontWeight={800}>
                    13. Descrieți sistemul de evacuare a apelor uzate menajere de care beneficiați
                  </Typography>

                  <TextField 
                    value = {ctx.state.r13}
                    onChange = {textHandler("r13")}
                    multiline rows={3} variant="filled" fullWidth  size="small"
                  />
                </Grid>

                <Grid item sm={12}>
                  <Typography variant="subtitle2" fontWeight={800}>
                    14. Descrieți modul în care se realizează epurarea apelor uzate:
                  </Typography>
                  <Typography variant="caption" color="error">
                    Vă rugăm elaborați un răspuns detaliat.
                  </Typography>
                  <TextField 
                    value = {ctx.state.r14}
                    onChange = {textHandler("r14")}                  
                    multiline rows={3} variant="filled" fullWidth  size="small"
                  />
                </Grid>

                <Grid item sm={12}>
                  <Typography variant="subtitle2" fontWeight={800}>
                    15. Descrieți modul în care se monitorizează descărcarea apelor uzate:
                  </Typography>
                  <Typography variant="caption" color="error">
                    Vă rugăm să ne oferiți rezultatele ultimelor analize efectuate.
                  </Typography>
                  <TextField 
                      value = {ctx.state.r15}
                      onChange = {textHandler("r15")}
                      multiline rows={3} variant="filled" fullWidth  size="small"
                  />
                </Grid>

                <Grid item sm={12}>
                  <br/>
                  <Typography variant="subtitle2" fontWeight={800}>
                    16. Numărul și data Contractului încheiat cu Societatea de vidanjare.
                  </Typography>
                  <Typography variant="caption" color="error">
                    IMPORTANT! Acest câmp se completează numai de PERSOANELE JURIDICE.
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                      <TextField 
                        value = {ctx.state.r161}
                        onChange = {textHandler("r161")}
                        variant="filled" fullWidth label="CONTRACT NR." size="small"
                        disabled = {Boolean(+ctx.state.r1) ? true : false}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <DatePicker
                        type="date"
                        label="DIN DATA"
                        value={ctx.state.r162}
                        onChange={dtHandler("r162")}
                        disabled = {Boolean(+ctx.state.r1) ? true : false}
                        renderInput={(params) => <TextField variant="filled" {...params} size="small"/>}
                      />
                    </Grid>
                  </Grid>
                  <br />
                </Grid>
                <Grid item sm = {12} style = {{wordBreak: "break-all", padding: "10px", border: "1px solid green", background: "lightgrey"}}>
                  <strong>Codificarea formularului (in vederea salvării și transmiterii datelor acestuia)</strong>
                  <br/>
                {ctx.state && b64_encode(JSON.stringify(Object.keys(ctx.state)
                .reduce( (acc, el)=>{
                 return  acc += "|"+ ctx.state[el]
                }, "")))}
              
                </Grid>

                {/* <Grid item sm={12} sx={{ p: 1, background: "beige", fontSize: "0.7em", fontWeight: 400 }}>
                  Prin completarea și transmiterea acestui formular sunteți de acord cu prelucrarea datelor cu caracter personal în scopul înscrierii în REGISTRUL DE EVIDENȚĂ A SISTEMELOR INDIVIDUALE ADECVATE PENTRU COLECTAREA APELOR UZATE al Comunei Șagu, județul Arad. Prelucrarea datelor cu caracter personal se va realiza cu respectarea prevederilor Regulamentului nr. 679/20166 adoptat de Parlamentul European și Consiliul Uniunii Europene pentru aprobarea normelor privind protecția în ceea ce privește prelucrarea datelor cu caracter personal, precum și a normelor referitoare la libera circulație a acestui tip de date cu caracter personal.
                </Grid> */}



              </Box>
            </Grid>

          </Grid>



          
        </Box>
       
        <Box sx = {{textAlign:"center"}}>
          <Button disabled>RESETEAZA</Button>
          <Button color="error" onClick = {printHandler}>TIPARESTE</Button>
          <Button disabled>SALVEZA PDF</Button>
        </Box>

      </Container>


      <div ref = {printRef}  className = {classes.visuallyHidden}>
          <PrintTpl siruta = {SIRUTA} />
         </div>
    </Fragment>

  );
}

