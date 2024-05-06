const { create, get, getById, login, uptade, deleted} = require("../controllerts/user");
const { authMiddleware,  verifyAdm, verifyDeleted } = require("../midlewares")
exports.routes = (app) => {
  app.post("/v1/register", create);                                        // C
  app.post("/v1/login", login);                                            // C
  app.get("/v1/user", authMiddleware,verifyAdm,get);                       // R
  app.put("/v1/user/:id", authMiddleware,verifyAdm,uptade);                // U 
  app.delete("/v1/user/:id", authMiddleware,verifyDeleted,deleted);        // D
  app.get("/v1/user/:id", authMiddleware,getById);                         // R
  //app.get("/adm/:id",verifyAdm);                                         // R
};


