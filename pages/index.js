import React, { Fragment, useState, useEffect, useMemo } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from "../src/Link"
import { MenuItem, TextField, Grid, Typography, FormControlLabel, FormGroup, Checkbox, Hidden, Divider, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers'
import { useAppContext } from '../src/appContext';
import SIRUTA from "../src/siruta"
import moment from 'moment';





export default function Index() {

  const [ctx, setCtx] = useAppContext()
  const [citiesList, setCitiesList] = useState([])

  const JUDETE = useMemo(() => SIRUTA.filter(el => el.parent === 1), [])



  const dtHandler = ev => setCtx({ state: { ...ctx.state, dt: ev } })

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
      <Container maxWidth="lg" >
        {console.log("jud from context:", ctx.state.jud)}
        <Box sx={{ m:0, p: 2, border: "2px dashed grey",  height: "80vh", overflow: "hidden" }}>
          <Grid container spacing={1}>
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
                onChange={dtHandler}
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

                <Grid container>
                  <Grid item sm={12}>
                    <Typography variant="subtitle2" fontWeight={800}>
                      1. Tipul înscrierii
                    </Typography>

                    <FormControlLabel
                      label="PERSOANA FIZICA"
                      control={<Checkbox />}
                    />
                    <FormControlLabel
                      label="PERSOANA JURIDICĂ"
                      control={<Checkbox />}
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <Typography variant="subtitle2" fontWeight={800}>
                      2. Numele și prenumele dumneavoastră/Denumirea entității juridice și număr persoane deservite de SIA
                    </Typography>

                    <TextField variant="filled" fullWidth sx={{ px: 2 }} size="small"/>
                  </Grid>
                  <Grid item sm={12}>
                    <br />
                    <Typography variant="subtitle2" fontWeight={800}>
                      3. CNP/CUI
                    </Typography>
                    <Typography variant="caption" color="error">
                      (în cazul persoanelor fizice se va completa CNP-ul, iar îb cazul persoanelor juridice se va completa CUI-ul entității juridice)
                    </Typography>
                    <br />
                    <TextField variant="filled" fullWidth sx={{ px: 2 }} size="small"/>
                  </Grid>

                  <Grid item sm={12}>
                    <Typography variant="subtitle2" fontWeight={800}>
                      <br />
                      4. Adresa completă
                    </Typography>
                    <Typography variant="caption" color="error">
                      (Strada, numărul, detaliile imobilului (bloc, etaj, apartament), oraș, județ)
                    </Typography>
                    <br />
                    <TextField variant="filled" fullWidth sx={{ px: 2 }} size="small"/>
                  </Grid>

                  <Grid item sm={12}>
                    <Typography variant="subtitle2" fontWeight={800}>
                      <br />
                      5. Telefon
                    </Typography>
                    <br />
                    <TextField variant="filled" fullWidth sx={{ px: 2 }} size="small"/>
                  </Grid>

                  <Grid item sm={12}>
                    <Typography variant="subtitle2" fontWeight={800}>
                      <br />
                      6. Adresa de e-mail
                    </Typography>
                    <br />
                    <TextField variant="filled" fullWidth sx={{ px: 2 }} size="small"/>
                  </Grid>

                  <Grid item sm={12}>
                    <Typography variant="subtitle2" fontWeight={800}>
                      <br />
                      7. Activitatea principală conform CAEN
                    </Typography>
                    <Typography variant="caption" color="error">
                      IMPORTANT! Acest câmp se completează numai în cazul PERSOANELOR JURIDICE
                    </Typography>
                    <br />
                    <TextField variant="filled" fullWidth sx={{ px: 2 }} size="small"/>
                  </Grid>

                  <Grid item sm={12}>
                    <Typography variant="subtitle2" fontWeight={800}>
                      <br />
                      8. Descrierea activității societății
                    </Typography>
                    <Typography variant="caption" color="error">
                      IMPORTANT! Acest câmp se completează numai în cazul PERSOANELOR JURIDICE
                    </Typography>
                    <br />
                    <TextField variant="filled" fullWidth sx={{ px: 2 }} size="small"/>
                  </Grid>
                </Grid>

                <Grid item sm={12}>
                  <Typography variant="subtitle2" fontWeight={800}>
                    9. Dețineți autorizație de mediu?
                  </Typography>
                  <Typography variant="caption" color="error">
                    IMPORTANT! Acest câmp se completează numai în cazul PERSOANELOR JURIDICE
                  </Typography>
                  <br />
                  <FormControlLabel
                    label="DA"
                    control={<Checkbox />}
                  />
                  <FormControlLabel
                    label="NU"
                    control={<Checkbox />}
                  />
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
                  <TextField variant="filled" fullWidth sx={{ px: 2 }} size="small"/>
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
                  <FormControlLabel
                    label="Colectare"
                    control={<Checkbox />}
                  />
                  <TextField size="small" label="capacitate" size="small"/>
                  <br />
                  <FormControlLabel
                    label="Epurare"
                    control={<Checkbox />}
                  />
                </Grid>

                <Grid item sm={12}>
                  <br />
                  <Typography variant="subtitle2" fontWeight={800}>
                    12. Sursa de alimentare cu apă de care beneficiați
                  </Typography>
                  <Typography variant="caption" color="error">
                    Bifați toate opțiunile care se aplică.
                  </Typography>
                  <br />
                  <FormControlLabel
                    label="Din rețeaua publică"
                    control={<Checkbox />}
                  />
                  <FormControlLabel
                    label="Din surse individuale"
                    control={<Checkbox />}
                  />
                </Grid>

                <Grid item sm={12}>
                  <Typography variant="subtitle2" fontWeight={800}>
                    <br />
                    13. Descrieți sistemul de evacuare a apelor uzate menajere de care beneficiați
                  </Typography>

                  <TextField multiline rows={2} variant="filled" fullWidth sx={{ px: 2 }} size="small"/>
                </Grid>

                <Grid item sm={12}>
                  <Typography variant="subtitle2" fontWeight={800}>
                    <br />
                    14. Descrieți modul în care se realizează epurarea apelor uzate:
                  </Typography>
                  <Typography variant="caption" color="error">
                    Vă rugăm elaborați un răspuns detaliat.
                  </Typography>
                  <TextField multiline rows={2} variant="filled" fullWidth sx={{ px: 2 }} size="small"/>
                </Grid>

                <Grid item sm={12}>
                  <Typography variant="subtitle2" fontWeight={800}>
                    <br />
                    15. Descrieți modul în care se monitorizează descărcarea apelor uzate:
                  </Typography>
                  <Typography variant="caption" color="error">
                    Vă rugăm să ne oferiți rezultatele ultimelor analize efectuate.
                  </Typography>
                  <TextField multiline rows={2} variant="filled" fullWidth sx={{ px: 2 }} size="small"/>
                </Grid>

                <Grid item sm={12}>
                  <Typography variant="subtitle2" fontWeight={800}>
                    <br />
                    16. Numărul și data Contractului încheiat cu Societatea de vidanjare.
                  </Typography>
                  <Typography variant="caption" color="error">
                    IMPORTANT! Acest câmp se completează numai de PERSOANELE JURIDICE.
                  </Typography>
                  <br /><br />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                      <TextField variant="filled" fullWidth label="CONTRACT NR." size="small"/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <DatePicker
                        type="date"
                        label="DIN DATA"
                        value={ctx.state.dt}
                        onChange={dtHandler}
                        renderInput={(params) => <TextField variant="filled" {...params} size="small"/>}
                      />
                    </Grid>
                  </Grid>
                  <br />
                </Grid>

                <Grid item sm={12} sx={{ p: 1, background: "beige", fontSize: "0.7em", fontWeight: 400 }}>
                  Prin completarea și transmiterea acestui formular sunteți de acord cu prelucrarea datelor cu caracter personal în scopul înscrierii în REGISTRUL DE EVIDENȚĂ A SISTEMELOR INDIVIDUALE ADECVATE PENTRU COLECTAREA APELOR UZATE al Comunei Șagu, județul Arad. Prelucrarea datelor cu caracter personal se va realiza cu respectarea prevederilor Regulamentului nr. 679/20166 adoptat de Parlamentul European și Consiliul Uniunii Europene pentru aprobarea normelor privind protecția în ceea ce privește prelucrarea datelor cu caracter personal, precum și a normelor referitoare la libera circulație a acestui tip de date cu caracter personal.
                </Grid>
                <Grid item sm={12}>
                  <br /><br />
                  <Grid container>
                    <Grid item sm={6} align="center">
                      DATA,
                      <br />
                      <strong>{moment(ctx.state.dt).format("DD.MM.YYYY")}</strong>
                    </Grid>
                    <Grid item sm={6} align="center">
                      SEMNĂTURA,
                      <br />
                      ..........................................
                    </Grid>
                  </Grid>
                </Grid>


              </Box>
            </Grid>

          </Grid>




        </Box>
        <Box sx = {{textAlign:"center"}}>
          <Button>RESETEAZA</Button>
          <Button>TIPARESTE</Button>
          <Button>SALVEZA PDF</Button>
        </Box>

      </Container>
    </Fragment>

  );
}