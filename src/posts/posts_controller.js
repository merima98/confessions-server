import Post from "./posts_model.js";

export async function create(req, res, next) {
  try {
    const post = await Post.create(req.body);
  } catch (error) {
    res.status(400).send(error);
  }
}
