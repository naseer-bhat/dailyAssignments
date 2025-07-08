import { createTag, getTags } from "../controllers/tag.controller.js";
import { Router } from "express";
const router = Router();
router.post("/createtag", createTag);

router.get("/tags", getTags);

export default router;
