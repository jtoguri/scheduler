import { useState, useEffect } from 'react';

import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  function modifySpots(action) {
    const currentDay = state.day;
    let days = state.days.map(day => {
      let spots = day.spots;
      
      if (day.name === currentDay) {
        spots = action === 'book' ? day.spots - 1
          : day.spots + 1;
      }
      
      return { ...day, spots }; 
    })

    return days;
  }

  function bookInterview(id, interview, edit) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(res => {
        const days = !edit ? modifySpots('book') : state.days;

        setState({
          ...state,
          days,
          appointments
        });
      });
  }
  
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`).then(res => {
      const days = modifySpots('cancel');

      setState({
        ...state,
        days,
        appointments
      });
    });
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments:
      all[1].data, interviewers: all[2].data}))
    })
  }, []);
  
  return { state, setDay, bookInterview, cancelInterview };
}
