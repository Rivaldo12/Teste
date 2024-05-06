const { create, deleteById, getAll, uptadeProd } = require("../controllerts/product");
const { authMiddleware, verifyAdm, verifyDeleted } = require("../midlewares")


exports.productroutes = (app) => {
  app.post("/v1/product", authMiddleware,verifyAdm,create);
  app.get("/v1/product", authMiddleware,getAll);
  app.delete("/v1/product/:id", authMiddleware,verifyAdm,deleteById);
  app.put("/v1/product/:id", authMiddleware,verifyAdm,uptadeProd);
};
