

const fs = require('fs');
module.exports = function(name, surname) {
    let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    let id = Math.max(...data.map(user => user.id)) + 1;
    let newUser = { id, name, surname };
    data.push(newUser);
    fs.writeFileSync('data.json', JSON.stringify(data));
    return `Добавлен новый пользователь: ${JSON.stringify(newUser)}`;
};