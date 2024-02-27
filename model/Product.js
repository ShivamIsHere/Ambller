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
    category: [{type: String, enum:[`Kids' T-shirts`,`Couples T-shirts`,`Women's T-shirts`,`Men's' T-shirts`]}],
    images:{ type : [String], required: true},
    color: { type: String, enum: ['Beige','Black','Blue','Brown','Dark Blue','Dark Green','Gold','Green','Grey','Light Blue','Light Green','Maroon','Multicolor','Navy Blue','Orange','Pink','Purple','Red','Silver','White','Yellow']},
    fabric: { type: String, enum: ['Modal','Linen Blend','Wool Blend','Poly Cotton','Nylon','Viscose Rayon','Cotton Blend','Elastane','Organic Cotton','Polyester','Pure Cotton']},
    occasion: { type: String, enum: ['Beach Wear','Casual','Formal','Lounge Wear','Party','Sports']},
    fit: { type: String, enum: ['Boxy','Compression','Loose','Oversized','Regular','Slims']},
    SleeveType: [{type: String, enum:['3/4 Sleeve','Cap Sleeve','Full Sleeve','Half Sleeve','Layered Sleeve','Puff Sleeve','Raglan','Roll-up Sleeve','Short Sleeve','Sleeveless']}],
    NeckType: [{type: String, enum:['Boat Neck ','Cowl Neck','Crew Neck','Halter Neck','Henley Neck','High Neck','Hooded Neck','Key Hole Neck','Mandarin Collar','Peter Pan Collar','Polo Neck','RacerBack','Round Neck','Scoop Neck','Shawl Neck','Square Neck','Stylished Neck','Turtle Neck','V Neck','Zip Neck']}],
    sizes: [{ type: String, enum: ['2XS','XS', 'S', 'M', 'L', 'XL', '2XL','3XL','4XL','5XL','6XL','7XL','8XL','0 - 1 Month','1 - 2 Months','2 - 3 Months','3 - 4 Months','4 - 5 Months','5 - 6 Months','6 - 7 Months','7 - 8 Months','8 - 9 Months','9 - 10 Months','10 - 11 Months','11 - 12 Months','1 - 2 Years','2 - 3 Years','3 - 4 Years','4 - 5 Years','5 - 6 Years','6 - 7 Years','7 - 8 Years','8 - 9 Years','9 - 10 Years','10 - 11 Years','11 - 12 Years','12 - 13 Years','13 - 14 Years','14 - 15 Years','15 - 16 Years'] }],
    gender: { type: String, enum: ['Men','Women','Boys','Girls','Boys & Girls','Baby Boys & Baby Girls','Baby Boys','Baby Girls']},
    discountPrice: { type: Number},
    deleted: { type : Boolean, default: false},
})
//created virtual id so that fronted can get access of id 
//we have created getter and setter for _id 

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