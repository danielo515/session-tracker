import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import { DateTimePicker } from "@material-ui/pickers";


function EditSession(props) {
  const { open, cancel, name, startDate, endDate, id, onSubmit } = props;
  const [date, setDate] = React.useState(startDate)
  const [dateEnd, setEndDate] = React.useState(endDate)
  const submit = React.useCallback(
    () => onSubmit({ id, name, startDate: date, endDate: dateEnd }) ,
    [onSubmit, dateEnd, date],
  )
  return (
    <Dialog open={open} onClose={cancel} aria-labelledby="form-dialog-title">
      <DialogTitle id="edit-session-title">{name}</DialogTitle>
      <DialogContent>
        <Box pb={4}>
          <DateTimePicker
            label="Started at:"
            value={date}
            onChange={setDate}
            animateYearScrolling
            ampm={false}
          />
        </Box>
        <DateTimePicker
          label="Finished at"
          value={dateEnd}
          onChange={setEndDate}
          animateYearScrolling
          ampm={false}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel} color="primary">
          Cancel
          </Button>
        <Button onClick={submit} color="primary">
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
