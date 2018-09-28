/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {
	var t;
    minutes += interval;
    while (minutes > 59)
    {
        minutes -= 60;
        hours++;
    }
    while (hours > 23)
        hours-= 24;
    if (hours < 10)
      hours = "0" + hours;
    if (minutes < 10)
      minutes = "0" + minutes;
    t = hours + ":" + minutes;
    return t;
};