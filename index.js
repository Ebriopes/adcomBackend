require('./database');
const { app, PORT } = require('./server');

app.listen(PORT, (err) => err ? console.error(err) : console.info(`Server on port: ${PORT}`));