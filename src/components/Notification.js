import { Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function Notification({ open, message, duration = 1500, hash }) {
    const [isOpened, setisOpened] = useState(false)

    useEffect(() => setisOpened(open), [hash])
    

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={Boolean(isOpened)}
            autoHideDuration={duration}
            onClose={() => setisOpened()}
            message={message ?? "TEXTUL A FOST COPIAT ÎN CLIPBOARD!"}
        />
    )

}

