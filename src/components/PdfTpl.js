import React, { Fragment, useEffect, useRef, useState } from 'react'
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';

import { Alert, Divider } from '@mui/material';
import { useAppContext } from '../appContext';
import SIRUTA from '../siruta';
import moment from 'moment';
import GenerateQr from '../GenerateQr';
import html2canvas from 'html2canvas';
import dynamic from 'next/dynamic';
import { makeStyles } from '@mui/styles';

// const GenerateQr = dynamic( () => import("../GenerateQr"), {ssr: false})

// const renderer = dynamic(async () => await import("@react-pdf/renderer", {ssr: false}))

// const { Page, Text, View, Document, StyleSheet, Font, Image } = renderer 
 
    Font.register({
        family: "Roboto",
        src: "/Roboto/Roboto-Regular.ttf"
    })
    Font.register({
        family: "Roboto-Bold",
        src: "/Roboto/Roboto-Bold.ttf"
    })

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: 'white',
        fontFamily: "Roboto",
        left: "8mm",
        padding: "40px"

    },
    section: {
        margin: 10,
        padding: 10

    },
    sectionHalf: {
        margin: 10,
        padding: 10,
        flex: "grow",
        flexDirection: "row"

    },
    title: {
        fontSize: "12px",
        textAlign: "center",
        fontWeight: 700,
        fontFamily: "Roboto-Bold"
    },
    textRight: {
        fontSize: "12px",
        textAlign: "right",
        marginTop: "20px"
    },
    textLeft: {
        fontSize: "12px",
        textAlign: "left",
        marginTop: "10px", marginBottom: "5px"
    },
    textCenter: {
        fontSize: "12px",
        marginTop: "10px", marginBottom: "5px",
        textAlign: "center"
    },
    textBold: {
        fontSize: "12px",
        fontFamily: "Roboto-Bold"
    },
    divider: { margin: "10px" },
    qrImage: { width: "500px", height: "auto"}
});


const useStyles = makeStyles( theme => ({
    hidden: {
        "@media screen": { display: "none"}
    }
}))

const Item = ({ title, subtitle, options, answer }) => (
    <>
        {title && (
            <Text style={styles.textLeft}>{title}</Text>
        )}

        {subtitle && (
            <Text style={{ fontSize: "8px", marginBottom: "5px", marginTop: "-5px" }}>{subtitle}</Text>
        )}
        {answer && (
            <Text style={{ ...styles.textBold, textDecoration: (answer ? "underline" : "none") }}>
                {answer || "---"}
            </Text>
        )}
        {options && options.map((e, i) => (
            <Text style={styles.textBold} key={i}>
                {e.checked ? "[ X ]" : "[    ]"}{'  '}
                {e.label}
            </Text>
        ))}

    </>
)

export default function PdfTpl() {
    const classes = useStyles()
    const[dUrl, setDUrl] = useState(null)
    const [ctx] = useAppContext()
    const loc = () => {
        let res = SIRUTA.find(el => el.siruta === ctx.state.loc)
        return typeof res !== "undefined" ? res['denloc'] : "____________________"
    }
    const qrRef = useRef(null)

    const jud = () => {
        let res = SIRUTA.find(el => el.parent === ctx.state.jud)
        return res ? res['denloc'] : "____________________"
    }

    useEffect(() => {
        setDUrl(dataUrl())
    }, [])
  

    const dataUrl = async () => {
        let result, error
        try {
            result = await html2canvas(qrRef.current)
            
        } catch (error) {
            error = {error: error.toString()}
        } finally {
            if (error) {
                return error
            } else {
                return  result ?  result.toDataURL("image/png") : null
            }
        }
    
    }


   

    return (
        <Fragment>
           
            {(ctx && ctx.state && dUrl)
                ? (
                    <Fragment>
                        {console.log("dddddd:", dataUrl())}
                         <GenerateQr data = {ctx.b64} ref = {qrRef} className = {classes.hidden}/>
                        
                <PDFViewer style={{ width: "100%", height: "100vh" }}>
                    <Document
                        title={"Declaratie-SIA-" + ctx.state.r2}
                        author={ctx.state.r2}
                        creator={ctx.state.r2}
                        producer={ctx.state.r2}
                        language="ro_RO"
                        subject="Declaratie SIA"
                        keywords={ctx.b64}
                        pageMode="useThumbs"
                    >
                        <Page size="A4" style={styles.page}>
                            <View style={styles.section}>
                                <Text style={styles.textRight}>
                                    Nr........... din .......................
                                </Text>
                                <Text style={styles.divider} />
                                <Text style={styles.title}>
                                    DECLARAȚIE DE ÎNREGISTRARE
                                    {`\n`}
                                    în Registrul de evidența a sistemelor individuale adecvate pentru colectarea apelor uzate
                                    {"\n"}
                                    al localității {loc()} din județul {jud()}
                                </Text>
                                <Text style={styles.textLeft}>
                                    1. Tipul înscrierii {'\n'}
                                </Text>
                                <Text style={styles.textBold}>
                                    {+ctx.state.r1 === 1 ? "[X]" : "[   ]"} PERSOANA FIZICĂ {'    '}
                                    {+ctx.state.r1 === 0 ? "[X]" : "[   ]"} PERSOANĂ JURIDCĂ
                                </Text>
                                <Item
                                    title="2. Numele și prenumele dumneavoastră/Denumirea entității juridice și număr persoane deservite de SIA"
                                    answer={ctx.state.r2}
                                />
                                <Item
                                    title="3. CNP/CUI"
                                    answer={ctx.state.r3}
                                />
                                <Item
                                    title="4. Adresa completă"
                                    subtitle="Strada, numărul, detaliile imobilului (bloc, etaj, apartament), oraș, județ"
                                    answer={ctx.state.r4}
                                />
                                <Item
                                    title="5. Telefon"
                                    answer={ctx.state.r5}
                                />
                                <Item
                                    title="6. Adresa de e-mail"
                                    answer={ctx.state.r6}
                                />
                                <Item
                                    title="7. Activitatea principală conform CAEN"
                                    subtitle="IMPORTANT! Acest câmp se completează numai în cazul PERSOANELOR JURIDICE"
                                    answer={ctx.state.r7}
                                />
                                <Item
                                    title="8. Descrierea activității societății"
                                    subtitle="IMPORTANT! Acest câmp se completează numai în cazul PERSOANELOR JURIDICE"
                                    answer={ctx.state.r7}
                                />
                                <Item
                                    title="9. Dețineți autorizație de mediu?"
                                    subtitle="IMPORTANT! Acest câmp se completează numai în cazul PERSOANELOR JURIDICE"
                                    options={[
                                        { label: "DA", checked: +ctx.state.r9 === 1 },
                                        { label: "NU", checked: +ctx.state.r9 === 0 },
                                    ]}
                                />
                                <Item
                                    title="10. Numărul și data autorizației de mediu (dacă există) – opțional"
                                    subtitle="IMPORTANT! Acest câmp se completează numai în cazul PERSOANELOR JURIDICE"
                                    answer={ctx.state.r10}
                                />
                                <Item
                                    title="11. Sistemul individual de care beneficiați și capacitate proiectată"
                                    subtitle="IMPORTANT! Acest câmp se completează numai în cazul PERSOANELOR JURIDICE"
                                    options={[
                                        { label: "Colectare", checked: +ctx.state.r11 === 1 },
                                        { label: "Epurare", checked: +ctx.state.r11 === 0 },
                                    ]}
                                />
                                <Item title={"capacitatea proiectată:" + ctx.state.r111 || "--"} />
                            </View>
                        </Page>
                        <Page size="A4" style={styles.page}>
                            <View style={styles.section}>
                                <Item
                                    title="12. Sursa de alimentare cu apă de care beneficiați"
                                    subtitle="Bifați toate opțiunile care se aplică."
                                    options={[
                                        { label: "Din rețeaua publică", checked: +ctx.state.r121 },
                                        { label: "Din surse individuale", checked: +ctx.state.r122 },
                                    ]}
                                />
                                <Item
                                    title="13. Descrieți sistemul de evacuare a apelor uzate menajere de care beneficiați"
                                    subtitle="IMPORTANT! Acest câmp se completează numai în cazul PERSOANELOR JURIDICE"
                                    answer={ctx.state.r13}
                                />
                                <Item
                                    title="14. Descrieți modul în care se realizează epurarea apelor uzate:"
                                    subtitle="Vă rugăm elaborați un răspuns detaliat."
                                    answer={ctx.state.r14}
                                />
                                <Item
                                    title="15. Descrieți modul în care se monitorizează descărcarea apelor uzate:"
                                    subtitle="Vă rugăm să ne oferiți rezultatele ultimelor analize efectuate."
                                    answer={ctx.state.r15}
                                />
                                <Item
                                    title="16. Numărul și data Contractului încheiat cu Societatea de vidanjare."

                                    answer={ctx.state.r161 + " / " + moment(ctx.state.r262).format("DD.MM.YYYY")}
                                />
                            </View>
                            <View style={{display: "flex",  flexDirection: 'row', justifyContent:"space-between"}}>
                                <View style={{width: "100%", textAlign:"center"}}>
                                    <Text style={styles.title}>Data,</Text>
                                    {'\n'}
                                    <Text>............................</Text>
                                </View>
                                <View style={{width: "100%", textAlign:"center"}}>
                                    <Text style={styles.title}>Semnătura,</Text>
                                    {'\n'}
                                    <Text>............................</Text>
                                </View>
                            </View>
                            
                            {/* <View style={styles.section}> */}
                            {/* <Text>CODUL chiuar</Text> */}
                     
                                <Image allowDangerousPaths src={ dUrl }  />
                         
                          
                        {/* </View> */}
                            



                        </Page>
                    </Document>

                </PDFViewer>
                </Fragment>
                )
                : <Alert severity='error'>NU SUNT DATE</Alert>
            }

        </Fragment>
    )
}
