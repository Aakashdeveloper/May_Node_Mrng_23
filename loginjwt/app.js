const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db');
const port = process.env.PORT || 5000;

app.use(cors());

const AuthController = require('./controller/AuthController');
app.use('/api/auth', AuthController);

app.listen(port,() => {
    console.log(`Running on port ${port}`)
})