import mongoose from "mongoose";

const Schema = mongoose.Schema;

const newsSchema = new Schema({
  amount: {
    type: Number
  },
  publishedNews: {
    type: [String],
    required: true
  }
});

export default mongoose.model('News', newsSchema);