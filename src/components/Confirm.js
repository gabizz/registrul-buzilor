import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

export const Confirm = ({title, message, yesButton, noButton, open, onClose}) => {
    yesButton = yesButton || "confirmă"
    noButton = noButton || "renunță"
    title = title || "CONFIRMARE"
    message = message || "sunteți sigur?"

    const closeHandler = name => () => onClose(name)
    return (
        <Dialog open = {Boolean(open)} onClose = {closeHandler(null)}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{message}</DialogContent>
            <DialogActions>
                <Button variant = "contained" color = "primary" onClick = {closeHandler(true)}>{yesButton}</Button>
                <Button variant = "contained" color = "secondary" onClick ={closeHandler(null)}>{noButton}</Button>
            </DialogActions>
        </Dialog>
    )
}