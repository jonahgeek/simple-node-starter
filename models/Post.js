const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String
    },
    image: {
      type: String
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId
        }
      }
    ],
    comments: [
      {
        text: {
          type: String,
          required: true
        },
        name: {
          type: String
        }
      },
      {
        timestamps: true
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('post', PostSchema);
