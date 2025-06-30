import { Router } from "express";
const router = Router();
import {
  getPagination,
  topNSellers,
  expensiveProducts,
} from "../controllers/product.controller.js";

// router.post("/user/")
router.get("/products", getPagination);
router.get("/users/top-sellers", topNSellers);
router.get("/products/top-expensive", expensiveProducts);

export default router;
