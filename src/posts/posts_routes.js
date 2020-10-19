import express from "express";

import { create, getConfessions, rateConfession } from "./posts_controller.js";

const router = express.Router();

router.post("/", create);

router.get("/", getConfessions);

router.put("/:postId/:rate", rateConfession);

export default router;
