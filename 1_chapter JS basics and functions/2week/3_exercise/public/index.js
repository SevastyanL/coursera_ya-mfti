// Телефонная книга. Номера подаются уникальные в формате типа phoneBook('ADD Ivan 555-10-01,555-10-03');
//Гарантируется, что функция будет вызываться корректно, только со списком перечисленных команд. 
//Корректность входных данных проверять не нужно.
//Имя команды пишется большими буквами, параметры разделяются одним пробелом.
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
    //разбиваем строку на команду, контакт и телефон
    command = command.split(' ');

    if (command[0] == 'ADD')
        return add(command);
    else if (command[0] == 'REMOVE_PHONE')
        return remove(command);
    else if (command[0] == 'SHOW')
        return show();

    function add(command) {
        //сразу разбиваем номера на массив, чтобы было удобнее добавлять
        var phones = command[2].split(',');

        //если такого контакта нет, то создаем его и добавляем телефоны в виде массива
        if (!phoneBook.hasOwnProperty(command[1]))
          phoneBook[command[1]] = phones;
        else // если контакт уже есть, то пушим в массив по одному телефону 
          for(var i = 0; i < phones.length; i++)
            phoneBook[command[1]].push(phones[i]);
        return phoneBook;
    }

    function remove(command) {
        // разбиваем телефоны на массив
        var phones = command[1].split(',');
        var checkDel = false; //определяем был такой телефон или нет
        //пробегаемся по объекту и ищем совпадения телефонов 
        for (var i = 0; i < phones.length; i++) //цикл нужен если подали несколько телефонов
          for (var contact in phoneBook) //проходим по контактам
            for (var j = 0; j < phoneBook[contact].length; j++) //проходим по значениям
              if (phoneBook[contact][j] === (phones[i])){
                phoneBook[contact].splice(j, 1); //удаляем телефон в массиве
                checkDel = true; //телефон удалили, поэтому меняем тру
              }

        // если контакт стал пустым, то удаляем его
        for (var contact in phoneBook)
          if (phoneBook[contact].length == 0)
            delete phoneBook[contact];
        
      return checkDel;
    }

    function show() {
        var contacts = Object.keys(phoneBook); //сохраняем имена контактов
        contacts.sort(); //сортируем их по алфавиту (подаются с заглавной)
        var showBook = []; //создаем массив для объединения контакта с номером
        for(var i = 0; i < contacts.length; i++)
          showBook.push(contacts[i] + ': ' + phoneBook[contacts[i]].join(', ')); //заполняем его
          //console.log(showBook);
        return showBook;
    }

    return phoneBook;
};