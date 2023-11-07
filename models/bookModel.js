const mongoose = require('mongoose')

const bookSchema = mongoose.Schema(
    {
        name: {
            type: String, 
            required: [true, "Please enter user name"]
        },
        author: {
            type: String,
            required: [true, "Please enter user author"]
        },
        year: {
            type: Number,
            required: true,
        },
        
    },
    {
        timestamps: true
    }
)

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;