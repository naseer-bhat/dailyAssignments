import Product from "../models/Product.model.js";
import User from "../models/Product.model.js";

export const getUsers= async(req,res)=>{

  const allUsers= await User.find()
  res.json(allUsers)
}

export const getPagination = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.json({
      products,
      totalPages: Math.ceil(products.length / limit),
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export const topNSellers = async (req, res) => {
  try {
    const { n = 5 } = req.query;

    const topNUsers=  Product.aggregate([{$group:{_id:"$userId",productCount:{$sum:1}}},{$sort:{productCount:-1}},{$limit:n},{$lookup:{
      from:'users',
      localField:'_id',foreighField:'_id',
      as:'user'
    }},
    {$unwind:"$user"},{
    $project:{_id:0,userId:"$user.userId",name:"$user.name",productCount:1}
    }
  ])
res.status(200).json({topNUsers})
    
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const expensiveProducts = async (req, res) => {
  try {
    const { n = 3 } = req.query;
    const topExpensiveProducts = await Product.aggregate([
      { $group: { _id: "userId", expensiveProducts: { $sum: "$price" } } },
      { $sort: { expensiveProducts: -1 } },
      { $limit: parseInt(n) },
    ]);
// Product.find().sort({price:-1}).limit(n).select({price:1,_id:0})

    res.status(200).json({
      msg: `Top ${n} expensive products are`,
      data: topExpensiveProducts,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
