//1 Объедините логику HTTP-сервера и файлового сервера в один проект.
//2 Добавьте маршрутизацию для обработки различных HTTP-запросов (GET, POST, PUT, DELETE)
//3 Расширьте ваш EventEmitter для генерации событий при различных операциях
//4 Реализуйте функциональность загрузки и скачивания файлов через HTTP-запросы
//5 Протестируйте работу сервера с помощью Postman или другого аналогичного инструмента

//адаптированный код
const http = require('http');
const url = require('url');
const fs = require('fs');
const editModule = require('./editModule');
const addModule = require('./addModule');
const getModule = require('./getModule');
const removeModule = require('./removeModule');
const events = require('./events');

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;

    if (req.method === 'POST' && path === '/upload') {
        const fileStream = fs.createWriteStream('./uploadedFile');
        req.pipe(fileStream);
        res.end('File uploaded');
        events.emit('fileUploaded');
    } else if (req.method === 'GET' && path === '/download') {
        const fileStream = fs.createReadStream('./uploadedFile');
        fileStream.pipe(res);
        events.emit('fileDownloaded');
    } else if (path === '/edit') {
        res.write(editModule(/* параметры */));
    } else if (path === '/add') {
        res.write(addModule(/* параметры */));
    } else if (path === '/get') {
        res.write(getModule(/* параметры */));
    } else if (path === '/remove') {
        res.write(removeModule(/* параметры */));
    } else {
        res.write('404 Not Found');
    }

    res.end();
}).listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});

events.on('fileUploaded', () => {
    console.log('File was uploaded');
});

events.on('fileDownloaded', () => {
    console.log('File was downloaded');
});