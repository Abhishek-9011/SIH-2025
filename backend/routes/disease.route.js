import express from "express";
import { knowAboutDisease } from "../AI/gemini.js";
const router = express.Router();

router.post("/findDisease", knowAboutDisease);

export default router;
