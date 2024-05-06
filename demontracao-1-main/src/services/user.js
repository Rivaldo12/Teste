const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.login = async (email) =>{
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    }
  });
  return user;
}

exports.create = async (data) => {
  const user = prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
    },
  });

  return user;
};

exports.getAll = async () => {
  const users = prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      admin:true,
    },
  });

  return users;
};

exports.getById = async (id) => {
  const user = prisma.user.findUnique({
    where: {
      id,
    },select:{
      name: true,
      id: true,
    }
  });

  
  return user;
};


exports.verifyAdm = async (id) => {
  const user = prisma.user.findUnique({
    where:{
      id: parseInt(id),
    }
  });

  return user;
  
}

exports.uptade = async (id, data) => {
  const user =  await prisma.user.update({
    where:{
      id: parseInt(id),
    },
    data,
  });

  return user;
}

exports.deleted = async (id) =>{
  const user = await prisma.user.delete({
    where:{
      id,
    }
  });

  return user;
}

//Como achei o erro, ao verificar as consultas notei que o where do id nao trazia nada porem, ao colocar id: id ele retornou uma array vazia com base nisso pensei que poderia ser
//a forma do retorno do dados
