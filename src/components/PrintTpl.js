import React, { Fragment } from 'react'
import { useAppContext } from '../appContext'
import styled from 'styled-components';
import { FormControlLabel, Typography, Checkbox, TextField, Grid } from '@mui/material';
import moment from 'moment';




export default function PrintTpl({ siruta }) {

  const [ctx] = useAppContext()

  const loc = () => {
    let res = siruta && siruta.find(el => el.siruta === ctx.state.loc)
    return typeof res !== "undefined" ? res['denloc'] : "____________________"
  }

  const jud = () => {
    let res = siruta && siruta.find(el => el.parent === ctx.state.jud)
    return res ? res['denloc'] : "____________________"
  }

  return (
    <Styles>



        <div style={{ width: "100%"}} className = "printable">

          <div align="right">Nr............... din...........................</div>
          <div align="center">
            <Typography variant="h5" component="h1" gutterBottom sx={{ mt: 2, textAlign: "center", fontSize: "1rem", fontWeight: 600 }}>
              DECLARAȚIE DE ÎNREGISTRARE<br />
              în Registrul de evidență a sistemelor individuale adecvate pentru colectarea apelor uzate<br />
              al localității {loc()} din județul {jud()}
            </Typography>
          </div>
          <div>

          </div>
          {/* <div>{JSON.stringify(ctx.state, null, 4)}</div> */}
          <div>
            <strong>1. Tipul înscrierii</strong>

            <div style={{ paddingLeft: "40px", }}>
              <FormControlLabel
                label="Persoană fizică"
                control={<input type="checkbox" checked={+ctx.state.r1 === 1} />}
              />

              <br />

              <FormControlLabel
                label="Persoană juridică"
                control={<input type="checkbox" checked={+ctx.state.r1 === 0} />}
              />
            </div>

          </div>
          <div>
            <strong>2. Numele și prenumele dumneavoastră/Denumirea entității juridice și număr persoane deservite de SIA</strong>
            <br />
            <div style={{ paddingLeft: "40px" }}>
              <i>{ctx.state.r2 || "..................................................................................................."} </i>
            </div>
          </div>
          <div>
            <strong>3. CNP/CUI</strong>
            <br />
            <div style={{ paddingLeft: "40px" }}>
              <i>{ctx.state.r3 || "..................................................................................................."} </i>
            </div>
          </div>
          <div>
            <strong>4. Adresa completă</strong><br/>
            <small><i>Strada, numărul, detaliile imobilului (bloc, etaj, apartament), oraș, județ</i></small>
            <br />
            <div style={{ paddingLeft: "40px" }}>
              <i>{ctx.state.r4 || "..................................................................................................."} </i>
            </div>
          </div>
          <div>
            <strong>5. Telefon</strong><br/>
            {/* <small><i>Strada, numărul, detaliile imobilului (bloc, etaj, apartament), oraș, județ</i></small> */}
  
            <div style={{ paddingLeft: "40px" }}>
              <i>{ctx.state.r5 || "..................................................................................................."} </i>
            </div>
          </div>
          <div>
            <strong>6. Adresa de e-mail</strong><br/>
            {/* <small><i>Strada, numărul, detaliile imobilului (bloc, etaj, apartament), oraș, județ</i></small> */}
  
            <div style={{ paddingLeft: "40px" }}>
              <i>{ctx.state.r6 || "..................................................................................................."} </i>
            </div>
          </div>
          <div>
            <strong>7. Activitatea principală conform CAEN</strong><br/>
            <small><i>IMPORTANT! Acest câmp se completează numai în cazul PERSOANELOR JURIDICE</i></small>
            <br />
            <div style={{ paddingLeft: "40px" }}>
              <i>{ctx.state.r7 || "..................................................................................................."} </i>
            </div>
          </div>
          <div>
            <strong>8. Descrierea activității societății</strong><br/>
            <small><i>IMPORTANT! Acest câmp se completează numai în cazul PERSOANELOR JURIDICE</i></small>
            <br />
            <div style={{ paddingLeft: "40px" }}>
              <i>{ctx.state.r8 || "..................................................................................................."} </i>
            </div>
          </div>
          <div>
            <strong>9. Dețineți autorizație de mediu?</strong><br/>
            <small><i>IMPORTANT! Acest câmp se completează numai în cazul PERSOANELOR JURIDICE</i></small>
            <br />
            <div style={{ paddingLeft: "40px" }}>
                <FormControlLabel 
                    label = "DA"
                    control = {<input type = "checkbox" defaultChecked = {+ctx.state.r9 === 1} />}
                />
                <FormControlLabel 
                    label = "NU"
                    control = {<input type = "checkbox" defaultChecked = {+ctx.state.r9 === 0} />}
                />
            </div>
          </div>
          <div>
            <strong>10. Numărul și data autorizației de mediu (dacă există) – opțional</strong><br/>
            <small><i>IMPORTANT! Acest câmp se completează numai în cazul PERSOANELOR JURIDICE</i></small>
            <br />
            <div style={{ paddingLeft: "40px" }}>
              <i>{ctx.state.r10 || "..................................................................................................."} </i>
            </div>
          </div>
          <div>
            <strong>11. Sistemul individual de care beneficiați și capacitate proiectată</strong><br/>
            <small><i>IMPORTANT! Acest câmp se completează numai în cazul PERSOANELOR JURIDICE</i></small>
            <br />
              <div style={{ paddingLeft: "40px" }}>
                <FormControlLabel 
                    label = "Colectare"
                    control = {<input type = "checkbox" defaultChecked = {+ctx.state.r11 === 1} />}
                /> capacitate: &nbsp;&nbsp;&nbsp;
                 <TextField variant="standard" size="small" type="text" value = {ctx.state.r111 || "nu este cazul"} />
                <br/>
                <FormControlLabel 
                    label = "Epurare"
                    control = {<input type = "checkbox" defaultChecked = {+ctx.state.r11 === 0} />}
                />

              </div>
            </div>
            <div>
            <strong>12. Sursa de alimentare cu apă de care beneficiați</strong><br/>
            <small><i>Bifați toate opțiunile care se aplică.</i></small>
            <br />
            <div style={{ paddingLeft: "40px" }}>
                <FormControlLabel 
                    label = "Din rețeaua publică"
                    control = {<input type = "checkbox" checked = {+ctx.state.r12 === 1} />}
                />
                <br/>
                <FormControlLabel 
                    label = "Din surse individuale"
                    control = {<input type = "checkbox" checked = {+ctx.state.r12 === 0} />}
                />
            </div>
          </div>
          <div>
            <strong>13. Descrieți sistemul de evacuare a apelor uzate menajere de care beneficiați</strong><br/>
            <br />
            <div style={{ paddingLeft: "40px" }}>
              <i>{ctx.state.r4 || "..................................................................................................."} </i>
            </div>
          </div>
          <div>
            <strong>14. Descrieți modul în care se realizează epurarea apelor uzate:</strong><br/>
            <small><i>Vă rugăm elaborați un răspuns detaliat.</i></small>
            <br />
            <div style={{ paddingLeft: "40px" }}>
              <i>{ctx.state.r4 || "..................................................................................................."} </i>
            </div>
          </div>
          <div>
            <strong>15. Descrieți modul în care se monitorizează descărcarea apelor uzate:</strong><br/>
            <small><i>Vă rugăm să ne oferiți rezultatele ultimelor analize efectuate.</i></small>
            <br />
            <div style={{ paddingLeft: "40px" }}>
              <i>{ctx.state.r4 || "..................................................................................................."} </i>
            </div>
          </div>
          <div>
            <strong>16. Numărul și data Contractului încheiat cu Societatea de vidanjare.</strong><br/>
            <small><i>IMPORTANT! Acest câmp se completează numai în cazul PERSOANELOR JURIDICE</i></small>
            <br />
            <div style={{ paddingLeft: "40px" }}>
                Contract nr. <i>{(ctx.state.r161&&ctx.state.r162) ? ctx.state.r161 + " / " + moment(ctx.state.r162).format("DD.MM.YYYY"): "nu este cazul "} </i>
            </div>
          </div>
          <br/>
          <Grid container alignItems = "flex-start" justifyContent="space-between">
              <Grid item sm = {6} align="center">
                Data,<br/>
                <strong>{moment(ctx.state.dt).format("DD.MM.YYYY")}</strong>
              </Grid>
              <Grid item sm = {6} align="center">
                Semnătura,<br/>
                <strong>. . . . . . . . . . . . . . . . . . . .</strong>
              </Grid>
          </Grid>
          <br/>
          <br/>
          <div style = {{width: "100%", wordWrap: "break-word", textAlign: "justify", textJustify: "inter-word"}}>
          Prin completarea și transmiterea acestui formular sunteți de acord cu prelucrarea datelor cu caracter personal în scopul 
          înscrierii în REGISTRUL DE EVIDENȚĂ A SISTEMELOR INDIVIDUALE ADECVATE PENTRU COLECTAREA APELOR UZATE al localității {loc}, județul {jud}. Prelucrarea datelor cu caracter personal se va realiza cu respectarea prevederilor Regulamentului nr. 679/20166 adoptat de Parlamentul European și Consiliul Uniunii Europene pentru aprobarea normelor privind protecția în ceea ce privește prelucrarea datelor cu caracter personal, precum și a normelor referitoare la libera circulație a acestui tip de date cu caracter personal.
          </div>

        </div>
    </Styles>
  )
}

export const Styles = styled.div`

@media print {
        @page { 
            size:  A4 portrait;
            margin: 10mm 10mm 10mm 30mm; 
        };
        div.printable{
            zoom: 0.65;
            div {
                page-break-inside: avoid!important;
                break-inside: avoid!important;
                
            }
        }
}
@media screen {
  display: none;
}
`