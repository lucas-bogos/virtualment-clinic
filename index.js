// importing of libraries
import express from 'express';
import path from 'path';

import settings from './settings';
import sequelize from './database/setup';

const User = require('./database/models/User');
const session = require('express-session');

import "dotenv/config";

// intancias
const app = express();


// destructuring data
const { hostName, accessPort, sessionSecret } = settings;

// database init
sequelize.sync().then(() => console.log('Database is ready!'))

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/assets'));

const hour = 3600000;

app.use(session({ 
  secret: sessionSecret,
  cookie: {
    maxAge: hour,
    expires: new Date(Date.now() + hour)
  },
  resave: false,
  saveUninitialized: false
}));

// communication with database
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/main.html'));
});

// routes
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/login.html'));
});

app.get('/como-funciona', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/como-funciona.html'));
});

app.get('/depoimentos', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/depoimentos.html'));
});

app.get('/sobre-nos', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/sobre-nos.html'));
});

app.get('/termos-uso-privacidade', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/termos.html'));
});

app.get('/seja-membro', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/seja-membro.html'));
});

app.get('/agendar-consulta', (req, res) => {
  if(req.session.login) {
    console.log(`O usuário ${req.session.login} realmente está logado!`)
    return res.sendFile(path.join(__dirname, '/public/pages/agendar.html'));
  }
  return res.status(301).redirect('/login');
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/cadastrar.html'))
});

app.post('/processing', async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({
    where: {
      'email': email,
      'password': password
    }
});

  if(!userExists) {
    res.send("Usuário inexistente!");
  } else {
    req.session.login = name;
    console.log(`O usuário ${req.session.login} foi logado!`)

    return (
      res.status(303).redirect('/agendar-consulta')
    )
  }
});

app.post('/creating-user', async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({ 
    name: name, 
    email: email, 
    password: password 
  });

  return res.status(303).redirect('/login');
});

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

// server init
app.listen(accessPort, () => {
  console.log(`Server working at http://${hostName}:${accessPort}/`)
});
