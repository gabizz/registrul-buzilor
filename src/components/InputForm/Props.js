import React from 'react'
import { Divider, Typography } from '@mui/material'
import moment from "moment"
import { getSiruta } from '../../../lib/siruta'


export const DATE_GENERALE =  [
        // {type: "divider", sm: "12", label: <Divider/>},
        // {key: "nr", defaultValue: 0, label: "NR. INREG", type: "number", sm: 3},
        
        {type: "divider", sm: 12, label: <Divider/>},
        {key: "jud", defaultValue: 0, label: "JUDEȚUL", type: "jud",  sm:3 },
        {key: "loc", defaultValue: 0, label: "LOCALITATEA", type: "loc",  sm: 3 },
        {type: "divider", sm: 2, label: <div align="center">Tip persoană</div>, value: true, printSm: 1.3},
        {
            key: "r1", defaultValue: 0, label: "", type: "radio", 
            options: [{value: 0, label:<small>juridică</small>}, {value:1, label: <small>fizică</small>}], 
            sm: 2.5
        },
        {key: "dt", defaultValue: moment().format("YYYY-MM-DD"), label: "DATA DECLARĂRII", type: "date", sm: 2, printSm: true},
        {type: "divider", sm: 12, label: <Divider/>},
        // {type: "divider", label: "Tip persoană", sm: 2},
        // {key: "r1", defaultValue: 0, label: "", type: "radio", options: [{value: 0, label: "JURIDICA"}, {value:1, label: "FIZICA"}], sm: true},
        {type: "divider", sm: 12, label: <Divider/>},
        {key: "r2", defaultValue: "", label: "NUME/DENUMIRE", type: "text", sm: 9},
        {key: "r3", defaultValue: "", label: "CNP/CUI", type: "text", sm: 3},
        {key: "r4", defaultValue: "", label: "ADRESA", type: "text", sm: 8},
        {key: "r5", defaultValue: "", label: "TELEFON", type: "text", sm: 2},
        {key: "r6", defaultValue: "", label: "EMAIL", type: "text", sm: true},
        {key: "r7", defaultValue: "", label: "CAEN", type: "text", pjOnly: true, sm:2},
        {key: "r8", defaultValue: "", label: "DESCRIERE ACTIVITATE", type: "text", pjOnly: true, sm: 10},
        {type: "divider", label: <Divider/>, sm:12},
       
    ]
   
    export const DECLARATIE_COLECTARE = [
            
            {type:
                 "divider", sm: 10, 
                 label: "Dețineți autorizație de construire pentru sistemul individual adecvat de colectare?",
                 value: true
            },
            {
                key: "c1", type: "radio",  
                options: [{value: 1, label: "DA"}, {value: 0, label: "NU"}],
                label: "",
                sm: 2,
            },
            { type:"divider",  sm: 12,   label: <Divider/> },
            {
                type:"divider", 
                sm: 8, 
                label: "Număr autorizație de construire pentru sistemul individual adecvat de colectare",
                value:true
            },
            {
                key: "c2", type: "text",
                label: "Nr.",
                sm:2,
            },
            {
                key: "c3", type: "date",
                label: "din data", 
                sm:2,
            },
            { type:"divider",  sm: 12,   label: <Divider/> },
            {
                type:"divider", 
                label: "Număr persoane deservite de sistemul individual adecvat de colectare",
                sm: 10, 
                value:true
            },
            {
                key: "c4", type: "number",
                label: "nr.pers", 
                sm:2,
                
            },
            { type:"divider",  sm: 12,   label: <Divider/> },
            {
                type:"divider", 
                label: "Tip sistem individual adecvat de colectare", value:true,
                sm: 8, 
            },
            {
                key: "c5", type: "radio", options: [{value:1, label:"Fosă etanșă"}, {value: 0, label: "Fosă betonată"}],
                label: "", 
                sm:4,
            },
            { type:"divider",  sm: 12,   label: <Divider/> },
            {
                type:"divider", 
                label: "Capacitatea sistemul individual adecvat de colectare (mc)", value: true,
                sm: 11, printSm:11
            },
            {
                key: "c6", type: "number",
                label: <>m<sup>3</sup></>, 
                sm:1,
            },
            { type:"divider",  sm: 12,   label: <Divider/> },
            {
                type:"divider", 
                label: "Dețineți contract de vidanjare?", value: true,
                sm: true, printSm: 10
            },
            {
                key: "c7", type: "radio", options: [{value:"1", label:"DA"}, {value: "b", label: "NU"}],
                label: "", 
                sm:2,
            },
            { type: "divider", label: <Divider/>, sm: 12},
            { 
                type: "divider", label:"Nr.contract de vidanjare: ",   value: true,
                sm: 2, printSm: 8
            },
            {
                key:"c8", type: "text", 
                label: "nr.contract",
                sm: 2
            },
            
            { type: "divider", label:<div align="right">valabil până la: </div>, sm: 2},
            {
                key:"c9", type: "date", 
                label: "data expirare",
                sm: 2
            },
            // { type: "divider", label: <Divider/>, sm: 12},
            {
                key:"c10", type: "text", 
                label: <>Nume companie care vidanjează apele uzate&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>, 
                sm: true, printSm: 12
            },
            { type:"divider",  sm: 12,   label: <Divider/> },
            { 
                type: "divider", label:<div align="left">Volum de apă uzată vidanjată (m<sup>3</sup>) </div>, 
                value: true,
                sm: true, printSm:11
            },
            {
                key:"c11", type: "number", 
                label: <>m<sup>3</sup></>,
                sm: 1
            },
            { type:"divider",  sm: 12,   label: <Divider/> },
            {   
                type: "divider", label:"Nume rețea de canalizare /stație de epurare unde se descarcă vidanjele", 
                sm: true, printSm: 4
            },
            {
                key:"c12", type: "text", 
                label: <>nume rețea / stație &nbsp;&nbsp;&nbsp;&nbsp;</>,
                sm: 6
            },
            { type:"divider",  sm: 12,   label: <Divider/> },
            { 
                type: "divider", label:"Număr contract preluare ape vidanjate", sm: true, printSm: 6},
            {
                key:"c13", type: "text", 
                label: <>nr. contract preluare ape vidanjate &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>,
                sm: 3, printSm:4
            },
            { type:"divider",  sm: 12,   label: <Divider/> },
            { 
                type: "divider", label:<div align="left">Volum total anual de apă uzată vidanjată (m<sup>3</sup>) </div>, 
                sm: true, printSm: 9},
            {
                key:"c14", type: "number", 
                label: <>m<sup>3</sup></>,
                sm: 1, printSm:2
            },
            { type:"divider",  sm: 12,   label: <Divider/> },
            { 
                type: "divider", label:<div align="left">Frecvența de vidanjare și descărcare ape uzate</div>, 
                value: true,
                sm: true, printSm:9
            },
            {
                key:"c15", type: "text", 
                label: <>frecvența de vidanjare&nbsp;&nbsp;&nbsp;&nbsp;</>,
                sm: 3
            },
            { type:"divider",  sm: 12,   label: <Divider/> },
            {   
                type: "divider", label: "Există buletin de analiză privind calitatea apelor uzate vidanjate?", 
                sm: true, printSm:10, value:true
            },
            {
                key: "c16", type: "radio", options: [{value: 1, label: "DA"}, {value: 0, label: "NU"}],
                sm: 2
            },
            { type:"divider",  sm: 12,   label: <Divider/> },
            { type: "divider", label:<div align="left">Valoarea concentrație medie anuală în apele vidanjate, CBO5 (mg/l)</div>,
             sm: true, printSm:9, value: true},
            {
                key:"c17", type: "text", 
                label: <>concentrație&nbsp;&nbsp;&nbsp;&nbsp;</>,
                sm: 3
            },
            
        ]
    

    export const DECLARATIE_EPURARE = [
        {type: "divider", sm: 12, label: <Divider/>},
        {type:
            "divider", sm: 10,
            label: "Dețineți autorizație de construire pentru sistemul individual adecvat de epurare?",
            value: true
       },
       {
           key: "e1", type: "radio",  
           options: [{value: 1, label: "DA"}, {value: 0, label: "NU"}],
           label: "",
           sm: 2,
       },
       { type:"divider",  sm: 12,   label: <Divider/> },
       {
           type:"divider", 
           sm: true, 
           label: "Număr autorizație de construire pentru sistemul individual adecvat de epurare",
           value: true, printSm: 8
       },
       {
           key: "e2", type: "text",
           label: "Nr.",
           sm:2,
       },
       {
           key: "e3", type: "date",
           label: "din data", 
           sm:2,
       },    
       { type:"divider",  sm: 12,   label: <Divider/> },
       {
           type:"divider", 
           sm: true, 
           label: "Dețineți autorizație pentru gospodărirea apelor?",
           value: true, printSm: 6
       },
       {
        key: "e4", type: "radio",  
        options: [{value: 1, label: "DA"}, {value: 0, label: "NU"}],
        label: "",
        sm: 2,
    },
    { type:"divider",  sm: 12,   label: <Divider/>, value: null, },
    {
        type:"divider", 
        sm: true, 
        label: "Număr autorizație de gospodărire a apelor",
         
    },
       {
           key: "e5", type: "text",
           label: "Nr.",
           sm:2,
       },
       {
           key: "e6", type: "date",
           label: "din data", 
           sm:2,
       },    
       { type:"divider",  sm: 12,   label: <Divider/> },
       {
        type:"divider", 
        sm: true, 
        label: "Tip sistem adecvat de epurare",
        value: true, printSm: 6
    },
    {
        key: "e7", type: "select",
        options: [
            {value: 1, label: "SR EN 12566-1:2016"},
            {value: 2, label: "SR EN 12566-3:2016"},
            {value: 3, label: "SR EN 12566-4:2016"},
            {value: 3, label: "SR EN 12566-6:2016"},
            {value: 5, label: "SR EN 12566-7:2016"},
        ],
        label: "OPȚIUNE",
        sm:3, printSm: 6
    },
    { type:"divider",  sm: 12,   label: <Divider/> },
    {
        type:"divider", 
        sm: 12, 
        label: "Nivel de epurare realizat"
    },
    { type: "divider", sm: 1},
    {
        key: "e81", type: "checkbox",
        value: 1,
        label: <small>Primar - epurare mecanică (procese fizice și/sau chimice)</small>,
        sm: 11, printSm: 12
    },
    { type: "divider", sm: 1},
    {
        key: "e82", type: "checkbox",
        value: 1,
        label: <small>Secundar - epurare biologică (proces biologic)</small>,
        sm: 11, printSm: 12
    },
    { type: "divider", sm: 1},
    {
        key: "e83", type: "checkbox",
        value: 1,
        label: <small>Terțiar - epurare biologică avansată (proces biologic) cu îndepărtarea nutrienților (azot total și fosfor
            total), eventual și UV/clorinare și alte procedee ca etapă de finisare</small>,
        sm: 11, printSm: 12
    },
    { type:"divider",  sm: 12,   label: <Divider/> },
    {
        type:"divider", 
        sm: true, 
        label: "Capacitatea proiectată a sistemului individual adecvat de epurare (mc/zi)",
        value: true, printSm:10
    },
    {
        key: "e9", type: "number",
        label: <>mc<sup>3</sup></>,
        sm:2
    },
    { type:"divider",  sm: 12,   label: <Divider/> },
    {
        type:"divider", 
        sm: true, 
        label: "Capacitate proiectată sistem individual adecvat de epurare, în locuitori echivalenți",
        value: true, printSm:10
    },
    {
        key: "e10", type: "number",
        label:"nr.loc",
        sm: 2
    },
    { type:"divider",  sm: 12,   label: <Divider/> },
    {
        type:"divider", 
        sm: true, 
        label: "Parametrii proiectare sistem individual adecvat de epurare, CBO5 (kg/zi)",
        value: true, printSm:10
    },
    {
        key: "e11", type: "number",
        label:"kg/zi",
        sm: 2
    },
    { type:"divider",  sm: 12,   label: <Divider/> },
    {
        type:"divider", 
        sm: true, 
        label: "Tip evacuare",
        value: true, printSm:9
    },
    {
        key: "e12", 
        type: "radio", 
        options: [{value: 1, label: "DIRECTĂ"}, {value: 0, label: "INDIRECTĂ"} ],
        printSm:3
    },
    { type:"divider",  sm: 12,   label: <Divider/> },
    {
        type:"divider", 
        sm: 8, 
        label: "Număr contract de mentenanță / operare",
        value: true, printSm:8
    },
    {
        key: "e13", type: "text",
        label: "Nr.",
        sm:2,
    },
    {
        key: "e14", type: "date",
        label: "din data", 
        sm:2,
    },
    { type:"divider",  sm: 12,   label: <Divider/> },
    {
        type:"divider", 
        sm: 4, 
        label: "Cine monitorizează calitata apelor uzate epurate",
        value: true, printSm:6
    },
    {
        key: "e15", type: "text",
        label: <>specificați cine monitorizează calitatea apelor uzate &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>,
        sm: true, printSm: 6
    },
    { type:"divider",  sm: 12,   label: <Divider/> },
    {
        type:"divider", 
        sm: 7, 
        label: "Nr. buletin analiză/ comanda/ contract monitorizare calitate ape uzate epurate",
        value: true, printSm:8
    },
    {
        key: "e16", type: "text",
        label: <>nr.buletin/comandă/contract monitorizare &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>,
        sm: true, printSm:4
    },
    { type:"divider",  sm: 12,   label: <Divider/> },
    {
        type:"divider", 
        sm: true, 
        label: "Volum total nămol epurare vidanjat (mc)",
        value: true, printSm:10
    },
    {
        key: "e17", type: "text",
        label: <>m<sup>3</sup></>,
        sm: 2
    },
    { type:"divider",  sm: 12,   label: <Divider/> },
    {
        type:"divider", 
        sm: 4, 
        label: "Nume firmă vidanjare nămol",
        value: true, printSm:4
    },
    {
        key: "e18", type: "text",
        label: <>nume firmă vidanjare nămol &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>,
        sm: true, printSm: 8
    },
    { type:"divider",  sm: 12,   label: <Divider/> },
    {
        type:"divider", 
        sm: 4, 
        label: "Frecvență vidanjare nămol de epurare",
        value: true, printSm:8
    },
    {
        key: "e19", type: "text",
        label: <>frecvență vidanjare nămol &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>,
        sm: true, printSm: 4
    },
    { type:"divider",  sm: 12,   label: <Divider /> },
    {
        type:"divider", 
        sm: 5, 
        label: "Nume instalație unde se tratează nămolul de epurare",
        value: true, printSm:6
    },
    {
        key: "e20", type: "text",
        label: <>nume instalație tratare nămol &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div /></>,
        sm: true, printSm:6
    },
    { type:"divider",  sm: 12,   label: <Divider/>, },
    { type: "pageBreak",  value: true, sm:12},
    {
        type:"divider", 
        sm: 12, 
        label: "Parametri pentru ape uzate epurate prevăzuți în autorizația de gospodărire a apelor (l/s, mg/l)",
        value: true, printSm:12
    },
    {
        key: "e21", type: "text", 
        label: "debit (l/s)",
        sm: true,
    },
    {
        key: "e22", type: "text", 
        label: "CBO5",
        sm: true
    },
    {
        key: "e23", type: "text", 
        label: "CCO-Cr",
        sm: true
    },
    {
        key: "e24", type: "text", 
        label: "Mat. în suspensie",
        sm: true
    },
    {
        key: "e25", type: "text", 
        label: "Amoniu",
        sm: true
    },
    {
        key: "e26", type: "text", 
        label: "Azotați",
        sm: true
    },
    {
        key: "e27", type: "text", 
        label: "Detergenți",
        sm: true
    },
    { type:"divider",  sm: 12,   label: <Divider/> },
    {
        type:"divider", 
        sm: 12, 
        label: "Parametri pentru ape uzate epurate realizați (l/s, mg/l)",
        value: true
    },
    {
        key: "e28", type: "text", 
        label: "debit (l/s)",
        sm: true
    },
    {
        key: "e28", type: "text", 
        label: "CBO5",
        sm: true
    },
    {
        key: "e30", type: "text", 
        label: "CCO-Cr",
        sm: true
    },
    {
        key: "e31", type: "text", 
        label: "Mat. în suspensie",
        sm: true
    },
    {
        key: "e32", type: "text", 
        label: "Amoniu",
        sm: true
    },
    {
        key: "e33", type: "text", 
        label: "Azotați",
        sm: true
    },
    {
        key: "e27", type: "text", 
        label: "Detergenți",
        sm: true
    },


    ]
    

    export const GDPR = (jud, loc) => ([
        {type: "divider", label: "ACORD pentru prelucrarea datelor cu caracter persoanal", sm:12},
        {key: "gdpr", label: "", type: "checkbox", options: {key: 1, value: ""}, sm: 1},
        {type: "divider", value: true, label: <div style = {{lineHeight:1, fontSize: "0.8em", fontWeight:400}}>
            Prin completarea și transmiterea acestui formular sunteți de acord cu prelucrarea datelor cu caracter personal în scopul 
            înscrierii în REGISTRUL DE EVIDENȚĂ A SISTEMELOR INDIVIDUALE ADECVATE PENTRU COLECTAREA APELOR UZATE al 
            localității {loc ??"....................."} , județul {jud ?? "..........................."}
            <br/>Prelucrarea datelor cu caracter personal se va realiza cu respectarea prevederilor Regulamentului nr. 679/20166 
            adoptat de Parlamentul European și Consiliul Uniunii Europene pentru aprobarea normelor privind protecția în ceea ce 
            privește prelucrarea datelor cu caracter personal, precum și a normelor referitoare la libera circulație a acestui tip 
            de date cu caracter personal.
             </div>, sm:true}
    ])
    
   
