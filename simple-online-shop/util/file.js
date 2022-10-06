const fs = require("fs");

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("Deleting File Failed");
      throw err;
    }
  });
};

exports.deleteFile = deleteFile;
