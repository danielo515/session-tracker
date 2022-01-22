import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { fetchSessions } from '../home/redux/actions';
import Dashboard, { Days } from './Dashboard';
import MonthChart from './MonthChart';
import WeekChart from './WeekChart';

const mapDispatchToProps = {
  fetchSessions,
};

const connector = connect(null, mapDispatchToProps);

function StatsDefaultPage({ fetchSessions }: ConnectedProps<typeof connector>) {
  useEffect(() => {
    fetchSessions();
  }, []);
  return (
    <Routes>
      <Route element={<Dashboard />}>
        <Route path="day" element={<Days />} />
        <Route path="week" element={<WeekChart />} />
        <Route path="month" element={<MonthChart />} />
        <Route path="*" element={<Navigate to="day" />} />
      </Route>
    </Routes>
  );
}

export default connector(StatsDefaultPage);
