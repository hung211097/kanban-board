export function generateWeek(currentDate = new Date()) {
  const weekday = [
    {
      text: "Mon",
      data: [
        {
          id: 'workout-A1',
          titleWorkout: "Chest day - with arm wrestling",
          exercises: [],
        },
      ],
    },
    {
      text: "Tue",
      data: [],
    },
    {
      text: "Wed",
      data: [],
    },
    {
      text: "Thu",
      data: [
        { id: 'workout-A2', titleWorkout: "Leg Day", exercises: [] },
        { id: 'workout-B3', titleWorkout: "Arm Day", exercises: [] },
      ],
    },
    {
      text: "Fri",
      data: [],
    },
    {
      text: "Sat",
      data: [],
    },
    {
      text: "Sun",
      data: [],
    },
  ];

  const day = currentDate.getDay();
  const result = [];
  const gapStartDate = day - 1;
  const startDate = subtractDays(gapStartDate, currentDate);
  for (let i = 0; i < 7; i++) {
    const initDate = new Date(startDate);
    const loopDate = addDays(i, initDate).getDate();
    result.push({
      id: `${weekday[i].text}-${loopDate}`,
      dateText: weekday[i].text,
      date: loopDate,
      data: weekday[i].data,
    });
  }
  return result;
}

function subtractDays(numOfDays, date = new Date()) {
  date.setDate(date.getDate() - numOfDays);
  return date;
}

function addDays(numOfDays, date = new Date()) {
  date.setDate(date.getDate() + numOfDays);
  return date;
}
