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
        {`Delete ${title}?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this recipe? You cannot undo this action.
        </DialogContentText>
        <DialogActions>
          <Button autoFocus onClick={() => handleDelete()} color='info'>
            Delete
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmDelete