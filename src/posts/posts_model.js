import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  body: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: () => Date.now(),
  },
  approved: {
    type: Number,
    default: 2, //0 - rejected | 1 - approved | 2 - on hold
  },
  totalUpvotes: {
    type: Number,
    default: 0,
  },
  totalDownvotes: {
    type: Number,
    default: 0,
  },
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
