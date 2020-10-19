import Post from "./posts_model.js";

const ITEMS_PER_PAGE = 10;

export async function create(req, res, next) {
  try {
    const post = await Post.create(req.body);
    res.status(201).send("Created!");
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function getConfessions(req, res, next) {
  //dodavanje paginacije
  const currentPage = req.query.page || 1;

  try {
    const totalPosts = await Post.find({ approved: 1 }).countDocuments();

    const posts = await Post.find({ approved: 1 })
      .skip((currentPage - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE); //only approved posts

    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send(error);
  }
}
export async function rateConfession(req, res, next) {
  try {
    const postId = req.params.postId;
    const rate = req.params.rate;
    const post = await Post.findById(postId);
    if (rate === "0") {
      //negative
      post.totalDownvotes += 1;
      await post.save();
      res.status(200).send(post);
    } else if (rate === "1") {
      //positive
      post.totalUpvotes += 1;
      await post.save();
      res.status(200).send(post);
    }
  } catch {
    const error = new Error("Needed to enter/click right value");
    res.status(400).send(error);
  }
}
