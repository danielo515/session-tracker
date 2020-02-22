import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { DateTimePicker } from "@material-ui/pickers";


  const onSubmit = (e) => {
    const { name, endDate, id } = this.props
    this.props.onSubmit({ name, endDate, id })

  }

function EditSession(props) {
    const { open, handleClose, name, startDate, endDate, } = props;
    const [date, setDate] = React.useState(startDate)
    const [dateEnd, setEndDate] = React.useState(endDate)
    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle centered_ id="edit-session-title">{name}</DialogTitle>
        <DialogContent>
          <DateTimePicker
            label="Started at:"
            value={date}
            onChange={setDate}
            animateYearScrolling
            ampm={false}
          />
          <DateTimePicker
            label="Finished at"
            value={dateEnd}
            onChange={setEndDate}
            animateYearScrolling
            ampm={false}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }


  EditSession.propTypes = {
    open: PropTypes.bool,
    name: PropTypes.string,
    id: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
  };

export default EditSession;
