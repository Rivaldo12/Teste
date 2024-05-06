const { create, getAll, getById, login, uptade, deleted  } = require("../services/user");
const bcrypt = require("bcrypt");
const yup = require("yup");
const jwt = require('jsonwebtoken');
const { json } = require("stream/consumers");
const SECRETE = 'rivaldo';

const { authMiddleware } = require("../midlewares")


exports.create = async (req, res) => {
  try {
    const schema = yup.object({
      name: yup.string().required(),
      email: yup.string().required().email(),
      password: yup.string().required().min(6),
      admin: yup.boolean().default(false),
    });

    const data = await schema.validate(req.body);
    if(req.body.admin != false && data.admin != false){
      return res.status(201).send("Voce nao tem permissao para setar o admin");
    }
    data.password = bcrypt.hashSync(req.body.password, 10);
    const user = await create(data);
    return res.status(200).send(user);
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await login(email);

    if (!user) {
      return res.status(400).send("Credenciais invalidas");
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (passwordMatch) {
      //console.log(user.id);
      const token = jwt.sign( 
        { Id : user.id,
          Name: user.name
        },
        SECRETE,
        { expiresIn: "1d"}
      );
      return res.json({ auth: true, token});
    } else {
      return res.status(400).send("Credenciais inválidas");
    }
  } catch (error) {
    return res.status(500).send("Erro interno do servidor");
  }
};


exports.uptade = async (req,res) =>{
  try {
    const users = await uptade(req.params.id, req.body);
    return res.status(200).send(users);
  } catch (e) {
    return res.status(400).send(e);
  }
}

exports.get = async (req, res) => {
  try {
    const users = await getAll();
    return res.status(200).send(users);
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.getById = async (req, res) => {
  try {
    const users = await getById(Number(req.params.id));
    return res.status(200).send(users);
  } catch (e) {
    return res.status(200).send(e);
  }
};


exports.deleted = async (req,res) =>{
try{
  const users = await deleted(Number(req.params.id));
  return res.status(200).send(users);
}catch(e){
  return res.status(400).send(e);
}
}