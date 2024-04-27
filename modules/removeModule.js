const fs = require('fs');
module.exports = function(id) {
    let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    let index = data.findIndex(user => user.id === id);
    if(index !== -1) {
        let removedUser = data.splice(index, 1);
        fs.writeFileSync('data.json', JSON.stringify(data));
        return `Удален пользователь: ${JSON.stringify(removedUser)}`;
    } else {
        return 'Пользователь не найден';
    }
};