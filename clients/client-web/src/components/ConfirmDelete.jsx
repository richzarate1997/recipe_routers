import {
  Button, Dialog, DialogActions,
  DialogContent, DialogContentText,
  DialogTitle
} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteRecipeById } from '../service/recipeApi';

const ConfirmDelete = ({ fullScreen, open, handleClose, title, id }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteRecipeById(id)
      .then(() => {
        handleClose()
        navigate('/profile', {
          state: {
            type: 'success',
            msg: `Successfully deleted ${title}, with id: ${id}.`
          }
        })
      })
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby='confirm-recipe-delete'
    >
      <DialogTitle id='confirm-recipe-delete'>
        Delete Confirmation
      </DialogTitle>
      <DialogContent>
        <DialogContentText align='center'>
          Do you want to permanently delete your "<em>{title}</em>" recipe?<br/> You cannot undo this action.
        </DialogContentText>
        <DialogActions>
          <Button onClick={() => handleDelete()} color='info' variant='contained'>
            Delete
          </Button>
          <Button onClick={handleClose} autoFocus color='secondary' variant='contained'>
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmDelete