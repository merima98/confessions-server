import express from "express";

import {
  create,
  getConfessions,
  rateConfession,
  getFilteredConfessions,
} from "./posts_controller.js";

const router = express.Router();

router.post("/", create);

router.get("/", getConfessions); //Get confessions in order of addition

router.get("/sort/:filter", getFilteredConfessions);

router.put("/:postId/:rate", rateConfession);

export default router;
