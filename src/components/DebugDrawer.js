import { Drawer, IconButton } from '@mui/material'
import React from 'react'
import { MdClose } from 'react-icons/md'
import { useAppContext } from '../appContext'

export default function DebugDrawer({open, onClose}) {

  const [ctx] = useAppContext()
  return (
    <Drawer anchor="right" style = {{width: "40vw"}} open = {Boolean(open)} onClose = {()=>onClose()}>
      <div align="right">
        <IconButton onClick = {()=>onClose()}><MdClose size="2em" color="ligthgrey"/></IconButton>
        </div>
        <div style = {{padding: "2em", height: "80vh", width: "50vw", overflow: "auto", overflowWrap: "break-word"}}>
                {open && typeof open === "object" && <small><pre>{JSON.stringify(open, null, 2)}</pre></small>}
                <hr/>
                LINK:<br/>
                https://sia.e-urban.ro/{ctx.b64}

        </div>
        
      
    </Drawer>
  )
}

