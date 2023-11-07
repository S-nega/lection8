const mongoose = require('mongoose')

const authorSchema = mongoose.Schema(
    {
        name: {
            type: String, 
            required: [true, "Please enter user name"]
        },
        surname: {
            type: String,
            required: [true, "Please enter user author"]
        }
        
    },
    {
        timestamps: true
    }
)

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;