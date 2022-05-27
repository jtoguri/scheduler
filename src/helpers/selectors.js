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
};

export function getInterview(state, interview) {
  if (!interview) return null;

  const interviewerID = interview.interviewer;
  const student = interview.student;

  const interviewer = state.interviewers[interviewerID]

  return {
    student,
    interviewer
  }
};
