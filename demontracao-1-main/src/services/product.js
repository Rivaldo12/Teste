const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.create = async (data) => {
  const product = prisma.Product.create({
    data,
    select: {
      id: true,
      name: true,
    },
  });

  return product;
};

exports.getAll = async () => {
  const product = prisma.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
    },
  });
  
  return product;
}

exports.deleteById = async (id) => {
const product = await prisma.product.delete({
  where: {
    id: parseInt(id),
  },
});
return product;
};

exports.uptadeProd = async (id, data) =>{
const product = await prisma.product.update({
  where: {
      id: parseInt(id),
  },
  data, 
});


  return product;
}


//service serve para criar a logica doque fazer