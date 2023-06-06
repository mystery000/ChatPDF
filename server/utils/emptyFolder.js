const path = require('path');
const fs = require('fs');

const emptyFolder = async (folderPath) => {
    try {
        if(fs.existsSync(path.resolve(folderPath))) {
            fs.rmSync(path.resolve(folderPath), { recursive: true, force: true });
            console.log(`'${folderPath}' has been removed successfully!`);
        } else {
            console.log(`'${folderPath}' does not exist!`);
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = emptyFolder;
