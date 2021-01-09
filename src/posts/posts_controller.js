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
    console.log("Query, ", req.query);
    console.log("Parrams, ", req.params);

    const options = {
      page: Number(req.query.page) || 0,
      limit: Number(req.query.limit) || 10,
    };
    let posts;
    let sortNumber = req.query.sort;

    if (sortNumber === "0") {
      posts = await Post.find({})
        .sort({ date: "desc" })
        .skip(options.page * options.limit)
        .limit(options.limit);
    }
    if (sortNumber === "1") {
      //random
      posts = await Post.find({})
        .skip(options.page * options.limit)
        .limit(options.limit);

      posts = shuffle(posts);
    }
    if (sortNumber === "2") {
      posts = await Post.find({})
        .sort({ totalUpvotes: "desc" })
        .skip(options.page * options.limit)
        .limit(options.limit);
    }
    if (sortNumber === "3") {
      posts = await Post.find({})
        .sort({ totalDownvotes: "desc" })
        .skip(options.page * options.limit)
        .limit(options.limit);
    }

    if (
      sortNumber !== "0" &&
      sortNumber !== "1" &&
      sortNumber !== "2" &&
      sortNumber !== "3"
    ) {
      throw Error();
    }
    const count = await Post.find().countDocuments();

    const pagination = {
      current_page: options.page,
      total_item_count: count,
      total_page: parseInt(count / options.limit),
      next: {
        page: (options.page += 1),
      },
    };
    res.status(200).send({
      message: "Fetched posts successfully",
      posts,
      pagination,
      sortNumber,
    });
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

export async function rateConfession(req, res, next) {
  try {
    const postId = req.query.postId;
    const rate = req.query.rate;
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
