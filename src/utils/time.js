export const convertDate = (date) => {
  const _date = new Date(date);
  const year = _date.getFullYear();
  const month = ('0' + (_date.getMonth() + 1)).slice(-2);
  const day = ('0' + _date.getDate()).slice(-2);
  const hours = ('0' + _date.getHours()).slice(-2);
  const minutes = ('0' + _date.getMinutes()).slice(-2);

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};
