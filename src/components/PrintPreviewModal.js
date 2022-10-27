import { Button, Dialog, DialogContent, DialogTitle, Grid } from '@mui/material'
import React, { useRef } from 'react'
import PrintTpl from './PrintTpl'
import { MdPictureAsPdf, MdPrint } from "react-icons/md"
import { makeStyles } from '@mui/styles'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useReactToPrint } from 'react-to-print';
import { maxWidth, width } from '@mui/system'
// import PdfTpl from './PdfTpl'

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

        
        const  canvas = await html2canvas(element)

        const imgData = canvas.toDataURL("image/png");
        var position = 0;
        var padding = 10;
        var imgWidth = 210; 
        var pageHeight = 295;  
        var imgHeight = canvas.height * imgWidth / canvas.width-padding;
        var heightLeft = imgHeight-padding;
  
        var doc = new jsPDF('p', 'mm');
        
  
        doc.addImage(imgData, 'PNG', padding, padding, imgWidth, imgHeight, undefined, "FAST");
        heightLeft -= pageHeight+padding;
  
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, 'PNG', padding, position-padding, imgWidth, imgHeight, undefined, "FAST");
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
