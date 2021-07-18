const express = require('express');
const config = require('config');
const db = require('./db');

const app = express();

app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));

const PORT = config.get('port') || 5000;

db.connect()
    .then((r) => {
        console.log('Connected to mongodb');
    })
    .catch((e) => {
        console.log('Error connecting to mongodb', e.message);
        process.exit(1);
    });

app.listen(5000, () => {
    console.log(`App has been started on port ${PORT}...`)
    console.log(`http://localhost:${PORT}`)
});