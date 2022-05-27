export function getAppointmentsForDay(state, day) {
  let appointmentIDs = [];
  const appointments = [];

  for (const singleDay of state.days) {
    if (singleDay.name === day) {
      appointmentIDs = singleDay.appointments;
      break;
    }
  }

  for (const id of appointmentIDs) {
    appointments.push(state.appointments[id]);
  }

  return appointments;
}
