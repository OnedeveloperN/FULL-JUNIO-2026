const csv = require('csv-parser');
const fs = require('fs');
const connectDB = require('../db');
const User = require('../models/User');
const result = [];

connectDB();    

