const mongoose = require('mongoose');

// Constructed from the previous shard URL: cluster0.m9jpcjz.mongodb.net
const uri = 'mongodb+srv://shoebalam440:svWcZYkMKqOqu3SF@cluster0.m9jpcjz.mongodb.net/?retryWrites=true&w=majority';

console.log('Testing SRV MongoDB connection...');
console.log('Target:', 'cluster0.m9jpcjz.mongodb.net');

mongoose.connect(uri)
    .then(() => {
        console.log('Successfully connected to MongoDB using SRV string!');
        process.exit(0);
    })
    .catch(err => {
        console.error('SRV Connection failed:', err.message);
        process.exit(1);
    });
