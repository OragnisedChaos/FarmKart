const mongoose = require('mongoose');
const {Schema} = mongoose;
const farmSchema = new Schema({
    name :{
        type : String,
        required:[true , 'Farm must have a Name']
    },
    city :String,
    email :{
        type : String,
        reuqired : [true , 'Email Required !!']
    },
    products : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Product'
        }
    ]
})
const Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm;