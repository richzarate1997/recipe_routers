import {
  Box, Modal, Typography
} from '@mui/material';
import { Link } from 'react-router-dom';

const LoggedOutModal = ({open, handleClose}) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#FEAE65',
    border: '2px solid #612D33',
    color: '#612D33',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You have been signed out!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Link to='/login' onClick={handleClose}>Sign Back In?</Link>
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

export default LoggedOutModal;