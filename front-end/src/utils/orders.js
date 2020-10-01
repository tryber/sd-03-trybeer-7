// Baseado em: https://stackoverflow.com/questions/3075577/convert-mysql-datetime-stamp-into-javascripts-date-format
const convertMySQLDatetime = (date = '') => {
  const initialDateIndex = 5;
  const finalDateIndex = 10;
  const extractDayAndMonth = date.slice(initialDateIndex, finalDateIndex).split('-').reverse()
    .join('/');
  return extractDayAndMonth;
};

export default convertMySQLDatetime;
