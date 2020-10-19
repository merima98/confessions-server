import Post from "./posts_model.js";

export async function create(req, res, next) {
  try {
    const post = await Post.create(req.body);
    res.status(201).send("Created!");
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function getConfessions(req, res, next) {
  try {
    const posts = await Post.find({});

    //vracanje:
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send(error);
  }
}
