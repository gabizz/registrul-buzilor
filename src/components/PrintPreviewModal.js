import { Button, Dialog, DialogContent, DialogTitle, Grid } from '@mui/material'
import React, { useRef } from 'react'
import PrintTpl from './PrintTpl'
import { MdPictureAsPdf, MdPrint } from "react-icons/md"
import { makeStyles } from '@mui/styles'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useReactToPrint } from 'react-to-print';
import PdfTpl from './PdfTpl'

const useStyles = makeStyles( theme => ({
    dialogPaper: {
        minWidth: "50vw", minHeight: "100vh",

       
    },
    dialogContent: {
        "@media screen": { zoom: 0.8, margin: theme.spacing(2)},
        height: "100%"
    },
    hidden: { "@media screen": { display: "none"}}
}) )

export default function PrintPreviewModal({open, onClose}) {

    const printRef = useRef()

    const classes = useStyles()

    const printHandler = useReactToPrint({content: () => printRef.current})

    const pdfHandler =  (filename) => async () => {
        const element = printRef.current;
        const padding = 10
        const pdf = new jsPDF({orientation: 'p', unit:'mm'
        // , size: [297, 210]
    })
        const  canvas = await html2canvas(element)
        const imgData = canvas.toDataURL("image/png");
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth()-padding;
        const pdfHeight = (imgProps.height * pdfWidth) / (imgProps.width);
    
        pdf.addImage(imgData, 'PNG', padding, padding, pdfWidth-padding, pdfHeight-padding, undefined, "FAST");
        pdf.save(filename+'.pdf');    
      };

  return (
    <Dialog open = {Boolean(open)} onClose = {()=>onClose()} classes = {{paper: classes.dialogPaper}}>
        <DialogTitle>
            <Grid container alignItems="center" spacing={1}>
                <Grid item sm ={true}>
                    PREVIZUALIZARE TIPĂRIRE
                </Grid>
                <Grid item>
                    <Button disabled variant="contained" color="error" startIcon = {<MdPictureAsPdf/>} onClick={pdfHandler("formular")}>
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
            <PdfTpl />
            <div ref = {printRef} className = {classes.hidden}>
                <PrintTpl/>
            </div>
        </DialogContent>
    </Dialog>
  )
}
