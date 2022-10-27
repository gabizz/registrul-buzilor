import { Button, Dialog, DialogContent, DialogTitle, Grid } from '@mui/material'
import React, { useRef, useMemo } from 'react'
import PrintTpl from './PrintTpl'
import { MdPictureAsPdf, MdPrint } from "react-icons/md"
import { makeStyles } from '@mui/styles'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useReactToPrint } from 'react-to-print';
import { maxWidth, width } from '@mui/system'
import { useAppContext } from '../appContext'
import moment from 'moment'
// import PdfTpl from './PdfTpl'

const useStyles = makeStyles( theme => ({
    dialogPaper: {
        minWidth: "70vw", minHeight: "100vh",

       
    },
    dialogContent: {
        "@media screen": { },
        height: "100%"
    },
    hidden: { "@media screen": { display: "none"}}
}) )

export default function PrintPreviewModal({open, onClose}) {

    const printRef = useRef()

    const classes = useStyles()

    const printHandler = useReactToPrint({content: () => printRef.current})

    const [ctx] = useAppContext()

    const now = useMemo(()=>moment().format("DD-MM-YYYY"),[])

    const pdfHandler =  (filename) => async () => {
       
        const element = printRef.current;
        
        
        const  canvas = await html2canvas(element)

        const imgData = canvas.toDataURL("image/png");
        var position = 0;
        var imgWidth = 210; 
        var pageHeight = 295;  
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
  
        var doc = new jsPDF('p', 'mm');
        
        doc.setDocumentProperties({
            title: "Declarație SIA - " + ctx.state.r2 + " - " + now,
            author: "sia.e-urban.ro",
            subject: "H.G. 714/2022",
            keywords: ctx.b64
        })
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, "FAST");
        heightLeft -= pageHeight;
  
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, "FAST");
          heightLeft -= pageHeight;
        }

        doc.save(filename+'.pdf');   

      
 
      };

  return (
    <Dialog open = {Boolean(open)} onClose = {()=>onClose()} classes = {{paper: classes.dialogPaper}}>
        <DialogTitle>
            <Grid container alignItems="center" spacing={1}>
                <Grid item sm ={true}>
                    PREVIZUALIZARE TIPĂRIRE
                </Grid>
                <Grid item>
                    <Button  variant="contained" color="error" startIcon = {<MdPictureAsPdf/>} onClick={pdfHandler("formular")}>
                        EXPORT PDF
                    </Button>
                </Grid>
                
                <Grid item>
                    <Button variant="contained" color="primary" startIcon = {<MdPrint/>} onClick = {printHandler}>
                        TIPĂRIRE
                    </Button>
                </Grid>
            
            </Grid>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
            {/* <PdfTpl /> */}
            <div ref = {printRef} >
                <PrintTpl/>
            </div>
        </DialogContent>
    </Dialog>
  )
}
