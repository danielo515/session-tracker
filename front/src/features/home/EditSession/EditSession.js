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
import intervalToDuration from 'date-fns/intervalToDuration';
import { Slider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { addHours, addMinutes, subHours } from 'date-fns';

/** @typedef {import('@types').Session} Session*/

/** @typedef {Object} Props
 * @property {boolean} open
 * @property {(x:any) => void} cancel
 * @property {(id:string)=> void} onDelete
 * @property {(session: Session)=> void} onSubmit
 */

const minuteMarks = [
  { value: 30, label: "30'" },
  { value: 10, label: "10'" },
];

/** @param {import('type-fest').Merge<Session, Props>} props **/
function EditSession(props) {
  const { open, cancel, name, startDate, endDate = new Date(), id, onSubmit, onDelete } = props;
  const [date, setDate] = useState(new Date(startDate));
  const [dateEnd, setEndDate] = React.useState(new Date(endDate));
  const { hours = 0, minutes } = intervalToDuration({ start: date, end: dateEnd });
  const submit = () =>
    onSubmit({ id, name, startDate: date.toISOString(), endDate: dateEnd.toISOString() });
  const deleteCb = React.useCallback(() => onDelete(id), [onDelete, id]);
  /**
   * @param {*} _
   * @param {number|number[]} newHours
   */
  const handleHourSlider = (_, newHours) => {
    if (Array.isArray(newHours)) return;
    setEndDate(current => addHours(current, newHours - hours));
  };
  /**
   * @param {*} _
   * @param {number|number[]} value
   */
  const handleMinuteSlider = (_, value) => {
    if (Array.isArray(value)) return;
    setEndDate(current => addMinutes(current, value - minutes));
  };
  return (
    <Dialog open={open} onClose={cancel} aria-labelledby="form-dialog-edit">
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
          <TimePicker
            id="time-picker-start"
            label="time"
            value={date}
            onChange={setDate}
            ampm={false}
          />
        </Box>
        <Box display="flex">
          <DatePicker label="Finished at" value={dateEnd} onChange={setEndDate} variant="inline" />
          <TimePicker
            id="time-picker-end"
            label="time"
            value={dateEnd}
            onChange={setEndDate}
            ampm={false}
          />
        </Box>
        <Box pt={2}>
          <Typography id="discrete-slider" gutterBottom>
            Hours:
          </Typography>
          <Slider
            value={hours}
            min={0}
            max={8}
            step={1}
            onChange={handleHourSlider}
            valueLabelDisplay="auto"
            marks
          />
          <Typography id="discrete-slider" gutterBottom>
            Minutes:
          </Typography>
          <Slider
            value={minutes}
            min={0}
            max={59}
            step={5}
            valueLabelDisplay="auto"
            onChange={handleMinuteSlider}
            marks={minuteMarks}
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
