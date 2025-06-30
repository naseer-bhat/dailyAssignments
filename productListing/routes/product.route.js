import { Router } from "express";
const router = Router();
import {
  getPagination,
  topNSellers,
  expensiveProducts,
  getUsers
} from "../controllers/product.controller.js";

router.post("/user/" ,getUsers)
router.get("/products", getPagination);
router.get("/users/top-sellers", topNSellers);
router.get("/products/top-expensive", expensiveProducts);

export default router;
