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
  try {
    const options = {
      page: Number(req.query.page) || 0,
      limit: Number(req.query.page) || 10,
    };

    const posts = await Post.find({ approved: 1 })
      .skip(options.page * options.limit)
      .limit(options.limit); //only approved posts

    const count = await Post.find({ approved: 1 }).countDocuments();

    const pagination = {
      current_page: options.page,
      total_item_count: count,
      total_page: parseInt(count / options.limit),
      next: {
        page: (options.page += 1),
      },
    };

    res
      .status(200)
      .send({ message: "Fetched posts successfully", posts, pagination });
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function getFilteredConfessions(req, res, next) {
  const filter = req.params.filter;
  try {
    const options = {
      page: Number(req.query.page) || 0,
      limit: Number(req.query.page) || 10,
    };

    if (filter === "4") {
      const posts = await Post.find({ approved: 1 })
        .sort({ date: "desc" })
        .skip(options.page * options.limit)
        .limit(options.limit); //only approved posts

      const count = await Post.find({ approved: 1 }).countDocuments();

      const pagination = {
        current_page: options.page,
        total_item_count: count,
        total_page: parseInt(count / options.limit),
        next: {
          page: (options.page += 1),
        },
      };
      res
        .status(200)
        .send({ message: "Fetched posts successfully", posts, pagination });
    }
  } catch {
    const error = new Error("Needed to enter/click right value");
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
    res.status(404).send(error);
  }
}
