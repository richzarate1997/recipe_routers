export const renderCooktime = (cookMinutes) => {
  let result = "\n";
  if (cookMinutes >= 60) {
    result += Math.floor(cookMinutes / 60) + " hr ";
  }
  if (cookMinutes % 60 !== 0) {
    result += cookMinutes % 60 + " min";
  }
  return result;
}