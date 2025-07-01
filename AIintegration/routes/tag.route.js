import { Router } from "express";
const router = Router();
import { createTag, getTags } from "../controllers/tag.controller.js";
router.post("/createtag", createTag);

router.get("/tags", getTags());

export default router;
