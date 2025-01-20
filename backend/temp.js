const fs = require('fs');

// Read the .env file
const envContent = fs.readFileSync('.env', 'utf-8');

// Replace values with placeholders
const exampleContent = envContent.replace(/=.*/g, '=');

// Write to env.example
fs.writeFileSync('env.example', exampleContent);

console.log('env.example file created successfully.');
