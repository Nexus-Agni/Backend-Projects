const express = require('express');
const authRouter = require('./router/authRoute');
const databaseConnect = require('./config/databaseConfig');
const app = express();

databaseConnect();
app.use(express.json())

app.use('/api/auth', authRouter);

app.use('/', (req, res)=>{
    res.status(200).json({data : 'JWT auth server --updated'});
});

module.exports = app;