import express from "express";

import { create } from "./posts_controller.js";

const router = express.Router();

router.post("/", create);

//ekspotrovanje
export default router;
