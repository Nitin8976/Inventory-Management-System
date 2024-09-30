// import * as moment from 'moment';

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// export function momentFormatedDate(dateFormat: string, joinWith: string) {
//   const formats = dateFormat.split('-');

//   return formats.reduce((prev, current) => {
//     return prev += `${joinWith}${moment().format(current)}`;
//   }, '').trim();
// }
// // 