import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '../../common/TimePicker';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { addHours, addMinutes, intervalToDuration } from 'date-fns/esm';
import { Session } from '@types';
import { Merge } from 'type-fest';
import { TextField } from '@mui/material';

type Props = {
  open: boolean;
  cancel: () => void;
  onDelete: (id: string) => void;
  onSubmit: (session: Session) => void;
};

const minuteMarks = [
  { value: 10, label: "10'" },
  { value: 20, label: "20'" },
  { value: 30, label: "30'" },
  { value: 40, label: "40'" },
];

function EditSession(props: Merge<Session, Props>) {
  const { open, cancel, name, startDate, endDate = new Date(), id, onSubmit, onDelete } = props;
  const [date, setDate] = useState(new Date(startDate));
  const [dateEnd, setEndDate] = useState(new Date(endDate));
  const { hours = 0, minutes = 0 } = intervalToDuration({ start: date, end: dateEnd });
  const submit = () =>
    onSubmit({ id, name, startDate: date.toISOString(), endDate: dateEnd.toISOString() });
  const deleteCb = React.useCallback(() => onDelete(id), [onDelete, id]);
  /**
   * @param {*} _
   * @param {number|number[]} newHours
   */
  const handleHourSlider = (_: any, newHours: number | number[]) => {
    if (Array.isArray(newHours)) return;
    setEndDate((current) => addHours(current, newHours - hours));
  };
  /**
   * @param {*} _
   * @param {number|number[]} value
   */
  const handleMinuteSlider = (_: any, value: number | number[]) => {
    if (Array.isArray(value)) return;
    setEndDate((current) => addMinutes(current, value - minutes));
  };
  return (
    <Dialog open={open} onClose={cancel} aria-labelledby="form-dialog-edit">
      <DialogTitle id="edit-session-title">
        <Box display="flex" alignItems="center">
          <Box flex="1 1 auto" textAlign="center">
            {name}
          </Box>
          <IconButton onClick={deleteCb} size="large">
            <Delete />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            '& .MuiTextField-root': {
              mr: 1,
            },
          }}
        >
          <Box pb={4} display="flex">
            <DatePicker
              value={date}
              renderInput={(props) => (
                <TextField {...props} fullWidth={false} label="Started at" variant="standard" />
              )}
              onChange={(newDate) => setDate(newDate || new Date())}
            />
            <TimePicker id="time-picker-start" label="time" value={date} onChange={setDate} />
          </Box>
          <Box display="flex">
            <DatePicker
              value={dateEnd}
              renderInput={(props) => (
                <TextField {...props} fullWidth={false} variant="standard" label="Finished at" />
              )}
              onChange={(newDate) => setEndDate(newDate || new Date())}
            />
            <TimePicker id="time-picker-end" label="time" value={dateEnd} onChange={setEndDate} />
          </Box>
          <Box pt={2}>
            <Typography id="discrete-slider" gutterBottom>
              Hours: {hours}
            </Typography>
            <Slider
              value={hours}
              min={0}
              max={12}
              step={1}
              onChange={handleHourSlider}
              valueLabelDisplay="auto"
              marks
              size="small"
            />
            <Typography id="discrete-slider" gutterBottom>
              Minutes: {minutes}
            </Typography>
            <Slider
              value={minutes}
              min={0}
              max={59}
              step={5}
              valueLabelDisplay="auto"
              onChange={handleMinuteSlider}
              marks={minuteMarks}
              size="small"
            />
          </Box>
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
