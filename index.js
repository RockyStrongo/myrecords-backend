const app = require('./app');

const server = app.listen(app.get('port'), () => {
    console.log(
        `Server Listening on port ${app.get('url')}:${app.get('port')}`
    );
});

module.exports = server;