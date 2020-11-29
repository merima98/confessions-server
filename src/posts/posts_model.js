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
    default: 1,
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
