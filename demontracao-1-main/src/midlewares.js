const jwt = require('jsonwebtoken');
const SECRETE = 'rivaldo';
const { verifyAdm  } = require("./services/user");

exports.authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ auth: false, message: 'Token não fornecido.' });
  }

  const tokena = token.split(' ')[1]

  jwt.verify(tokena, SECRETE, (err, decoded) => {
    if (err) {
      return res.status(500).json({ auth: false, message: 'Falha ao autenticar o token.' });
    }
    req.id = decoded.id;
    next();
  });
};

exports.verifyAdm = async (req,res,next) =>{

  const token = req.headers['authorization'];

  const tokena = token.split(' ')[1]
  const decoded = jwt.decode(tokena);
    const user = await verifyAdm(Number(decoded.Id))
    if(user.role != "admin"){
      return res.status(500).json({ auth: false, message: 'Nao e adminstrador.' });
    }
    //console.log(token)
    //console.log(decoded)
    next();
}

exports.verifyDeleted = async (req,res,next) =>{

  const token = req.headers['authorization'];
  const Id = parseInt(req.params.id);
  const tokena = token.split(' ')[1];
  const decoded = jwt.decode(tokena);
  const tokenId = parseInt(decoded.id);
    if(Id != tokenId){
      return res.status(500).json({ auth: false, message: 'Voce nao pode prosseguir!' });
    }
    //console.log(token)
    //console.log(decoded)
    next();
}

