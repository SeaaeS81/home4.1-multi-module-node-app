const fs = require('fs');
module.exports = function(name, surname, id) {
    let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    let user = data.find(user => user.id === id);
    if(user) {
        user.name = name || user.name;
        user.surname = surname || user.surname;
        fs.writeFileSync('data.json', JSON.stringify(data));
        return `Данные пользователя ${id} обновлены: ${JSON.stringify(user)}`;
    } else {
        return 'Пользователь не найден';
    }
};

