const mongoose = require("mongoose");
const marked = require("marked")
const slugify = require("slugify")
const createDomPurify = require("dompurify")
const {JSDOM} = require("jsdom")

const dompurify = createDomPurify(new JSDOM().window)

const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        require: true
    },
    description:{
        type:String
    },
    image:{
        type:String
    },
    markdown:{
        type: String,
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    slug:{
        type: String,
        required: true,
        unique: true,   
    },
    sanitizedHtml:{
        type:String,
        required:true, 
    }
})

articleSchema.pre("validate",function(next){
    if(this.markdown){
        this.sanitizedHtml = dompurify.sanitize(this)
    }

    if(this.title){
        this.slug = slugify(this.title, {lower:true, strict: true})
    }

    next()
})


module.exports = mongoose.model("Article",articleSchema)