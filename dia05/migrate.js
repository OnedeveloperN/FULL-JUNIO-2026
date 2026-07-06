const csv = require('csv-parser');
const fs = require('fs');
const connectDB = require('../db');
const User = require('../models/User');
const result = [];

connectDB();    

fs.createReadStream('users.csv')
  .pipe(csv({ separator: ',' }))
  .on('data', (data) => result.push(data))
  .on('end', () => {
    result.forEach(async (userData) => {
        const { name, email, password } = userData;
        const user = new User({ name, email, password });
        try {
            await newUser.save();
        } catch (error) {
            console.error(`Error saving user ${name}:`, error.message);
        }
  });
 });



