const path = require('path');
const jsonServer = require('json-server');
const fs = require('fs');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

server.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { users = [] } = db;

        const userFromDb = users.find(
            (user) => user.username === username && user.password === password,
        );

        if (userFromDb) {
            return res.json(userFromDb);
        }

        return res.status(403).json({ message: 'AUTH ERROR' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
});

// eslint-disable-next-line
server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'AUTH ERROR' });
    }

    next();
});

server.use(router);

server.listen(8000, () => {
    console.log('JSON Server is running on port 8000');
});
