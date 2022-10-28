import { Button } from '@mui/material'
import React, { useRef, useState, useCallback } from 'react'
import jsPDF from 'jspdf';
import { useDropzone } from 'react-dropzone';
import { b64_decode } from '../b64'
import {pdfjs} from "react-pdf"
import * as pedefelib from "pdf-lib";
 
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const { PDFDocument } = pedefelib

export default function DragAndImportPdf({onChange}) {

    const [data, setData] = useState()
    var doc = new jsPDF('p', 'mm');
    const ref = useRef()


    const onDrop = useCallback( (acceptedFiles) => {
        let result
        
          let file = acceptedFiles[0]

            const reader = new FileReader()
      
            reader.onabort = () => result = {err:true, msg:"Actiune anulata"}
            reader.onerror = () =>result = {err:true, msg: "Eroare la citirea fisierului"}
            reader.onload = async  function() {
                console.log("onload")
            // Do whatever you want with the file contents
              const binaryStr = reader.result
              const doc = await PDFDocument.load(binaryStr,{updateMetadata: false})
              const b64 = doc.getKeywords()
              onChange(b64)
            }
              
            
             
            reader.readAsDataURL(file)
           
        },[])
    
  
    
   
      
      const { getRootProps, getInputProps } = useDropzone({ onDrop })
    
  return (
    <div {...getRootProps()} style={{ 
        border: "none", 
        background: "ivory", borderRadius: 25, boxShadow: "0 0 5px grey",
        height: "25 vh", display: "flex", alignItems: "center", justifyContent: "center",
         }}>
      <input {...getInputProps()} />
      <p align="center" style = {{fontSize: "2rem", fontWeight:800, color: "lightgrey"}}>
        Trageți aici un fisier PDF generat cu această aplicație <br/>sau faceți click pentru a-l încărca manual
      </p>
    </div>
  )
}
