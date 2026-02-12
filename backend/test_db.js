const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

console.log('Testing MongoDB connection...');
console.log('URI:', uri.replace(/:([^:@]+)@/, ':****@')); // Hide password

mongoose.connect(uri)
    .then(() => {
        console.log('Successfully connected to MongoDB!');
        // List collections to verify read access
        mongoose.connection.db.listCollections().toArray((err, names) => {
            if (err) {
                console.log('Error listing collections:', err);
            } else {
                console.log('Collections:', names.map(c => c.name));
            }
            mongoose.disconnect();
        });
    })
    .catch(err => {
        console.error('Connection failed:', err);
        process.exit(1);
    });
