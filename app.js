const app = require("express")();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

// configurações obrigatórias
app.use((req, res, next ) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-type, Accept");
    next();
});

// body parser
app.use(bodyparser.json());

// configuração de conexão com MongoDB
mongoose.connect("mongodb://localhost/receitas", {
    useUnifiedTopology: true,
    useNewUrlParser: true  
}).then(() => {
    console.log("Conexão feita com sucesso");
}).catch((erro) => {
    console.log("Erro ao se conectar com o banco de dados")
});

// carregar model de Receitas
require("./models/Receita");
const Receita = mongoose.model("Receita");

// ENDPOINTS
   
    // Listar receitas
    app.get("/", (req, res) => {
        // busque todas as receitas
        Receita.find({}).then((receita) => {
            // se houve resultados retorne um json
            return res.json(receita);
        }).catch((erro) => {
            // se não encontra nenhuma receita
            return res.status(404).json({
                message: "Nenhuma receita encontrada"
            });
        });
    })

    // cadastrar receitas
    app.post("/receita", (req, res) =>{
        var receita = new Receita({ 
        // valores que vão ser cadastrados no banco
            id: req.body.id,
            nome: req.body.nome,
            image: req.body.image,
            ingredientes: req.body.ingredientes,
            preparo: req.body.preparo
        });

        receita.save().then(() => {
            // se os dados forem salvos com sucesso
            res.statusCode = 201;
            res.send();
        }).catch((erro) =>{
            // se ocorreu um erro
            if(erro){
                throw erro;
            }

            res.status(417),
            res.send();
        });
    });

// server

app.listen(8000, () => {
    console.log("API Rodando")
});
    

