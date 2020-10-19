import express from "express";

import { create, getConfessions } from "./posts_controller.js";

const router = express.Router();

router.post("/", create);

router.get("/", getConfessions);

//ekspotrovanje
export default router;
