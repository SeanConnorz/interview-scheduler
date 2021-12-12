export function getAppointmentsForDay(state, day) {
  const days = state.days;
  let daysAppointments = [];
  let appointmentsArray = [];

  days.forEach((days) => {
    if (days.name === day) {
      daysAppointments = days.appointments;
    }
  });

  daysAppointments.forEach((appointment) => {
    appointmentsArray.push(state.appointments[appointment]);
  });

  return appointmentsArray;
};

export function getInterview(state, interview) {  
  if (!interview) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer];
  const student = interview.student;

  return {
    interviewer,
    student
  }
}