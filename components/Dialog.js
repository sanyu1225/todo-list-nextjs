import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material'

/** Note: 目前只有刪除用到彈窗 所以沒必要把status放在redux做全局 */
const DialogView = ({ dialogStatus, nowDeleteData, setDialogStatus, rightButtonClick ,leftButtonText= 'No',rightButtonText= 'Yes' }) => {
     return dialogStatus ? (
        <Dialog 
          open={dialogStatus}
        >
          <DialogTitle>
            {`Delete ${nowDeleteData?.text} ?`}
          </DialogTitle>
          <DialogActions>
            <Button onClick={()=> setDialogStatus(false)}>{ leftButtonText }</Button>
            <Button onClick={rightButtonClick} autoFocus>
              { rightButtonText }
            </Button>
          </DialogActions>
        </Dialog>) : <></>
}

export default DialogView