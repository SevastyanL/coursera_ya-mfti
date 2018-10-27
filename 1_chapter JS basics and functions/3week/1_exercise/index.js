/**
 * @param {String} date
 * @returns {Object}
 */


// проверка на двухзначное значение. 1 привводим к 01, 2 к 02 и т.д.
function checkZero(time) {
  time = String(time);

  return time.length < 2 ? '0' + time : time;
}

//приводим дату к нужному формату вывода
function formattedDate(time) {
  var year = checkZero(time.getFullYear());
  var month = checkZero(time.getMonth() + 1);
  var date = checkZero(time.getDate());
  var hours = checkZero(time.getHours());
  var minutes = checkZero(time.getMinutes());

  var dt = [year, month, date].join('-');
  var tm = [hours, minutes].join(':');

  return dt + ' ' + tm;
}

module.exports = function (date) {
  var time = new Date(date);
  return {
    add: function (value, kind) {
      //значение не может быть отрицательным
      if (value < 0)
        throw new TypeError('Wrong value');

      switch (kind) {
        case 'years':
          time.setFullYear(time.getFullYear() + value);
          break;

        case 'months':
          time.setMonth(time.getMonth() + value);
          break;

        case 'days':
          time.setDate(time.getDate() + value);
          break;

        case 'hours':
          time.setHours(time.getHours() + value);
          break;

        case 'minutes':
          time.setMinutes(time.getMinutes() + value);
          break;
        //передан неправильный параметр
        default:
          throw new TypeError('Wrong measure');
      }
      return this;
    },
    subtract: function (value, kind) {

      if (value < 0)
        throw new TypeError('Wrong value');
      //значение не может быть отрицательным
      switch (kind) {
        case 'years':
          time.setFullYear(time.getFullYear() - value);
          break;

        case 'months':
          time.setMonth(time.getMonth() - value);
          break;

        case 'days':
          time.setDate(time.getDate() - value);
          break;

        case 'hours':
          time.setHours(time.getHours() - value);
          break;

        case 'minutes':
          time.setMinutes(time.getMinutes() - value);
          break;
        //передан неправильный параметр
        default:
          throw new TypeError('Wrong measure');
      }
      return this;
    },
    get value() {
      var tm = formattedDate(time);
      return tm;
    }
  }
};


