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