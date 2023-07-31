function timeConverter(time) {
  var currentTime = new Date();

  // Given timestamp
  var givenTimestamp = new Date(time);

  // Calculate the time difference in milliseconds
  var timeDifference = currentTime - givenTimestamp;

  // Convert the time difference to a human-readable format
  var seconds = Math.floor(timeDifference / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);

  var agoFormat = "";
  if (seconds > 0 && seconds < 60) {
    agoFormat = `${seconds} detik`;
  }
  if (minutes > 0 && minutes < 60) {
    agoFormat = `${minutes} menit`;
  }
  if (hours > 0 && hours < 24) {
    agoFormat = `${hours} jam`;
  }
  if (days > 0) {
    agoFormat = `${days} hari`;
  }

  return agoFormat;
}

export default timeConverter;
