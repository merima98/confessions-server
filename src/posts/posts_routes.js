import express from "express";

import {
  create,
  getConfessions,
  rateConfession,
  getFilteredConfessions,
} from "./posts_controller.js";

const router = express.Router();

router.post("/", create); //Adding a new confession

router.get("/", getConfessions); //Get confessions in order of addition

router.get("/sort/:filter", getFilteredConfessions); //Return confessions depending on the filter: 1 - random; 2 - upvotes; 3 - downvotes; 4 - latest (by date);

router.put("/:postId/:rate", rateConfession); //Upvote or Downvote

export default router;
