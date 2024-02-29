const { createProduct } = require('./controller/Product.js');
const express= require('express');
const server = express();
const mongoose=require('mongoose');
const productsRouters = require('./routes/Products.js');
const categoriesRouters = require('./routes/Categories.js');
const brandsRouters = require('./routes/Brands.js');
const cors = require('cors')

server.use(cors({
    //expose headers exposes the pagination in frontend
    exposedHeaders:['X-Total-Count']
}))
//middlewares
server.use(express.json()); 
server.use('/products', productsRouters.router)
server.use('/categories', categoriesRouters.router)
server.use('/brands', brandsRouters.router)




main().catch(err=>console.log(err));


async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Ambler');
    console.log('database connected')
  
}
server.get('/',(req,res)=>{
    res.json({status:'success'})
})


server.listen(4000,()=>{
    console.log('server started');
})