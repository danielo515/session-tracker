import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import { DatePicker, TimePicker } from '@material-ui/pickers';

/** @typedef {import('@types').Session} Session*/

/** @typedef {Object} Props
 * @property {boolean} open
 * @property {(x:any) => void} cancel
 * @property {(id:string)=> void} onDelete
 * @property {(session: Session)=> void} onSubmit
 */

/** @param {import('type-fest').Merge<Session, Props>} props **/
function EditSession(props) {
  const { open, cancel, name, startDate, endDate, id, onSubmit, onDelete } = props;
  const [date, setDate] = React.useState(startDate);
  const [dateEnd, setEndDate] = React.useState(endDate);
  const submit = React.useCallback(
    () => onSubmit({ id, name, startDate: date, endDate: dateEnd }),
    [onSubmit, dateEnd, date],
  );
  const deleteCb = React.useCallback(() => onDelete(id), [onDelete, id]);
  return (
    <Dialog open={open} onClose={cancel} aria-labelledby="form-dialog-title">
      <DialogTitle id="edit-session-title">
        <Box display="flex" alignItems="center">
          <Box flex="1 1 auto" textAlign="center">
            {name}
          </Box>
          <IconButton onClick={deleteCb}>
            <Delete />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box pb={4} display="flex">
          <DatePicker label="Started at date" value={date} onChange={setDate} variant="inline" />
          <TimePicker id="time-picker" label="time" value={date} onChange={setDate} ampm={false} />
        </Box>
        <Box display="flex">
          <DatePicker label="Finished at" value={dateEnd} onChange={setEndDate} variant="inline" />
          <TimePicker
            id="time-picker"
            label="time"
            value={dateEnd}
            onChange={setEndDate}
            ampm={false}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel} color="primary">
          Cancel
        </Button>
        <Button onClick={submit} color="primary" variant="contained">
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
  onDelete: PropTypes.func.isRequired,
};

export default EditSession;
