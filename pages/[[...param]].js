import React, { Fragment, useState, useEffect, useMemo, useRef } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from "../src/Link"
import { MenuItem, TextField, Grid, Typography, FormControlLabel, Divider, Button, Radio, RadioGroup, TextareaAutosize, Checkbox, IconButton } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers'
import { useAppContext } from '../src/appContext';
import SIRUTA from "../src/siruta"
import moment from 'moment';
import { useRouter } from 'next/router';


import PrintTpl from '../src/components/PrintTpl';
import { b64_decode, b64_encode } from '../src/b64';
import { makeStyles } from '@mui/styles';
import Notification from '../src/components/Notification';

import { FaBan, FaCut, FaCopy, FaPaste, FaInfoCircle } from "react-icons/fa"
import InstructionsModal from '../src/components/InstructionsModal';
import PrintPreviewModal from '../src/components/PrintPreviewModal';
import { MdPrint } from "react-icons/md"
import DragAndImportPdf from '../src/components/DragAndImportPdf';

const decoder = (string) => {
  let res = null
  try {
    res = b64_decode(string)
  } catch (error) {
    res = null
  }
  return res
}


const useStyles = makeStyles(theme => ({
  printOnly: {
    "@media screen": {
      display: "none"
    }
  }
}))


export default function Index({b64}) {

  const classes = useStyles()
  const [ctx, setCtx] = useAppContext()
  const [citiesList, setCitiesList] = useState()

  const copyRef = useRef()
  const [notification, setNotification] = useState()
  const [infoModal, setInfoModal] = useState()
  const [printModal, setPrintModal] = useState()
  const router = useRouter()

  const JUDETE = useMemo(() => SIRUTA.filter(el => el.parent === 1), [])

  useEffect(() => {
    
    let b64 = b64_encode(JSON.stringify(ctx.state))
    setCtx({ b64: b64 })
  }, [ctx.state])

  useEffect(() => {
    if (b64) {
      let decoded = decoder(b64)
      if (decoded) {
        let obj = JSON.parse(decoded)

        setCitiesList( SIRUTA.filter( el => el.siruta == obj.loc))
        setCtx({ state: obj, b64: b64 })
      }
     
    }
  }, [b64])




  const dtHandler = dt => ev => setCtx({ state: { ...ctx.state, [dt]: ev } })

  const textHandler = name => ev => setCtx({ state: { ...ctx.state, [name]: ev.target.value } })

  const radioHandler = name => ev => {
    console.log("Ev:", ev.target.value)
    setCtx({ state: { ...ctx.state, [name]: ev.target.value } })
  }
  const judChangeHandler = ev => {
    const judId = ev.target.value
    const cities = SIRUTA.filter(el => el.parent === judId)
    setCitiesList(cities)
    setCtx({ state: { ...ctx.state, jud: judId, loc: ctx.state.locId || cities && cities[0]['siruta'] } })
  }

  const checkboxHandler = name => ev => setCtx({ state: { ...ctx.state, [name]: ev.target.checked } })

  const locChangeHandler = ev => setCtx({
    state: {
      ...ctx.state,
      loc: ev.target.value
    }
  })



  const decodeHandler = () => {
    let decoded = b64_decode(ctx.b64)
    setCtx({ state: JSON.parse(decoded) })
  }


  const clearHandler = ev => {
    setCtx({ b64: "" })
  }


  const copyHandler = cut => ev => {
    copyRef.current.select()
    document.execCommand('copy');
    ev.target.focus();
    setNotification({
      open: true,
      message: "Formularul codificat a fost copiat în clipboard!",
      hash: parseInt(Math.random(5) * 10000)
    })
    if (cut) { setCtx({ b64: "" }) }
  }

  const pasteHandler = async ev => {
    let paste = await navigator.clipboard.readText();
    setCtx({ b64: paste })
  }

const importPdfHandler = ev => {
  if (ev) {
      router.push("https://sia.e-urban.ro/"+ev)
  }
}

  return (
    <Fragment>

      <Container maxWidth="lg" sx={{ position: "absolote", background: "lightgrey" }}>
        <Box sx={{ my: 1, position: "relative" }}>

          <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: "center", fontSize: "1rem" }}>
            DECLARAȚIE DE ÎNREGISTRARE<br />
            în Registrul de evidență a sistemelor individuale adecvate pentru colectarea apelor uzate

          </Typography>



        </Box>
      </Container>
      <Container maxWidth="lg">
        <div style={{ width: "100%", textAlign: "right", display: "flex", alignItems: "center", justifyContent: "flex-end", marginBottom: "5px" }} >
          <Button
            color="error" size="small" variant="outlined" onClick={() => setPrintModal(true)} style={{ marginRight: "5px" }}
            startIcon={<MdPrint />}
          >TIPĂRIRE</Button>
          <IconButton size="small" color="info" onClick={() => setInfoModal(true)}>
          <FaInfoCircle  size="1.5em" />
          </IconButton>
        </div>
        <Box sx={{ m: 0, p: 2, border: "2px dashed grey", height: "85vh", overflow: "hidden" }} >

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
              {citiesList && (
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
              )}

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
            <Grid item sm={12}><Divider /></Grid>

            <Grid item sm={12}>
              <Box sx={{ background: "none", p: 0.5, height: "68vh", overflow: "auto" }}>

                <Grid container spacing={1}>
                  <Grid item sm={12}>
                    <Typography variant="subtitle2" fontWeight={800}>
                      1. Tipul înscrierii
                    </Typography>
                    <RadioGroup
                      row
                      value={ctx.state.r1}
                      onChange={radioHandler("r1")}
                    >
                      <FormControlLabel
                        label="PERSOANA FIZICA"
                        control={<Radio value={1} />}
                      />
                      <FormControlLabel
                        label="PERSOANA JURIDICĂ"
                        control={<Radio value={0} />}
                      />
                    </RadioGroup>

                  </Grid>
                  <Grid item sm={11}>
                    <Typography variant="subtitle2" fontWeight={800}>
                      2. Numele și prenumele dumneavoastră/Denumirea entității juridice și număr persoane deservite de SIA
                    </Typography>

                    <TextField
                      variant="outlined" fullWidth size="small"
                      value={ctx.state.r2}
                      onChange={textHandler("r2")}
                    />
                  </Grid>
                  <Grid item sm={1}>
                    <Typography variant="subtitle2" fontWeight={800}>
                       Persoane
                    </Typography>

                    <TextField
                      variant="outlined" fullWidth size="small"
                      value={ctx.state.r21} type = "number"
                      onChange={textHandler("r21")}
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <Typography variant="subtitle2" fontWeight={800}>
                      3. CNP/CUI
                    </Typography>
                    <TextField
                      variant="outlined" fullWidth sx={{ px: 0 }} size="small"
                      value={ctx.state.r3}
                      onChange={textHandler("r3")}
                      label={<small>în cazul persoanelor fizice se va completa CNP-ul, iar îb cazul persoanelor juridice se va completa CUI-ul entității juridice</small>}
                    />
                  </Grid>

                  <Grid item sm={12}>
                    <Typography variant="subtitle2" fontWeight={800}>
                      4. Adresa completă
                    </Typography>

                    <TextField
                      variant="outlined" fullWidth size="small"
                      value={ctx.state.r4}
                      onChange={textHandler("r4")}
                      label={<small>
                        Strada, numărul, detaliile imobilului (bloc, etaj, apartament), oraș, județ
                      </small>}
                    />
                  </Grid>

                  <Grid item sm={6}>
                    <Typography variant="subtitle2" fontWeight={800}>
                      5. Telefon
                    </Typography>

                    <TextField
                      variant="outlined" fullWidth size="small"
                      value={ctx.state.r5}
                      onChange={textHandler("r5")}
                    />
                  </Grid>

                  <Grid item sm={6}>
                    <Typography variant="subtitle2" fontWeight={800}>
                      6. Adresa de e-mail
                    </Typography>
                    <TextField
                      variant="outlined" fullWidth size="small"
                      value={ctx.state.r6}
                      onChange={textHandler("r6")}
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
                      variant="outlined" fullWidth size="small"
                      value={ctx.state.r7}
                      onChange={textHandler("r7")}
                      disabled={Boolean(+ctx.state.r1) ? true : false}
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
                      variant="outlined" fullWidth size="small"
                      value={ctx.state.r8}
                      onChange={textHandler("r8")}
                      disabled={Boolean(+ctx.state.r1) ? true : false}

                    />
                  </Grid>
                </Grid>

                <Grid item sm={12}>
                  <br />
                  <Typography variant="subtitle2" fontWeight={800}>
                    9. Dețineți autorizație de mediu?
                  </Typography>
                  <Typography variant="caption" color="error">
                    IMPORTANT! Acest câmp se completează numai în cazul PERSOANELOR JURIDICE
                  </Typography>
                  <RadioGroup
                    row
                    value={ctx.state.r9}
                    onChange={radioHandler("r9")}
                  >
                    <FormControlLabel
                      label="DA"
                      control={<Radio value={1} disabled={Boolean(+ctx.state.r1) ? true : false} />}
                    />
                    <FormControlLabel
                      label="NU"
                      control={<Radio value={0} disabled={Boolean(+ctx.state.r1) ? true : false} />}
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
                    variant="outlined"
                    value={ctx.state.r10}
                    onChange={textHandler("r10")}
                    fullWidth
                    size="small"
                    disabled={Boolean(+ctx.state.r1) ? true : false || Boolean(+ctx.state.r9) ? false : true}

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
                    value={+ctx.state.r11}
                    onChange={radioHandler("r11")}
                  >
                    <FormControlLabel
                      label="Colectare"
                      control={<Radio value={1} disabled={Boolean(+ctx.state.r1) ? true : false} />}
                    />
                    <FormControlLabel
                      label="Epurare"
                      control={<Radio value={0} disabled={Boolean(+ctx.state.r1) ? true : false} />}
                    />
                  </RadioGroup>
                  {parseInt(ctx.state.r11) === 1 && (
                    <TextField
                      value={ctx.state.r111}
                      onChange={textHandler("r111")}
                      size="small" label="capacitate"
                      disabled={Boolean(+ctx.state.r1) ? true : false}
                    />
                  )}

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
                    onChange={checkboxHandler("r121")}
                    label="Din rețeaua publică"
                    control={<Checkbox checked={ctx.state.r121} />}
                  />
                  <FormControlLabel
                    onChange={checkboxHandler("r122")}
                    label="Din surse individuale"
                    control={<Checkbox checked={ctx.state.r122}  />}
                  />


                </Grid>

                <Grid item sm={12}>
                  <Typography variant="subtitle2" fontWeight={800}>
                    13. Descrieți sistemul de evacuare a apelor uzate menajere de care beneficiați
                  </Typography>

                  <TextField
                    value={ctx.state.r13}
                    onChange={textHandler("r13")}
                    multiline rows={3} variant="outlined" fullWidth size="small"
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
                    value={ctx.state.r14}
                    onChange={textHandler("r14")}
                    multiline rows={3} variant="outlined" fullWidth size="small"
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
                    value={ctx.state.r15}
                    onChange={textHandler("r15")}
                    multiline rows={3} variant="outlined" fullWidth size="small"
                  />
                </Grid>

                <Grid item sm={12}>
                  <br />
                  <Typography variant="subtitle2" fontWeight={800}>
                    16. Numărul și data Contractului încheiat cu Societatea de vidanjare.
                  </Typography>
                  <Typography variant="caption" color="error">
                    IMPORTANT! Acest câmp se completează numai de PERSOANELE JURIDICE.
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        value={ctx.state.r161}
                        onChange={textHandler("r161")}
                        variant="outlined" fullWidth label="CONTRACT NR." size="small"
                        disabled={Boolean(+ctx.state.r1) ? true : false}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <DatePicker
                        type="date"
                        label="DIN DATA"
                        value={ctx.state.r162}
                        onChange={dtHandler("r162")}
                        disabled={Boolean(+ctx.state.r1) ? true : false}
                        renderInput={(params) => <TextField variant="outlined" {...params} size="small" />}
                      />
                    </Grid>
                  </Grid>
                  <br />
                </Grid>
                {/* <Grid item sm={12} style={{ wordBreak: "break-all", padding: "10px", border: "1px solid green", background: "lightgrey" }}>
                  <strong>Codificarea formularului (in vederea salvării și transmiterii datelor acestuia)</strong>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button
                    startIcon={<FaBan color="RED" />}
                    onClick={clearHandler}>GOLEȘTE </Button>
                  &nbsp;&nbsp;
                  <Button
                    startIcon={<FaCut color="green" />}
                    onClick={copyHandler(true)}>TAIE </Button>
                  &nbsp;&nbsp;
                  <Button
                    size="small"
                    startIcon={<FaCopy color="navy" />}
                    onClick={copyHandler()}>COPIAZĂ </Button>
                  &nbsp;&nbsp;
                  <Button
                    startIcon={<FaPaste color="brown" />}
                    onClick={pasteHandler}>LIPEȘTE </Button>
                  {' '}

                  <br />
                  <Grid container>
                    <Grid item sm={true}>
                      <TextareaAutosize
                        style={{ width: "100%", height: "12.2vh" }}
                        value={ctx.b64}
                        ref={copyRef}

                        onChange={ev => setCtx({ b64: ev.target.value })}
                      >




                      </TextareaAutosize>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained" collor="error"
                        onClick={decodeHandler}
                      >
                        DECODEAZĂ <br />IN <br />FORMULAR
                      </Button>
                    </Grid>

                  </Grid>

                </Grid> */}
                    <Grid item sm = {12}>
                        <DragAndImportPdf onChange = {importPdfHandler}/>
                    </Grid>
                {/* <Grid item sm={12} sx={{ p: 1, background: "beige", fontSize: "0.7em", fontWeight: 400 }}>
                  Prin completarea și transmiterea acestui formular sunteți de acord cu prelucrarea datelor cu caracter personal în scopul înscrierii în REGISTRUL DE EVIDENȚĂ A SISTEMELOR INDIVIDUALE ADECVATE PENTRU COLECTAREA APELOR UZATE al Comunei Șagu, județul Arad. Prelucrarea datelor cu caracter personal se va realiza cu respectarea prevederilor Regulamentului nr. 679/2016 adoptat de Parlamentul European și Consiliul Uniunii Europene pentru aprobarea normelor privind protecția în ceea ce privește prelucrarea datelor cu caracter personal, precum și a normelor referitoare la libera circulație a acestui tip de date cu caracter personal.
                </Grid> */}



              </Box>
            </Grid>

          </Grid>




        </Box>

        <Box sx={{ textAlign: "center" }}>


        </Box>
        <hr />
        <br /><br />
      </Container>


      {notification && <Notification {...{ ...notification }} duration={3000} />}
      {infoModal && <InstructionsModal open={infoModal} onClose={() => setInfoModal(null)} />}
      {printModal && <PrintPreviewModal open={printModal} onClose={() => setPrintModal(null)} />}
    </Fragment>

  );
}



export const getServerSideProps = async (ctx) => {


  const { query } = ctx || {}
  
    return {
      props: {
        b64: query.param ? query.param[0]: null
      }
    }

}