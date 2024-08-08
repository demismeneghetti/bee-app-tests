const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Carregar o arquivo .env correto conforme o ambiente
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET não está definido no arquivo .env");
}

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bee-app-tests';
const JWT_SECRET = process.env.JWT_SECRET;

console.log(`MONGODB_URI: ${MONGODB_URI}`);
console.log(`JWT_SECRET: ${JWT_SECRET}`);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
    console.error('URI de conexão:', MONGODB_URI);
  });

// Definição de esquemas
const UserSchema = new mongoose.Schema({ username: String, password: String, fullName: String, email: String, phone: String });
const ClientSchema = new mongoose.Schema({ name: String, email: String });
const SupplierSchema = new mongoose.Schema({ name: String, email: String });

const User = mongoose.model('User', UserSchema);
const Client = mongoose.model('Client', ClientSchema);
const Supplier = mongoose.model('Supplier', SupplierSchema);

// Middleware para verificar o token JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Rotas de autenticação
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

app.post('/register', async (req, res) => {
  const { username, password, fullName, email } = req.body;
  const user = new User({ username, password, fullName, email });
  await user.save();
  res.json({ message: 'Registro realizado com sucesso!' });
});

// Rota para obter dados do utilizador
app.get('/getUserData', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password'); // Excluir a senha da resposta
    if (!user) {
      return res.status(404).json({ message: 'Utilizador não encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Erro ao obter dados do utilizador:', error);
    res.status(500).json({ message: 'Erro ao obter dados do utilizador' });
  }
});

// Rotas de clientes
app.post('/clients', authenticateJWT, async (req, res) => {
  const { name, email } = req.body;
  const client = new Client({ name, email });
  await client.save();
  res.json({ message: 'Cliente cadastrado com sucesso!' });
});

// Rotas de fornecedores
app.post('/suppliers', authenticateJWT, async (req, res) => {
  const { name, email } = req.body;
  const supplier = new Supplier({ name, email });
  await supplier.save();
  res.json({ message: 'Fornecedor cadastrado com sucesso!' });
});

app.post('/updateProfile', authenticateJWT, async (req, res) => {
  const { fullName, phone, currentPassword, newPassword } = req.body;
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilizador não encontrado' });
    }

    if (currentPassword && newPassword) {
      if (user.password !== currentPassword) {
        return res.status(400).json({ message: 'Senha atual incorreta' });
      }
      user.password = newPassword;
    }

    user.fullName = fullName || user.fullName;
    user.phone = phone || user.phone;

    await user.save();
    res.json({ message: 'Perfil atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ message: 'Erro ao atualizar perfil' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
