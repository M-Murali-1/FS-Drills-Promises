const fsPromise = require("fs").promises;
const path = require("path");
const fs = require("fs");
let filename = "file";
//Creating the folder with random JSON Files

fsPromise.mkdir(path.join(__dirname, "Test Folder"))
    .then(() => console.log("Folder Created Successfully..!"))
    .catch((error) => console.log("Error occured while creating the folder..!"));

for (let itr = 0; itr < 5; itr++) {
    setTimeout(() => {
        let data = {
            filename: `${filename}${itr}.json`,
            content: `My name is ${filename}${itr}.json`
        };
        fs.promises.writeFile(`./Test Folder/${filename}${itr + 1}.json`, JSON.stringify(data))
            .then(() => console.log(`File ${itr + 1} created Successfully..!`))
            .catch(error => console.log(`Error while Creating the file ${itr + 1}`))
    }, 1000 * (2 * itr - 1));

    setTimeout(() => {
        fsPromise.unlink(`./Test Folder/${filename}${itr + 1}.json`)
            .then(() => console.log(`File ${itr + 1} deleted successfully..!`))
            .catch((error) => console.log(`Error while deleting the file${itr + 1}`));
    }, 1000 * (2 * itr + 1));
}
setTimeout(() => {
    fsPromise.rmdir("Test Folder")
        .then(() => {
            console.log("Folder deleted successfully..!");
        })
        .catch(err => {
            console.log("Error while deleting the file..!");

        })

}, 12000)
