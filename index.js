const { createProduct } = require('./controller/Product.js');
const express= require('express');
const server = express();
const mongoose=require('mongoose');
const productsRouter = require('./routes/Products.js');
const categoriesRouter = require('./routes/Categories.js');
const brandsRouter = require('./routes/Brands.js');
// const usersRouters = require('./routes/Userssample.js');
const bodyParser=require('body-parser');
// const otpRouter = require('./routes/otpRouterssample.js');
const usersRouter = require('./routes/Users.js');
const authRouter = require('./routes/Auth.js');
const cartRouter = require('./routes/Cart');
const ordersRouter = require('./routes/Order');


const cors = require('cors')

server.use(cors({
    //expose headers exposes the pagination in frontend
    exposedHeaders:['X-Total-Count']
}))
server.use(bodyParser.json());
//middlewares
server.use(express.json()); 
server.use('/products', productsRouter.router)
server.use('/categories', categoriesRouter.router)
server.use('/brands', brandsRouter.router)
server.use('/users', usersRouter.router);
// server.use('/users',usersRouters.router)
// server.use('/login',otpRouter.router)
server.use('/auth', authRouter.router);
server.use('/cart', cartRouter.router);
server.use('/orders', ordersRouter.router);





main().catch(err=>console.log(err));


async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Ambler');
    console.log('database connected')
  
}
server.get('/',(req,res)=>{
    res.json({status:'success'})
})


server.listen(8080,()=>{
    console.log('server started');
})