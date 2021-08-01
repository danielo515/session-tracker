import React from 'react';
import { DatePicker } from '@material-ui/pickers';
import Box from '@material-ui/core/Box';
import TimePicker from '../common/TimePicker';
import { RenderTimer } from '../home/Timer';

import Page from '../common/Page';
// import PropTypes from 'prop-types';
import {} from './redux/hooks';
import { subHours } from 'date-fns';

export default function TimerTab() {
  const dateStart = subHours(new Date(), 1);
  const setEndDate = date => {};
  return (
    <Page>
      <Box display="flex" justifyContent="space-between">
        <DatePicker value={dateStart} onChange={setEndDate} variant="inline" />
        <TimePicker id="time-picker-end" value={dateStart} onChange={setEndDate} />
      </Box>
      <Box
        display="flex"
        pt={4}
        justifyContent="center"
        fontSize="2rem"
        fontFamily="'Roboto',Monospace"
      >
        <RenderTimer startDate={dateStart.toISOString()} />
      </Box>
    </Page>
  );
}

TimerTab.propTypes = {};
TimerTab.defaultProps = {};
