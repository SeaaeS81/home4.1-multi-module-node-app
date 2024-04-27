const fs = require('fs');
module.exports = function() {
    let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    return `Все пользователи: ${JSON.stringify(data)}`;
};