import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import { DatePicker } from '@material-ui/pickers';
import TimePicker from '../../common/TimePicker';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { addHours, addMinutes, intervalToDuration } from 'date-fns/esm';

/** @typedef {import('@types').Session} Session*/

/** @typedef {Object} Props
 * @property {boolean} open
 * @property {(x:any) => void} cancel
 * @property {(id:string)=> void} onDelete
 * @property {(session: Session)=> void} onSubmit
 */

const minuteMarks = [
  { value: 10, label: "10'" },
  { value: 20, label: "20'" },
  { value: 30, label: "30'" },
  { value: 40, label: "40'" },
];

type Props = {
    open?: boolean;
    name?: string;
    id: string;
    startDate: string;
    endDate: string;
    onClose?: (...args: any[]) => any;
    onSubmit: (...args: any[]) => any;
    onDelete: (...args: any[]) => any;
};

/** @param {import('type-fest').Merge<Session, Props>} props **/
function EditSession(props: Props) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'cancel' does not exist on type 'Props'.
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
  const handleHourSlider = (_: any, newHours: any) => {
    if (Array.isArray(newHours)) return;
    setEndDate(current => addHours(current, newHours - hours));
  };
  /**
   * @param {*} _
   * @param {number|number[]} value
   */
  const handleMinuteSlider = (_: any, value: any) => {
    if (Array.isArray(value)) return;
    setEndDate(current => addMinutes(current, value - minutes));
  };
  return (
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
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
          {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'Dispatch<SetStateAction<Date>>' is not assig... Remove this comment to see the full error message */}
          <DatePicker label="Started at date" value={date} onChange={setDate} variant="inline" />
          <TimePicker id="time-picker-start" label="time" value={date} onChange={setDate} />
        </Box>
        <Box display="flex">
          {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'Dispatch<SetStateAction<Date>>' is not assig... Remove this comment to see the full error message */}
          <DatePicker label="Finished at" value={dateEnd} onChange={setEndDate} variant="inline" />
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

export default EditSession;
