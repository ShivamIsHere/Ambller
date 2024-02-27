const mongoose = require('mongoose');
const {Schema} = mongoose;


const productSchema = new Schema({
    title: { type : String, required: true},
    description: { type : String, required: true},
    price: { type: Number, min:[1, 'Price must be greater than 0']},
    discountPercentage: { type: Number, min:[1, 'Discount must be greater than 1'], max:[99, 'Discount must be less than 99']},
    rating: { type: Number, min:[1, 'Please enter a valid rating'], max:[5, 'Please enter a valid rating'], default:1},
    stock: { type: Number, min:[0, 'Please Enter a valid Stock'], default:0},
    brand: { type : String, required: true},
    category: { type : String, required: true},
    images:{ type : [String], required: true},
    colors:{ type : [Schema.Types.Mixed] },
    sizes:{ type : [Schema.Types.Mixed]},
    discountPrice: { type: Number},
    deleted: { type : Boolean, default: false},
})

const virtualId  = productSchema.virtual('id');
virtualId.get(function(){
    return this._id;
})
productSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})

exports.Product = mongoose.model('Product',productSchema)