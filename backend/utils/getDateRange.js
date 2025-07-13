function getDateRange(type, date = new Date()) {
  const start = new Date(date);
  const end = new Date(date);
    
  switch (type) {
    case "day":
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      break;

    case "week":
      const day = date.getDay(); // Sunday = 0
      const diff = day === 0 ? 6 : day - 1;

      start.setDate(start.getDate() - diff);
      start.setHours(0, 0, 0, 0);

      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      break;

    case "month":
      start.setDate(1);
      start.setHours(0, 0, 0, 0);

      end.setMonth(start.getMonth() + 1);
      end.setDate(0); // last day of previous month
      end.setHours(23, 59, 59, 999);
      break;

    default:
      throw new Error("Invalid type: choose 'day', 'week', or 'month'");
  }

  return { start, end };
}

module.exports = getDateRange;
