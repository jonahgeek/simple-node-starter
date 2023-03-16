const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThreadSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId
    },
    desc: {
      type: String,
      required: true
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

module.exports = mongoose.model('thread', ThreadSchema);
