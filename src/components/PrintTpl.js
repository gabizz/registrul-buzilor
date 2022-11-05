import React, { forwardRef, Fragment, useEffect, useState } from 'react'
import { useAppContext } from '../appContext'
import styled from 'styled-components';
import { Typography, Grid } from '@mui/material';
import SIRUTA, { getSiruta } from '../../lib/siruta';
import { makeStyles } from '@mui/styles';
import PrintInputs from './InputForm/PrintInputs';
import { DATE_GENERALE, DECLARATIE_COLECTARE, DECLARATIE_EPURARE, GDPR } from './InputForm/Props';
import GenerateQr from '../GenerateQr';
import { b64_encode } from '../b64';

const useStyles = makeStyles(theme => ({
  justify: {
    textAlign: "justify", textJustify: "inter-word"
  }
}))

const RenderForm = ({ data }) => {
  const [ctx] = useAppContext()
  return (
    <Fragment>
    <Grid container spacing={0}>
      {data.map((e, i) => {
        return (
          <Fragment key={i}>
              {!(e.type === "divider" && !e.value)
                ? (
                  <Grid item sm={e.printSm ?? e.sm} style={{ border: "0.01em solid black", paddingLeft: "0.5em" }} >

                  <PrintInputs
                    type={e.type}
                    kkey={e.key}
                    value={ctx.state[e.key]}
                    label={e.label}
                    options={e.options}
                  />
                </Grid>
                )
                : null  
              }
              {e.type === "pageBreak" && <Grid item sm={12} className='pagebreak'><br/><br/><br/><br/></Grid>}
              
           
         
            
          
          </Fragment>

        )
      }
      )}
    </Grid>
    </Fragment>
  )
}

// const GenerateQr = dynamic( () => import("../GenerateQr"), {ssr: false})

const PrintTpl = forwardRef(({ siruta, ...rest }, ref) => {

  const [ctx] = useAppContext()
  const classes = useStyles()
  const loc = () => {
    let res = SIRUTA.find(el => el.siruta === ctx.state.loc)
    return typeof res !== "undefined" ? res['denloc'] : "____________________"
  }
  const [qrData, setQrData] = useState()

  const jud = () => {
    let res = SIRUTA.find(el => el.siruta === ctx.state.jud)
    return res ? res['denloc'] : "____________________"
  }

  useEffect(() => {
    console.log("Ctx PRINT:", ctx.print)
    let b64res = "";
    if ( ctx.print === "colectare") {
      b64res = Object.keys(ctx.state).reduce( (acc,key) => {
        if ( ["jud", "loc", "nr", "dt", "gdpr"].indexOf(key) > -1) { acc = {...acc, [key]: ctx.state[key]} }
        if ( ["r", "c"].indexOf(key.charAt(0)) > -1 )  { acc = {...acc, [key]: ctx.state[key]} }
        return acc
      }, {})
      
    }
    if ( ctx.print === "epurare") {
      b64res = Object.keys(ctx.state).reduce( (acc,key) => {
        if ( ["jud", "loc", "nr", "dt", "gdpr"].indexOf(key) > -1) { acc = {...acc, [key]: ctx.state[key]} }
        if ( ["r", "e"].indexOf(key.charAt(0)) > -1 )  { acc = {...acc, [key]: ctx.state[key]} }
        return acc
      }, {})
      
    }
     
      
    
    console.log("b64res: ", b64res )
    setQrData(b64_encode(JSON.stringify( b64res )))
  }, [ctx.print])

  return (
    <Styles>
      <div className="printable" ref={ref} {...rest} style={{ padding: "20px" }}>
        <div align="center">
          <Typography variant="h5" component="h1" gutterBottom sx={{ mt: 2, textAlign: "center", fontSize: "0.8rem", fontWeight: 600 }}>
            Declarație de înregistrare
            în Registrul de evidență a sistemelor individuale<br /> adecvate pentru colectarea/epurarea apelor uzate
            al localitatea {loc()} din județul {jud()}
          </Typography>

        </div>
        &nbsp;
        <RenderForm data={DATE_GENERALE} />

        {ctx.print === "colectare" && <RenderForm data={DECLARATIE_COLECTARE} />}
        {ctx.print === "epurare" && <RenderForm data={DECLARATIE_EPURARE} />}

        <Grid container>
          <Grid item style={{ border: "0.01em solid black", paddingLeft: "0.1em" }} sm={3} >
            <GenerateQr data={qrData} />
          </Grid>
          <Grid item
            style={{
              border: "0.01em solid black", padding: "0.4em", textAlign: "justify", textJustify: "inter-word",
              display: "flex", alignItems: "center"
            }}
            sm={7}
          >
            <div>
              <Typography variant="caption" fontWeight={700} component="p">ACORD pentru prelucrarea datelor cu caracter persoanal</Typography>

              <Typography variant="caption" fontWeight={400} component="p" style={{ lineHeight: 1.1 }}>
                Prin completarea și transmiterea acestui formular sunteți de acord cu prelucrarea datelor cu caracter personal în scopul
                înscrierii în REGISTRUL DE EVIDENȚĂ A SISTEMELOR INDIVIDUALE ADECVATE PENTRU COLECTAREA APELOR UZATE al
                localității <strong>{jud()}</strong> , județul <strong> {loc()}</strong>
                <br />Prelucrarea datelor cu caracter personal se va realiza cu respectarea prevederilor Regulamentului nr. 679/20166
                adoptat de Parlamentul European și Consiliul Uniunii Europene pentru aprobarea normelor privind protecția în ceea ce
                privește prelucrarea datelor cu caracter personal, precum și a normelor referitoare la libera circulație a acestui tip
                de date cu caracter personal.
              </Typography>
            </div>
          </Grid>
          <Grid item style={{ border: "0.01em solid black", paddingLeft: "0.5em" }} sm={2} align="center">
            <br />
            <Typography variant="caption">
              Semnătura,
            </Typography>
          </Grid>
          <div>

          </div>
        </Grid>

      </div>



    </Styles>
  )
})




export default PrintTpl

export const Styles = styled.div`
@media all {
  .pagebreak {
    display: none;
  }
  .printable {
    margin: 10mm;
  }

@media print {
 
    @page {
      margin: 0;
      border: initial;
      border-radius: initial;
      width: initial;
      min-height: initial;
      box-shadow: initial;
      background: initial;
      page-break-after: always;
      display: table;
    
    }
    html, body {
      height: initial !important;
      overflow: initial !important;
      -webkit-print-color-adjust: exact;
      display: table;
    }
    

  div.printable {
    display: table;
  }
}

@media print {
  div.pagebreak {
    margin-top: 1rem;
    display: block;
    page-break-after: auto;

  }
}


` 