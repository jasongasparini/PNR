var TSOS;
(function (TSOS) {
    class DeviceDriverDisk extends TSOS.DeviceDriver {
        disk;
        constructor(disk = new TSOS.Disk()) {
            super();
            this.disk = disk;
            this.disk = disk;
            this.driverEntry = this.krnKbdDriverEntry;
        }
        krnKbdDriverEntry() {
            this.status = "loaded";
        }
        format() {
            let isFormatted = false;
            // console.log("something");
            try {
                for (let t = 0; t < this.disk.trackCount; t++) {
                    for (let s = 0; s < this.disk.sectorCount; s++) {
                        for (let b = 0; b < this.disk.blockCount; b++) {
                            sessionStorage.setItem(this.createStorageKey(t, s, b), this.emptyBlockInit());
                            // console.log("Format line");
                        }
                    }
                }
                isFormatted = true;
                this.disk.isFormatted = true;
            }
            catch (err) {
                console.log(err);
                isFormatted = false;
            }
            this.updateDiskTable();
            return isFormatted;
        }
        createFile(filename) {
            let created = false;
            let startingBlock = this.findFile(filename)[1];
            if (!startingBlock) {
                let fileKey = this.getNextDirBlockKey();
                // Get the next available data block and set it at the end of the file chain
                let nextKey = this.getNextDataBlockKey();
                this.setFinalDataBlock(nextKey);
                // Put the file name in the file block
                let file = sessionStorage.getItem(fileKey);
                sessionStorage.setItem(fileKey, TSOS.Utils.replaceAt(file, 5, TSOS.Utils.textToHex(filename)));
                // Put the key of the file starting block in the file meta data
                file = sessionStorage.getItem(fileKey);
                sessionStorage.setItem(fileKey, TSOS.Utils.replaceAt(file, 1, nextKey));
                created = true;
            }
            this.updateDiskTable();
            return created;
        }
        readFile(fileName) {
            let startingBlockKey = this.findFile(fileName)[1];
            let dataString = '';
            if (!startingBlockKey) {
                dataString = null;
            }
            else {
                let block = sessionStorage.getItem(startingBlockKey);
                let blockArray = block.split(':');
                let metaData = blockArray[0];
                let data = blockArray[1];
                dataString += this.readBlockData(data);
                // File contains more than 1 block cond
                if (metaData.slice(1, 4) != '---') {
                    let nextKey = metaData.slice(1, 4);
                    let nextData = sessionStorage.getItem(nextKey);
                    while (nextKey != '---') {
                        dataString += this.readBlockData(nextData.split(':')[1]);
                        nextKey = nextData.split(':')[0].slice(1, 4);
                        nextData = sessionStorage.getItem(nextKey);
                    }
                }
            }
            return dataString;
        }
        writeFile(fileName, input) {
            let startingBlockKey = this.findFile(fileName)[1];
            let returnMsg = '';
            if (!startingBlockKey) {
                returnMsg = 'does not exist';
            }
            else {
                // Retrieve block data
                let data = sessionStorage.getItem(startingBlockKey);
                // Clear file data
                if (this.doesBlockHaveData(data)) {
                    this.fullDeleteFile(fileName);
                    this.createFile(fileName);
                    startingBlockKey = this.findFile(fileName)[1];
                    data = sessionStorage.getItem(startingBlockKey);
                }
                if (input.length <= 60) {
                    sessionStorage.setItem(startingBlockKey, '1---:' + this.writeDataToBlock(data, input));
                }
                else {
                    // Splits the input into an array, with each element having a max length of 60
                    let inputArr = input.match(/.{1,60}/g);
                    let currKey = startingBlockKey;
                    // Loops through all input segments
                    for (let i = 0; i < inputArr.length; i++) {
                        let nextKey;
                        data = sessionStorage.getItem(currKey);
                        if (i == inputArr.length - 1) {
                            sessionStorage.setItem(currKey, '1---:' + this.writeDataToBlock(data, inputArr[i]));
                        }
                        else {
                            nextKey = this.getNextDataBlockKey();
                            if (nextKey) {
                                sessionStorage.setItem(currKey, '1' + nextKey + ':' + this.writeDataToBlock(data, inputArr[i]));
                            }
                            else {
                                returnMsg = 'no more data';
                                this.disk.isFull = true;
                                _OsShell.shellKillAll(null);
                                _StdOut.advanceLine();
                                _StdOut.putText('ERR: Disk is full.');
                                _StdOut.advanceLine();
                                _OsShell.putPrompt();
                                break;
                            }
                        }
                        currKey = nextKey;
                    }
                }
                returnMsg = 'y';
            }
            this.updateDiskTable();
            return returnMsg;
        }
        copyFile(fileName, newName) {
            let returnMsg = '';
            if (this.findFile(fileName)[0]) {
                let isCreated = this.createFile(newName);
                if (isCreated) {
                    let fileData = this.readFile(fileName);
                    let msg = this.writeFile(newName, fileData);
                    if (msg == 'success') {
                        returnMsg = 'success';
                    }
                }
                else {
                    returnMsg = 'new file exists';
                }
            }
            else {
                returnMsg = 'no existing file';
            }
            this.updateDiskTable();
            return returnMsg;
        }
        deleteFile(fileName) {
            let key = this.findFile(fileName)[0];
            let isDeleted = false;
            if (key) {
                sessionStorage.setItem(key, this.emptyBlockInit());
                isDeleted = true;
            }
            this.updateDiskTable();
            return isDeleted;
        }
        fullDeleteFile(fileName) {
            let startingBlockKey = this.findFile(fileName)[1];
            if (startingBlockKey) {
                let block = sessionStorage.getItem(startingBlockKey);
                let blockArray = block.split(':');
                let metaData = blockArray[0];
                sessionStorage.setItem(startingBlockKey, this.emptyBlockInit());
                let nextKey = metaData.slice(1, 4);
                let nextData = sessionStorage.getItem(nextKey);
                // Clears until last block
                while (nextKey != '---') {
                    sessionStorage.setItem(nextKey, this.emptyBlockInit());
                    nextKey = nextData.split(':')[0].slice(1, 4);
                    nextData = sessionStorage.getItem(nextKey);
                }
                this.deleteFile(fileName);
            }
        }
        renameFile(fileName, newName) {
            let returnMsg = '';
            let key = this.findFile(fileName)[0];
            let otherKey = this.findFile(newName)[0];
            if (key && !otherKey) {
                let data = sessionStorage.getItem(key);
                sessionStorage.setItem(key, TSOS.Utils.replaceAt(data, 5, '0'.repeat(60)));
                data = sessionStorage.getItem(key);
                sessionStorage.setItem(key, TSOS.Utils.replaceAt(data, 5, TSOS.Utils.textToHex(newName)));
                returnMsg = 'success';
            }
            else if (!key) {
                returnMsg = 'no file';
            }
            else if (otherKey) {
                returnMsg = 'name taken';
            }
            this.updateDiskTable();
            return returnMsg;
        }
        findFile(fileName) {
            let startingBlockKey = null;
            let fileArray = [];
            directorySearch: for (let t = 0; t < 1; t++) {
                for (let s = 0; s < this.disk.sectorCount; s++) {
                    for (let b = 0; b < this.disk.blockCount; b++) {
                        let potentialKey = this.createStorageKey(t, s, b);
                        let dataArray = sessionStorage.getItem(potentialKey).split(":");
                        if (dataArray) {
                            let metaData = dataArray[0];
                            let fileData = this.trimData(dataArray[1]);
                            let isUsed = this.checkIfInUse(metaData);
                            if (isUsed && this.readBlockData(fileData) == (TSOS.Utils.textToHex(fileName))) {
                                startingBlockKey = metaData.slice(1, 4);
                                // Directory key
                                fileArray.push(potentialKey);
                                // Starting block key
                                fileArray.push(metaData.slice(1, 4));
                                break directorySearch;
                            }
                        }
                    }
                }
            }
            return fileArray;
        }
        getAllFiles() {
            let files = [];
            for (let t = 0; t < 1; t++) {
                for (let s = 0; s < this.disk.sectorCount; s++) {
                    for (let b = 0; b < this.disk.blockCount; b++) {
                        let file = sessionStorage.getItem(this.createStorageKey(t, s, b));
                        if (file && this.checkIfInUse(file)) {
                            let fileName = TSOS.Utils.hexToText(this.readBlockData(file.split(':')[1]));
                            files.push(fileName);
                        }
                    }
                }
            }
            return files;
        }
        writeDataToBlock(block, data) {
            let blockArray = block.split(':');
            let blockData = blockArray[1].match(/.{1,2}/g);
            let dataArray = data.match(/.{1,2}/g);
            for (let i = 0; i < dataArray.length; i++) {
                blockData[i] = dataArray[i];
            }
            return (blockData.join(''));
        }
        readBlockData(data) {
            let hexCodesArray = data.match(/.{1,2}/g);
            let result = '';
            let i = 0;
            while (i < hexCodesArray.length) {
                result += hexCodesArray[i];
                i++;
            }
            return result;
        }
        createSwapFile(pid, data) {
            let fileName = '.swap' + pid;
            this.createFile(fileName);
            this.writeFile(fileName, data);
        }
        deleteSwapFile() {
        }
        checkIfInUse(data) {
            let isUsed = false;
            let dataArray = data.split("");
            if (dataArray[0] === "1") {
                isUsed = true;
            }
            return isUsed;
        }
        setUseStatus(key, Use) {
            let data = sessionStorage.getItem(key);
            if (data) {
                if (Use) {
                    sessionStorage.setItem(key, TSOS.Utils.replaceAt(data, 0, "1"));
                }
                else {
                    sessionStorage.setItem(key, TSOS.Utils.replaceAt(data, 0, "0"));
                }
            }
        }
        getNextDataBlockKey() {
            let nextKey = "";
            blockSearch: for (let t = 1; t < this.disk.trackCount; t++) {
                for (let s = 0; s < this.disk.sectorCount; s++) {
                    for (let b = 0; b < this.disk.blockCount; b++) {
                        let potentialKey = this.createStorageKey(t, s, b);
                        let block = sessionStorage.getItem(potentialKey);
                        if (block && this.isBlockInUse(block)) {
                            nextKey = potentialKey;
                            this.setUseStatus(nextKey, true);
                            // we found an empty block, so break from the routine
                            break blockSearch;
                        }
                    }
                }
            }
            return nextKey;
        }
        setFinalDataBlock(key) {
            let data = sessionStorage.getItem(key);
            if (data) {
                let tempData = data;
                for (let i = 1; i < 4; i++) {
                    sessionStorage.setItem(key, TSOS.Utils.replaceAt(tempData, i, "-"));
                    tempData = sessionStorage.getItem(key);
                }
            }
        }
        getNextDirBlockKey() {
            let nextKey = "";
            directorySearch: for (let t = 0; t < 1; t++) {
                for (let s = 0; s < this.disk.sectorCount; s++) {
                    for (let b = 0; b < this.disk.blockCount; b++) {
                        let potentialKey = this.createStorageKey(t, s, b);
                        // Skip the master boot record
                        if (potentialKey == "000") {
                            continue;
                        }
                        let block = sessionStorage.getItem(potentialKey);
                        if (block && this.isBlockInUse(block)) {
                            nextKey = potentialKey;
                            this.setUseStatus(nextKey, true);
                            // we found an empty block, so break from the routine
                            break directorySearch;
                        }
                    }
                }
            }
            return nextKey;
        }
        isBlockInUse(block) {
            return (block.charAt(0) == "0");
        }
        doesBlockHaveData(block) {
            return block.split(':')[1] != '0'.repeat(60);
        }
        emptyBlockInit() {
            return "0".repeat(4) + ":" + "0".repeat(this.disk.blockSize - 4);
        }
        createStorageKey(track, sector, block) {
            return track.toString() + sector.toString() + block.toString();
        }
        updateDiskTable() {
            const table = document.getElementById("disk-table");
            // Deletes the rows before updating
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }
            for (let t = 0; t < _krnDiskDriver.disk.trackCount; t++) {
                for (let s = 0; s < _krnDiskDriver.disk.sectorCount; s++) {
                    for (let b = 0; b < _krnDiskDriver.disk.blockCount; b++) {
                        const row = table.insertRow(-1);
                        const tsb = row.insertCell(0);
                        const inUse = row.insertCell(1);
                        const next = row.insertCell(2);
                        const data = row.insertCell(3);
                        inUse.style.borderRight = "1px solid white";
                        next.style.borderRight = "1px solid white";
                        let block = sessionStorage.getItem(_krnDiskDriver.createStorageKey(t, s, b));
                        let blockArr = block.split(':');
                        tsb.innerHTML = _krnDiskDriver.createStorageKey(t, s, b);
                        tsb.style.backgroundColor = "#FF0000";
                        tsb.style.borderRadius = "18px";
                        inUse.innerHTML = blockArr[0].slice(0, 1);
                        next.innerHTML = blockArr[0].slice(1, 4);
                        data.innerHTML = blockArr[1].toUpperCase();
                    }
                }
            }
        }
        trimData(data) {
            let dataArray = data.match(/.{1,2}/g);
            let i = 0;
            let result = '';
            while (i < dataArray.length) {
                if (dataArray[i] != '00') {
                    result += dataArray[i];
                }
                else {
                    break;
                }
                i++;
            }
            return result;
        }
    }
    TSOS.DeviceDriverDisk = DeviceDriverDisk;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=deviceDriverDisk.js.map