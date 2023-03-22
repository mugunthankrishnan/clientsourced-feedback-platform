const mongoose = require('mongoose');
const { Schema } = mongoose; 
// ES2015 => destructuring 
// The mongoose object has a property called Schema.
//Take that property and assign to a new variable called Schema. This is the purpose of curly braces here.
// A collection schema for the users and the fields in that.
const userSchema = new Schema({
    googleId: String
});

//Create a new mongoose model class to create the new collection.

mongoose.model('users', userSchema);
// Arg 1 - Collection name.
// Arg 2 - The schema of the collection which is userSchema.
// Mongoose does not create or overwrite schema everytime. It creates only one time.