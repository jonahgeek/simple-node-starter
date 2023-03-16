const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId
    },
    date_of_birth: {
      type: Date
    },
    location_status: {
      type: String,
      enum: ['My Friends', 'Everyone', 'Nobody']
    },
    contact_status: {
      type: String,
      enum: ['My Friends', 'Everyone', 'Nobody']
    },
    places: [
      {
        name: {
          type: String
        },
        location: {
          type: String
        }
      }
    ],
    blocked: [
      {
        user: {
          type: Schema.Types.ObjectId
        }
      }
    ],
    business_name: {
      type: String
    },
    profession: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('profile', ProfileSchema);
