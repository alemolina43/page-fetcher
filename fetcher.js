const args = process.argv.slice(2);
const fs = require('node:fs');
const needle = require('needle');



needle.get(args[0], (error, response, body) => {
  if (error) {
    console.log('error:', error);
  } // Print the error if one occurred
  if (response.statusCode !== 200) {
    console.log('statusCode:', response && response.statusCode);
  } // Print the response status code if a response was received
  if (!error) done(body);
});

const done = (body) => {
  fs.writeFile(args[1], body, err => {
    if (err) {
      console.error(err);
    } else {
      const fileSize = Buffer.byteLength(body, 'utf8');
      console.log(`Downloaded and saved ${fileSize} bytes to ${args[1]}`);
    }
  });
};