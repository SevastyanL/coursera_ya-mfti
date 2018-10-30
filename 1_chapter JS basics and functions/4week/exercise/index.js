/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */

function query(collection) {
  var friends = JSON.parse(JSON.stringify(arguments[0])); //создаем копию объекта
  //сохраняем в args функции и создаем массивы, в которые мы будем их фильтровать
  var args = [].slice.call(arguments, 1);
  var filter = [];
  var select = [];
  //отфильтровываем функции по ранее созданным массивам
  sortOperations(args, filter, select); 
  //фильтруем только если есть валидные параметры
  if (filter.length > 0)
    uniqFilter(filter, friends);
  //тоже самое для select
  if (select.length > 0)
    uniqSelect(select, friends);

  return friends;
}

/**
 * @params {String[]}
 */
function select() {
  //добавляем select для последующей фильтрации
  fit = [].slice.call(arguments);
  fit.unshift('select');
  return fit;
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
  //добавляем filterIn для последующей фильтрации
  return ['filterIn', property, values];
}

function sortOperations(arr, filter, select) {
  //сортируем в зависимости от операции, не должно быть undefined и пустых значений
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][0] === 'filterIn' && arr[i][1] !== undefined && arr[i][2] !== undefined && arr[i][2].length !== 0) {
      filter.push(arr[i].slice(1));
    }
    else if (arr[i][0] === 'select' && arr[i].length > 1 && arr[i][1] !== undefined) {
      select.push(arr[i].slice(1));
    }
  }
}

function uniqFilter(filter, obj) {
  //удаляем ненужные значения
  for (var i = 0; i < obj.length; i++) {
    for (var j = 0; j < filter.length; j++) {
      if (obj[i] !== undefined && filter[j][1].indexOf(obj[i][filter[j][0]]) === -1) {
        obj.splice(i, 1);
        i--;
      }
    }
  }
}

function uniqSelect(select, obj) {
  //удаляем ненужные значения
  var keys = Object.keys(obj[0]);

  for (var i = 0; i < obj.length; i++) {
    for (var j = 0; j < select.length; j++) {
      for (var k = 0; k < keys.length; k++) {
        if (select[j].indexOf(keys[k]) === -1) {
          delete obj[i][keys[k]];
        }
      }
    }
  }
}


module.exports = {
    query: query,
    select: select,
    filterIn: filterIn,
    sortOperations: sortOperations,
    uniqFilter: uniqFilter,
    uniqSelect: uniqSelect
};
