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
        readFile() {
        }
        writeFile() {
        }
        copyFile() {
        }
        deleteFile() {
        }
        fullDeleteFile() {
        }
        renameFile() {
        }
        findFile(fileName) {
            let startingBlockKey = null;
            let fileArr = [];
            directorySearch: for (let t = 0; t < 1; t++) {
                for (let s = 0; s < this.disk.sectorCount; s++) {
                    for (let b = 0; b < this.disk.blockCount; b++) {
                        let potentialKey = this.createStorageKey(t, s, b);
                        let dataArr = sessionStorage.getItem(potentialKey).split(":");
                        if (dataArr) {
                            let metaData = dataArr[0];
                            let fileData = this.trimData(dataArr[1]);
                            let isUsed = this.checkIfInUse(metaData);
                            if (isUsed && this.readBlockData(fileData) == (TSOS.Utils.textToHex(fileName))) {
                                startingBlockKey = metaData.slice(1, 4);
                                // directory key
                                fileArr.push(potentialKey);
                                // starting block key
                                fileArr.push(metaData.slice(1, 4));
                                break directorySearch;
                            }
                        }
                    }
                }
            }
            return fileArr;
        }
        getAllFiles() {
        }
        writeDataToBlock() {
        }
        readBlockData(data) {
            let hexCodesArr = data.match(/.{1,2}/g);
            let res = '';
            let i = 0;
            while (i < hexCodesArr.length) {
                res += hexCodesArr[i];
                i++;
            }
            return res;
        }
        createSwapFile() {
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
                        tsb.style.backgroundColor = "#087098";
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