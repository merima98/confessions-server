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
    const options = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.page) || 10,
    };

    const posts = await Post.find({ approved: 1 }) //only approved posts
      .skip(req.params.page * options.limit)
      .limit(options.limit);

    const count = await Post.find({ approved: 1 }).countDocuments();

    const pagination = {
      current_page: req.params.page,
      total_item_count: count,
      total_page: parseInt(count / options.limit),
      next: {
        page: (req.params.page += 1),
      },
    };
    res
      .status(200)
      .send({ message: "Fetched posts successfully", posts, pagination });
  } catch (error) {
    res.status(400).send(error);
  }
}

function shuffle(array) {
  const result = [];
  const source = array.concat([]);

  while (source.length) {
    let index = Math.floor(Math.random() * source.length);
    result.push(source.splice(index, 1)[0]);
  }

  return result;
}

export async function getFilteredConfessions(req, res, next) {
  const filter = req.params.filter;
  try {
    const options = {
      page: Number(req.params.page) || 0,
      limit: Number(req.query.page) || 10,
    };

    const count = await Post.find({ approved: 1 }).countDocuments();
    let posts;

    if (filter === "1") {
      posts = await Post.find({ approved: 1 }) //only approved posts
        .skip(req.params.page * options.limit)
        .limit(options.limit);

      posts = shuffle(posts);
    }
    if (filter === "2") {
      //filter per upvotes
      posts = await Post.find({ approved: 1 }) //only approved posts
        .sort({ totalUpvotes: "desc" })
        .skip(req.params.page * options.limit)
        .limit(options.limit);
    }
    if (filter === "3") {
      //filter per upvotes
      posts = await Post.find({ approved: 1 }) //only approved posts
        .sort({ totalDownvotes: "desc" })
        .skip(req.params.page * options.limit)
        .limit(options.limit);
    }
    if (filter === "4") {
      // filter per lates posts - date
      posts = await Post.find({ approved: 1 }) //only approved posts
        .sort({ date: "desc" })
        .skip(req.params.page * options.limit)
        .limit(options.limit);
    }
    if (filter !== "4" && filter !== "2" && filter !== "3" && filter !== "1") {
      throw Error();
    }
    const pagination = {
      current_page: req.params.page,
      total_item_count: count,
      total_page: parseInt(count / options.limit),
      next: {
        page: parseInt(req.params.page) + parseInt(1),
      },
    };
    res
      .status(200)
      .send({ message: "Fetched posts successfully", posts, pagination });
  } catch (err) {
    res.status(400).send({ message: "Needed to enter/click right value", err });
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
