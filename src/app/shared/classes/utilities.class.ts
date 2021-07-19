export const currentTime = function () {
  const dateObj = new Date();
  const month = addZero(dateObj.getMonth());
  const day = addZero(dateObj.getDate());
  const year = dateObj.getFullYear();
  const hour = addZero(dateObj.getHours());
  const minute = addZero(dateObj.getMinutes());
  const second = addZero(dateObj.getSeconds());

  function addZero(time: number) {
    let timeString = time.toString();
    return timeString.length < 2 ? "0" + timeString : timeString;
  }

  return year+'-'+day+'-'+month+" "+hour+":"+minute+":"+second ;
}
