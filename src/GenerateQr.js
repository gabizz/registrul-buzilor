import React, { useMemo } from "react"
import {QRCodeSVG} from "qrcode.react";
// import { Page } from "@react-pdf/renderer";





const styles = {}

const GenerateQr = React.forwardRef( ({data, ...rest}, ref) => {
    return (

        // <Page style = {{width: "100%", height: "100%"}} ref = {ref} >
            <QRCodeSVG value = {data} size={512}  {...rest} />
        // </Page>
    )
})


export default GenerateQr



