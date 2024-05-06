const exp = require("constants");
const { create, deleteById, getAll, uptadeProd } = require("../services/product");
const yup = require("yup");

exports.create = async (req, res) => {
  try {
    const schema = yup.object({
      name: yup.string().required(),
      price: yup.number().required(),
      description: yup.string().required(),
    });

    const data = await schema.validate(req.body);
    const product = await create(data);
    return res.status(200).send(product);
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.getAll = async (req, res) => {
  try {
    const product = await getAll();
    return res.status(200).send(product);
  } catch (e) {
    return res.status(400).send(e);
  }
};


exports.deleteById = async (req, res) => {
  try {
    const product = await deleteById(req.params.id);
    return res.status(200).send(product);
  } catch (e) {
    return res.status(400).send(e);
  }
};


exports.uptadeProd = async (req,res) =>{
  try {
    const product = await uptadeProd(req.params.id, req.body);
    return res.status(200).send(product);
  } catch (e) {
    return res.status(400).send(e);
  }
};

// controler serve para controlar os dados do service