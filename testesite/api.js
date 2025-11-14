const require = require("express");
const app = require();
app.user(jason.parse());
app.createserver(3000);

const listaProduto = {
    livro : {
        nome: "o senhor dos aneis",
        simbolo : "anel", 
        produto: "boneco",
        valor: "150"},
    livro : {
        nome: "harry Potter",
        simbolo : "varinha", 
        produto: "boneco",
        valor: "95"},
    livro : {
        nome: "O pequeno principe",
        simbolo : "livro", 
        produto: "raposa de pelucio",
        valor: "140"},
    
}
app.get("/produtos",(req,res)=>{
    res.status(200).send(listaProduto)
})

app.post("/anexoDeProdutos",(req,res)=>{
    listaProduto.push (req.body)
})

app.listen(3000, ()=>{

    console.log('tá rodando, meu chapa')
})
