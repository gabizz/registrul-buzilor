import ReactMarkdown from 'react-markdown'
import React from 'react'
import remarkGfm from 'remark-gfm'
import { Dialog, DialogContent, DialogTitle, Grid, IconButton } from '@mui/material'
import { FaTimesCircle } from 'react-icons/fa'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles( theme => ({
    dialogPaper: {
        minWidth: "90vw",
        minHeight: "100vh"
    }
}))

const markdown = `
## CONTEXT

H.G. 714/2022 a introdus obligativitatea declarării către administrațiile publice locale (primării) de către toți cetățenii care dețin fose septice sau bazine vidanjabil.

În acest sens, este necesară depunerea unei declarații, conform modelului prezentat în H.G. mai-sus amintită.

La rândul lor, primăriile au obligația de a menține un registru cuprinzând datele din aceste declarații.

Sancțiunile prevăzute de lege pentru nedeclararea în termenul legal de către deținători sistemelor de acest fel sunt destul de drastice, constând în amenzi cuprinse între 5000-10000 lei


Potrivit H.G. 714/2022 privind registrul de evidenta a sistemului individual adecvat(sia) de 
colectare si epurare a apelor uzate, persoanele care au in dotare fose septice sau bazin vidanjabil 
au obligația de a depune o declarație specială la sediul primăriei de care aparțin.

## SOLUȚIA NOASTRĂ

Noi, ca partner de soluții informatice al mai multor primării din vestul țării, am căutat să dezvoltăm o soluție care să ușureze întregul proces, urmărind, pe de o parte, completarea facilă și rapidă a cererii, găsirea unui mod de transmitere conform cu prevederile regulamentului GDPR, iar pe de altă parte, informatizarea acestui registru în primăriile partenere.


## COSTUL SOLUȚIEI

- Pentru *persoanele fizice* sau *juridice* care aleg să folosească acest mod de declarare rapid și modern, **costurile sunt 0 (zero) lei.**
- Primăriile partenere (și nu numai) pot folosi, de asemenea, **gratuit** mecanismul nostru de import/export a cererilor prin codificarea formularului în string Base64
- Primăriile pot opta să centralizeze aceste cereri și să pătreze o evidență clară într-un **REGISTRU ONLINE**. Acest serviciu presupune însă costuri, așadar accesul la acest registru va fi posibil exclusiv pe bază unui abonament lunar (100 lei/lună sau, cu reducere, 1000 lei/an)

## INSTRUCȚIUNI DE FOLOSIRE 
- **pentru persoane**
    - completați formularul cu toate datele necesare
        - **DACĂ DEȚINEȚI O SEMNĂTURA ELECTRONICĂ (TOKEN)** : 
            - descărcați în format PDF formularul (TIPĂRIRE -> alegeți tipul de declarație -> EXPORT PDF)
            - salvați fișierul PDF în calculator, senmați-l digital și transmiteți pe email către  primăria Dvs.
            - copiați formularul codificat

        - **ÎN TOAT CELELALTE CAZURI** 
            - veți semna olograf în fața funcționarului sau veți semna olograf și veți transmite pe email primăriei Dvs 

        **Notă**:
		
    _Este posibil ca primăria Dvs. să vă solicite prezentarea exemplarului semnat, în original._
        _În acest caz, va trebui să vă prezentați la sediul primăriei, noi nu avem nici o posibilitate de a le "influența" acest proces,_
        _până la urmă, dânși decid cât de riguros înțeleg să interpreteze legea.(dacă acceptă o copie a formularului semnată olograf, transmisă electronic sau nu)_\


- **pentru primării**
    - **DACĂ AȚI PRIMIT UN PDF GENERAT DIN FORMULARUL ONLINE ȘI SEMNAT ELECTRONIC**
        - dechideți aplicația SIA, adăgați o declarație nouă, iar în formularul de completare al declarației, TRAGEȚI pdf-ul primit 
            în caseta galbenă. Datele se vor prelua automat
    - **DACA AȚI PRIMIT UN DOCUMENT SCANAT** (listat din sia.e-urban.ro, semnat olograf și listat). 
        
        - folosiți orice aplicației de scanare a codurilor QR și scanați codul din partea stângă jos a paginii, după care vizitați link-ul
        asftel generat

    - **DACĂ PERSOANA A DEPUS FORMULARUL ÎN ALT FORMAT, FIE DIRECT LA PRIMĂRIE, FIE PRIN EMAIL**

         - Intrați în aplicația SIA și completați manual toate câmpurile disponibile în declarația primită.


### ASPECTE LEGALE ###

- APLICAȚIA DE FAȚĂ **_NU COLECTEAZĂ ȘI NU STOCHEAZĂ NICI UN FEL DE DATE PERSONALE_,** așadar apreciem că nu intră sub incidența Regulamentului GDPR.

- Responsabilitatea pentru transmiterea corectă, în termen și pe adresa de email corectă a datelor cererii de înscriere în Registrul SIA este **în totalitate a Dvs.**! 

----
&copy; 2022
SIGN PORTAL SRL ARAD | 
Spl. G-ral GH.Magheru, bl.304, Arad |
CUI: 16344256 |
Reg.Com.: J02/672/2004  |
Telefon: 0744.845.974  |
E-mail: office@signportal.ro
    
`

export default function InstructionsModal({open, onClose}) {

    const classes = useStyles()
    const closeHandler = () => onClose()

  return (
    <Dialog open = {Boolean(open)} onClose = {closeHandler} classes = {{paper: classes.dialogPaper}}>
        <DialogTitle>
            <Grid container alignItems="center">
                <Grid item sm={true}>
                    DESPRE ACEASTĂ APLICAȚIE WEB
                </Grid>
                <Grid item>
                    <IconButton onClick = {closeHandler}>
                        <FaTimesCircle size="2em" color="lightgrey"/>
                    </IconButton>
                </Grid>
            </Grid>
        </DialogTitle>
        <DialogContent style = {{lineHeight:1.1}}>
             <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
        </DialogContent>

    </Dialog>
  )
}
