require('dotenv').config();
const PORT = process.env.PORT || 5000;

const app = require('./app');

app.use('/', (req, res) => {
    console.log(`A request was made to the root route`);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});