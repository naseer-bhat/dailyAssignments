import Product from "../models/Product.model.js";
import User from "../models/Product.model.js";
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

    const topUsers = await User.find()
      .populate("products")
      .sort({ "products.length": -1 })
      .limit(parseInt(n));
    res.status(200).json({
      msg: `Top ${n} users who have listed the most products are`,
      data: topUsers,
    });
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
    res.status(200).json({
      msg: `Top ${n} expensive products are`,
      data: topExpensiveProducts,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
