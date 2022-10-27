import React, { useMemo } from "react"
import {QRCodeSVG} from "qrcode.react";
// import { Page } from "@react-pdf/renderer";





const styles = {}

const GenerateQr = React.forwardRef( ({data, ...rest}, ref) => {
    return (

        // <Page style = {{width: "100%", height: "100%"}} ref = {ref} >
            <QRCodeSVG value = {"https://sia.e-urban.ro/"+data} size={270}  {...rest} />
        // </Page>
    )
})


export default GenerateQr



