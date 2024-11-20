const path = require("path");
const fs = require("fs");
let filename = "file";
//Creating the folder with random JSON Files
function makeDirectory() {
    return new Promise((resolve, reject) => {
        fs.mkdir(path.join(__dirname, "Test Folder",), { recursive: true }, (err) => {
            if (err) {
                reject("Error occured while creating the folder..!");
            }
            else {
                resolve("Folder Created Successfully..!");
            }
        })

    })
}
function makeAll(itr) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let data = {
                filename: `${filename}${itr}.json`,
                content: `My name is ${filename}${itr}.json`
            };
            fs.writeFile(`./Test Folder/${filename}${itr + 1}.json`, JSON.stringify(data), (err) => {
                if (err) {
                    reject(`Error while Creating the file ${itr + 1}`)
                }
                else {
                    resolve(`File ${itr + 1} created Successfully..!`)
                }
            })

        }, 1000 * (2 * itr - 1));
    })
}
function removeFile(itr) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fs.unlink(`./Test Folder/${filename}${itr + 1}.json`, (err) => {
                if (err) {
                    reject(`Error while deleting the file${itr + 1}`);
                }
                else {
                    resolve(`File ${itr + 1} deleted successfully..!`);
                }
            })
        }, 1000 * (2 * itr + 1));

    })
}
function makeFiles() {
    const promises = [];
    for (let itr = 0; itr < 5; itr++) {
        promises.push(makeAll(itr));
        promises.push(removeFile(itr))
    }
    return Promise.all(promises);
}
function removeDirectory() {
    return new Promise((resolve, reject) => {
        fs.rmdir("Test Folder", (err) => {
            if (err) {
                reject("Error while removeing the Directory..!");
            }
            else {
                resolve("Folder removed successfully..!");
            }
        })
    })
}

makeDirectory()
    .then((result) => {
        console.log(result);
        return makeFiles();
    })
    .then(result => {
        console.log(result)
        return removeDirectory();
    })
    .then((result) => console.log(result))
    .catch((error) => console.log(error));