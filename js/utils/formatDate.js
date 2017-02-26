/**
 * ensure string is two-digits long
 */
function pad(str) {
  return String(`00${str}`).slice(-2);
}

/**
 * format date yyyy-mm-dd
 */
export default function formatDate(date) {
  const d = date instanceof Date ? date : new Date(date);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
