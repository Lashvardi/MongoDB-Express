const express = require("express")
const mongoose = require("mongoose")
const Article = require("./models/article")
const methodOverride = require("method-override")
const app = express();
const articleRouter = require("./routes/articles")

mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://admin:admin@cluster0.fq6pcrl.mongodb.net/test")

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))

app.get("/",async (req, res)=>{
    const articles = await Article.find().sort({
        createdAt: "desc"
    });
    res.render("articles/index",{
        articles: articles
    })
})

app.use("/articles", articleRouter)

app.listen(5000)

