// Встроенный в Node.JS модуль для проверок
var assert = require('assert');

// Подключаем свою функцию
var lib = require('./index.js');

// Коллекция данных
var friends = [{
      name: 'Сэм',
      gender: 'Мужской',
      email: 'luisazamora@example.com',
      favoriteFruit: 'Картофель'
   },
   {
      name: 'Эмили',
      gender: 'Женский',
      email: 'example@example.com',
      favoriteFruit: 'Яблоко'
   },
   {
      name: 'Мэт',
      gender: 'Мужской',
      email: 'danamcgee@example.com',
      favoriteFruit: 'Яблоко'
   },
   {
      name: 'Брэд',
      gender: 'Мужской',
      email: 'newtonwilliams@example.com',
      favoriteFruit: 'Банан'
   },
   {
      name: 'Шерри',
      gender: 'Женский',
      email: 'danamcgee@example.com',
      favoriteFruit: 'Картофель'
   },
   {
      name: 'Керри',
      gender: 'Женский',
      email: 'danamcgee@example.com',
      favoriteFruit: 'Апельсин'
   },
   {
      name: 'Стелла',
      gender: 'Женский',
      email: 'waltersguzman@example.com',
      favoriteFruit: 'Картофель'
   }
];

var copy = friends.slice();

// Выполняем выборку и фильтрацию с помощью нашего конструктора
var result = lib.query(
   friends,
   lib.select('name', 'gender', 'email'),
   lib.filterIn('favoriteFruit', ['Яблоко', 'Картофель'])
);

// Исходный массив не изменился
assert.deepEqual(friends, copy, '0');

// Сравниваем полученный результат с ожидаемым
assert.deepEqual(result, [{
      name: 'Сэм',
      gender: 'Мужской',
      email: 'luisazamora@example.com'
   },
   {
      name: 'Эмили',
      gender: 'Женский',
      email: 'example@example.com'
   },
   {
      name: 'Мэт',
      gender: 'Мужской',
      email: 'danamcgee@example.com'
   },
   {
      name: 'Шерри',
      gender: 'Женский',
      email: 'danamcgee@example.com'
   },
   {
      name: 'Стелла',
      gender: 'Женский',
      email: 'waltersguzman@example.com'
   }
], '1');

// Игнорируем лишние поля
var result2 = lib.query(
   friends,
   lib.select('name', 'gender', 'email', 'someField', 'anotherField'),
   lib.filterIn('favoriteFruit', ['Яблоко', 'Картофель'])
);

// Сравниваем полученный результат с ожидаемым
assert.deepEqual(result2, [{
      name: 'Сэм',
      gender: 'Мужской',
      email: 'luisazamora@example.com'
   },
   {
      name: 'Эмили',
      gender: 'Женский',
      email: 'example@example.com'
   },
   {
      name: 'Мэт',
      gender: 'Мужской',
      email: 'danamcgee@example.com'
   },
   {
      name: 'Шерри',
      gender: 'Женский',
      email: 'danamcgee@example.com'
   },
   {
      name: 'Стелла',
      gender: 'Женский',
      email: 'waltersguzman@example.com'
   }
], '2');

// Пересечение select
var result3 = lib.query(
   friends,
   lib.select('name', 'gender'),
   lib.filterIn('favoriteFruit', ['Яблоко', 'Картофель']),
   lib.select('gender', 'email'),
);

// Сравниваем полученный результат с ожидаемым
assert.deepEqual(result3, [{
      gender: 'Мужской'
   },
   {
      gender: 'Женский'
   },
   {
      gender: 'Мужской'
   },
   {
      gender: 'Женский'
   },
   {
      gender: 'Женский'
   }
], '3');

// Исходный массив не изменился
assert.deepEqual(friends, copy, '00');
// Пересечение фильтров
var result4 = lib.query(
   friends,
   lib.filterIn('favoriteFruit', ['Картофель', 'Банан']),
   lib.select('name', 'gender', 'email'),
   lib.filterIn('favoriteFruit', ['Яблоко', 'Картофель'])
);

// Сравниваем полученный результат с ожидаемым
assert.deepEqual(result4, [{
      name: 'Сэм',
      gender: 'Мужской',
      email: 'luisazamora@example.com'
   },
   {
      name: 'Шерри',
      gender: 'Женский',
      email: 'danamcgee@example.com'
   },
   {
      name: 'Стелла',
      gender: 'Женский',
      email: 'waltersguzman@example.com'
   }
], '4');

// Не передали обработчики
var result5 = lib.query(
   friends
);

// Исходный массив не изменился
assert.deepEqual(result5, copy, '5');

// без фильтрации
var result6 = lib.query(
   friends,
   lib.select('name', 'gender', 'email')
);

// Сравниваем полученный результат с ожидаемым
assert.deepEqual(result6, [{
      name: 'Сэм',
      gender: 'Мужской',
      email: 'luisazamora@example.com'
   },
   {
      name: 'Эмили',
      gender: 'Женский',
      email: 'example@example.com'
   },
   {
      name: 'Мэт',
      gender: 'Мужской',
      email: 'danamcgee@example.com'
   },
   {
      name: 'Брэд',
      gender: 'Мужской',
      email: 'newtonwilliams@example.com'
   },
   {
      name: 'Шерри',
      gender: 'Женский',
      email: 'danamcgee@example.com'
   },
   {
      name: 'Керри',
      gender: 'Женский',
      email: 'danamcgee@example.com'
   },
   {
      name: 'Стелла',
      gender: 'Женский',
      email: 'waltersguzman@example.com'
   }
], '6');

// Без выбора полей
var result7 = lib.query(
   friends,
   lib.filterIn('favoriteFruit', ['Яблоко'])
);



assert.deepEqual(result7, [{
      name: 'Эмили',
      gender: 'Женский',
      email: 'example@example.com',
      favoriteFruit: 'Яблоко'
   },
   {
      name: 'Мэт',
      gender: 'Мужской',
      email: 'danamcgee@example.com',
      favoriteFruit: 'Яблоко'
   }
], '7');

// без пересечения по полям
var result8 = lib.query(
   friends,
   lib.select('name'),
   lib.select('email')
);

// Исходный массив не изменился
assert.deepEqual(result8, copy, '8');

// Без пересечения фильтров
var result9 = lib.query(
   friends,
   lib.filterIn('favoriteFruit', ['Картофель']),
   lib.filterIn('favoriteFruit', ['Яблоко'])
);
console.log("result9 ", result9);
// Исходный массив не изменился
assert.deepEqual(result9, copy, '9');







console.info('OK!');