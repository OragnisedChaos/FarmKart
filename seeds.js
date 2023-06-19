const Product = require('./models/product');


const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(()=>{
        console.log('Mongo Connection Open');
    })
    .catch(err=>{
        console.log("Mongo Connection Error!!");
        console.log(err);
    })
//  const p = new Product({
//     name : 'Mango',
//     price: 25,
//     catergory: 'fruit'
//  })
//  p.save().then(p=>{
//     console.log(p);
//  })
//  .catch(e=>{
//     console.log(e)
//  })
const seedProducts = [
   { name: 'Eggplant',
    price:10,
    catergory:'vegetable'
},
{
    name:'Organic Melons',
    price:50,
    catergory:'fruit'
},
{
    name:'milk',
    price : 68,
    catergory:'dairy'
},
{
    name:'LadyFinger',
    price:10,
    catergory:'vegetable'
},
{
    name:'Lichi',
    price:40,
    catergory:'fruit'
}
]
Product.insertMany(seedProducts)
    .then(res=>{
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })