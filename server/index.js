// importing of libraries
import express from 'express';
import settings from './settings';
import routes from './routes';
import sequelize from '../database/setup';
const User = require('../database/models/User');


const app = express();

// database init
sequelize.sync().then(() => console.log('Database is ready!'))

// use permissions
app.use(routes);
app.use(express.json());

// destructuring data
const { hostName, accessPort } = settings;

// user test do database
// User.create({ name: 'Lucas', email: 'bogoslucas1@gmail.com', password: 'bogos1726' });

// communication with database
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.send(users);
})

app.post('/register', async (req, res) => {
  const users = await User.create(req.body);
  res.json(users);
});

// server init
app.listen(accessPort, () => {
  console.log(`Server working at http://${hostName}:${accessPort}/`)
});
