const { Product } = require('../model/Product.js');

exports.createProduct = async (req, res) => {
  
const product = new Product(req.body);
try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};


exports.fetchAllProducts = async (req, res) => {
    // filter = {"category":["smartphone","laptops"]}
    // sort = {_sort:"price",_order="desc"}
    // pagination = {_page:1,_limit=10}
    
    
    let query = Product.find({});
    // totalProductsQuery is a query used to fetch all products from the database based on certain conditions, but without applying pagination limits. 
    // Its purpose is to retrieve the total count of products that match the specified conditions, which can be used for pagination purposes.
    // After applying all filter conditions, totalProductsQuery is executed with the count() method to count the total number of documents that match the specified conditions.
    let totalProductsQuery = Product.find({});
  //filtering products
    console.log(req.query.category);
  
    if (req.query.category) {
      query = query.find({ category:req.query.category });
      totalProductsQuery = totalProductsQuery.find({
        category:req.query.category,
      });
    }
    


    if (req.query.color) {
      query = query.find({ color:req.query.color });
      totalProductsQuery = totalProductsQuery.find({ color:req.query.color});
    }


    if (req.query.fabric) {
      query = query.find({ fabric:req.query.fabric });
      totalProductsQuery = totalProductsQuery.find({ fabric:req.query.fabric});
    }


    if (req.query.occasion) {
      query = query.find({ occasion:req.query.occasion });
      totalProductsQuery = totalProductsQuery.find({ occasion:req.query.occasion});
    }


    if (req.query.fit) {
      query = query.find({ fit:req.query.fit });
      totalProductsQuery = totalProductsQuery.find({ fit:req.query.fit});
    }


    if (req.query.sleeveType) {
      query = query.find({ sleeveType:req.query.sleeveType });
      totalProductsQuery = totalProductsQuery.find({ sleeveType:req.query.sleeveType});
    }


    if (req.query.neckType) {
      query = query.find({ neckType:req.query.neckType });
      totalProductsQuery = totalProductsQuery.find({ neckType:req.query.neckType});
    }
    if (req.query.gender) {
      query = query.find({ gender:req.query.gender });
      totalProductsQuery = totalProductsQuery.find({ gender:req.query.gender});
    }
    if (req.query.sizes) {
      query = query.find({ sizes:req.query.sizes });
      totalProductsQuery = totalProductsQuery.find({ sizes:req.query.sizes});
    }


    //sorting items
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }
    // totalDocs represents the total number of documents (products) that match the specified filter conditions
    // it is an important piece of information for implementing pagination and providing insights into the total dataset available in the backend.
    const totalDocs = await totalProductsQuery.count().exec();
    console.log({ totalDocs });
  
    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;

      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
  
    try {
      const docs = await query.exec();
    //   The total count obtained from totalProductsQuery is then used for pagination purposes. 
    //   It is typically sent back to the client in the response headers (using X-Total-Count header) 
    // to inform the client about the total number of products available, which helps in implementing client-side pagination.
      res.set('X-Total-Count', totalDocs);
      res.status(200).json(docs);
    } catch (err) {
      res.status(400).json(err);
    }
  };


