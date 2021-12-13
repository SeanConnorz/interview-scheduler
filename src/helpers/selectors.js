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

export function getInterviewersForDay(state, day) {
  const days = state.days;
  let daysAppointments = [];
  let interviewersId = [];
  let interviewersInfo = [];

  days.forEach((days) => {
    if (days.name === day) {
      daysAppointments = days.appointments;
    }
  });

  daysAppointments.forEach((appointment) => {
    if (state.appointments[appointment].interview) {
      const interviewerId = state.appointments[appointment].interview.interviewer;
      if (!interviewersId.includes(interviewerId)) {
      interviewersId.push(interviewerId);
      }
    }
  });

  interviewersId.forEach((interviewer) => {
    if (interviewersId.length > 0) {
      interviewersInfo.push(state.interviewers[interviewer]);
    }
  });
  
  return interviewersInfo;
};

