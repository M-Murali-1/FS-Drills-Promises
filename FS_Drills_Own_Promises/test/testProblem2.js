const fs = require("fs");
const { resolve } = require("path");
function readData(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if (err) {
                reject("Error while reading the file..!");
            }
            else {
                resolve(data);
            }
        })
    })
}
function writeData(file, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) {
                reject("Error while writing into the file..!");
            }
            else {
                resolve();
            }
        })
    })
}

function appendData(file, data) {
    return new Promise((resolve, reject) => {
        fs.appendFile(file, data, (err) => {
            if (err) {
                reject("Error while appending into the file..!");
            }
            else {
                resolve();
            }
        })
    })
}

function unlinkFile(file) {
    return new Promise((resolve, reject) => {
        fs.unlink(file, (err) => {
            if (err) {
                reject("Error while removing the file..!");
            }
            else {
                resolve(`${file} is removed..!`);
            }
        })
    })
}
readData("lipsum.txt")
    .then(result => {
        console.log("Step-1 Successful..!");
        let upperCase = result.toUpperCase();
        return writeData("uppercase.txt", upperCase);
    })
    .then(() => {
        return writeData("filenames.txt", "uppercase.txt\n");
    })
    .then(() => {
        console.log("Step-2 successful..!");
        return readData("uppercase.txt");
    })
    .then((result) => {
        let lowerCase = result.toLowerCase();
        let splittedArray = lowerCase.split(".");
        let splittedSentences = splittedArray.join("\n");
        return writeData("lowercase.txt", splittedSentences);
    })
    .then(() => {
        return appendData("filenames.txt", "lowercase.txt\n");

    })
    .then(() => {
        console.log("Step-3 successful..!");
        return readData("lowercase.txt");
    })
    .then((result) => {
        let dataGiven = result.split("\n");
        let sortedData = dataGiven.sort().join("\n");
        return writeData("sortedfile.txt", sortedData);
    })
    .then(() => {
        return appendData("filenames.txt", "sortedfile.txt\nfilenames.txt");
    })
    .then(() => {
        console.log("Step-4 successful..!");
        return readData("filenames.txt");
    })
    .then((result) => {
        let filenames = result.split("\n");
        const promises = [];
        filenames.forEach((element) => {
            promises.push(unlinkFile(element));
        })
        return Promise.all(promises);
    })
    .then((data) => {
        console.log("Step-5 successful..!");
    })

    .catch(error => {
        console.log(error);
    })
