const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date: October 10th(Originally downloaded on the 10th, Last modified October 18th)
 * Author: Norvin Lim
 *
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

IOhandler.unzip(zipFilePath, pathUnzipped)
  .then(() => IOhandler.readDir(pathUnzipped))
  .then(files =>
    Promise.all(files.map(file =>
      IOhandler.grayScale(file, path.join(pathProcessed, path.basename(file)))
    ))
  )
  .catch(console.error);
