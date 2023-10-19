/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: October 10th(Originally downloaded on the 10th, Last modified October 18th)
 * Author: Norvin Lim
 *
 */

const { rejects } = require("assert");

const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathIn)
      .pipe(unzipper.Extract({ path: pathOut }))
      .on('close', () => {
        resolve("Extraction operation complete");
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};


/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */

const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) reject(err);
      else resolve(files.filter(file => path.extname(file).toLowerCase() === '.png').map(file => path.join(dir, file)));
    });
  });
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
  fs.createReadStream(pathIn)
    .pipe(new PNG())
    .on('parsed', function() {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          let idx = (this.width * y + x) << 2;
          let grayscale = this.data[idx] * .3 + this.data[idx+1] * .59 + this.data[idx+2] * .11;
          this.data[idx] = grayscale;
          this.data[idx+1] = grayscale;
          this.data[idx+2] = grayscale;
        }
      }
      this.pack().pipe(fs.createWriteStream(pathOut));
    })
    .on('close', () => resolve(`Grayscale conversion complete for ${pathIn}`))
    .on('error', reject);}
    );
  };

module.exports = {
  unzip,
  readDir,
  grayScale,
};
