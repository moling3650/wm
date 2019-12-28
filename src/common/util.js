const formats = {
  year: '%n% 年前',
  month: '%n% 月前',
  day: '%n% 天前',
  hour: '%n% 小时前',
  minute: '%n% 分钟前',
  second: '%n% 秒前',
};

function friendlyDate(timestamp) {
  const now = Date.now();
  const seconds = Math.floor((now - timestamp) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return formats['year'].replace('%n%', years)
  }
  if (months > 0) {
    return formats['month'].replace('%n%', months)
  }
  if (days > 0) {
    return formats['day'].replace('%n%', days)
  }
  if (hours > 0) {
    return formats['hour'].replace('%n%', hours)
  }
  if (minutes > 0) {
    return formats['minute'].replace('%n%', minutes)
  }
  return formats['second'].replace('%n%', Math.max(seconds, 1))
}

export {
  friendlyDate
}
