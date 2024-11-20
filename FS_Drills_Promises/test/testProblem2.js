const fsPromise = require("fs").promises;

fsPromise.readFile("lipsum.txt","utf-8")
.then((data)=>{
    console.log("Step-1 Successful..!");
    let upperCase = data.toUpperCase();
    return fsPromise.writeFile("uppercase.txt",upperCase);
})
.then(()=>{
    return fsPromise.writeFile("filenames.txt","uppercase.txt\n");
})
.then(()=>{
    console.log("Step-2 successful..!");
    return fsPromise.readFile("uppercase.txt","utf-8");
})
.then((data)=>{
    let lowerCase = data.toLowerCase();
    let splittedArray = lowerCase.split(".");
    let splittedSentences = splittedArray.join("\n");
    return fsPromise.writeFile("lowercase.txt",splittedSentences);
})
.then(()=>{
    return fsPromise.appendFile("filenames.txt","lowercase.txt\n");
    
})
.then(()=>{
    console.log("Step-3 successful..!");
    return fsPromise.readFile("lowercase.txt","utf-8");
})
.then((data)=>{
    let dataGiven = data.split("\n");
    let sortedData = dataGiven.sort().join("\n");
   return fsPromise.writeFile("sortedfile.txt",sortedData);
})
.then(()=>{
    return fsPromise.appendFile("filenames.txt","sortedfile.txt\nfilenames.txt");
})
.then(()=>{
    console.log("Step-4 successful..!");
    return fsPromise.readFile("filenames.txt","utf-8");
})
.then((data)=>{
    let filenames = data.split("\n");
    filenames.forEach((element)=>{
        return fsPromise.unlink(element);
    })
})
.then(()=>{
    console.log("Step-5 successful..!");
})
.catch(err=>{
    console.log("Error occured in the process..!");
    
})
