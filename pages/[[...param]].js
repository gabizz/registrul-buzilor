import { Button, Card, IconButton, Typography, Divider, Menu, MenuItem, Grid, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import SIRUTA from "../lib/siruta";
import { useAppContext } from '../src/appContext';


import { makeStyles } from '@mui/styles';
import { b64_decode, b64_encode } from '../src/b64';
import Notification from '../src/components/Notification';

import { FaInfoCircle } from "react-icons/fa";
import { MdPrint } from "react-icons/md";
import DragAndImportPdf from '../src/components/DragAndImportPdf';
import DateGenerale from '../src/components/InputForm/DateGenerale';
import DeclaratieColectare from '../src/components/InputForm/DeclaratieColectare';
import DeclaratieEpurare from '../src/components/InputForm/DeclaratieEpurare';
import InstructionsModal from '../src/components/InstructionsModal';
import { MyTab, MyTabs } from '../src/components/MyTabs';
import PrintPreviewModal from '../src/components/PrintPreviewModal';
import DebugDrawer from '../src/components/DebugDrawer';


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
    },
    },
  card: {
    padding: theme.spacing(2),
    margin: 0,
    marginTop: "5px",
    height: "60vh", overflow: "auto",
    boxShadow: "1px 1px 10px lightgrey"
  },

}))


export default function Index({ b64 }) {

  const classes = useStyles()
  const [ctx, setCtx] = useAppContext()
  const router = useRouter()
  const [debugData, setDebugData] = useState()




  useEffect(() => {
    let b64 = b64_encode(JSON.stringify(ctx.state))
    setCtx({ b64: b64 })
  }, [ctx.state])

  useEffect(() => {
    if (b64) {
      let decoded = decoder(b64)
      if (decoded) {
        let obj = JSON.parse(decoded)

        // setCitiesList(SIRUTA.filter(el => el.siruta == obj.loc))
        setCtx({ state: obj, b64: b64 })
      }

    }
  }, [b64])


 


  return (
    <Fragment>

      <Container maxWidth="lg" sx={{ position: "absolote", background: "lightgrey" }}>
        <Box sx={{ my: 1, position: "relative" }}>

          <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: "center", fontSize: "1rem" }}>
            DECLARAȚIE DE ÎNREGISTRARE<br />
            în Registrul de evidență a sistemelor individuale adecvate pentru colectarea/epurarea apelor uzate
          </Typography>
        </Box>
      </Container>

      <Container maxWidth="lg">
        <Grid container alignItems="center" justifyContent="space-between">
           <Grid item sm = {2} align="center">
            <small>TIP DECLARAȚIE</small>
        </Grid>
        <Grid item sm ={3} align="left">
          <RadioGroup row
            value={ctx.state.tip}
            onChange = {ev => setCtx({state: {...ctx.state, tip: +ev.target.value}})}
          >
              <FormControlLabel 
                label = {<strong>COLECTARE</strong>}
                control={<Radio value = {1}></Radio>
              }
              />
              <FormControlLabel 
                label = {<strong>EPURARE</strong>}
                control={<Radio value = {0}></Radio>
              }
              />
          </RadioGroup>
        </Grid>
        <Grid item sm = {4}></Grid>
        <Grid item sm = {2}>
          <Button
              color="error" size="small" variant="outlined" fullWidth
              onClick={ev=>setCtx({anchorEl: ev.currentTarget})} style={{ marginRight: "5px" }}
              disabled = {!ctx.state.gdpr || (ctx.state.gdpr && ctx.state.gdpr === "0")}
              startIcon={<MdPrint />}
          >TIPĂRIRE</Button>
          </Grid>
          <Grid item sm = {true}>
          <Menu anchorEl= {ctx.anchorEl} open = {Boolean(ctx.anchorEl)} onClose = {()=>setCtx({anchorEl: null})}>
              <MenuItem onClick = {()=>setCtx({print:"colectare", anchorEl:null})}>DECLARATIE COLECTARE</MenuItem>
              <MenuItem onClick = {()=>setCtx({print:"epurare", anchorEl: null})}>DECLARATIE EPURARE</MenuItem>
          </Menu>
          </Grid>
          <Grid item sm = {true}>
          <IconButton size="small" color="info" onClick={() => setCtx({ info: true })} 
            onContextMenu = {ev => {ev.preventDefault();setDebugData(ctx.state)}}
            >
            <FaInfoCircle size="1.5em" />
          </IconButton>
          </Grid>
          <Grid item sm = {12}>
            <Divider/>
            <br/>
          </Grid>
        </Grid>

      </Container>

      <Container maxWidth="lg">
        <MyTabs value={ctx.tabIndex} onChange={(ev, newVal) => setCtx({ tabIndex: newVal })} >
          <MyTab key={0} value={0} label="DATE GENERALE" />
          {ctx.state.tip === 1 && (<MyTab key={1} value={1} label="DECLARAȚIE COLECTARE" />)}
          {ctx.state.tip === 0 && (<MyTab key={2} value={2} label="DECLARAȚIE EPURARE" />)}
          
          
        </MyTabs>
    {console.log("ctx:", ctx.state)}
        <Card className={classes.card}>
          {ctx.tabIndex === 0 && <DateGenerale />}
          {ctx.tabIndex === 1 && <DeclaratieColectare />}
          {ctx.tabIndex === 2 && <DeclaratieEpurare />}
        </Card>

      </Container>

      <Divider sx={{m:2}}/>
      
      <Container maxWidth="lg">
        <DragAndImportPdf onChange={ev => router.push("https://sia.e-urban.ro/" + ev)} />
      </Container>


      {ctx.notify && <Notification open={ctx.notify} duration={3000} />}
      {ctx.info && <InstructionsModal open={ctx.info} onClose={() => setCtx({ info: null })} />}
      {ctx.print && <PrintPreviewModal open={ctx.print} onClose={() => setCtx({ print: null })} />} 
      {debugData && <DebugDrawer open = {debugData} onClose = {()=>setDebugData(null)}/>}

    </Fragment>

  );
}



export const getServerSideProps = async (ctx) => {


  const { query } = ctx || {}

  return {
    props: {
      b64: query.param ? query.param[0] : null
    }
  }

}