const express = require("express");
const { routes } = require("./routes/user");
const { productroutes } = require("./routes/product");
const cors = require('cors');

const app = express();


app.use(express.json());

app.use(cors());
routes(app);
productroutes(app);
app.use(cors())
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
