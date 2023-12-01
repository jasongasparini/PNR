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
            try {
                for (let t = 0; t < this.disk.trackCount; t++) {
                    for (let s = 0; s < this.disk.sectorCount; s++) {
                        for (let b = 0; b < this.disk.blockCount; b++) {
                            sessionStorage.setItem(this.createStorageKey(t, s, b), this.emptyBlockInit());
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
        emptyBlockInit() {
            return "0".repeat(4) + ":" + "0".repeat(this.disk.blockSize - 4);
        }
        createStorageKey(track, sector, block) {
            return track.toString() + sector.toString() + block.toString();
        }
        updateDiskTable() {
            // Updates all cell values in the disk table
            const table = document.getElementById("disk-table");
            // delete all rows first...
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }
            for (let t = 0; t < _krnDiskDriver.disk.trackCtn; t++) {
                for (let s = 0; s < _krnDiskDriver.disk.sectorCnt; s++) {
                    for (let b = 0; b < _krnDiskDriver.disk.blockCnt; b++) {
                        // console.log(sessionStorage.getItem(_krnDiskDriver.createStorageKey(t, s, b)));
                        const row = table.insertRow(-1);
                        const tsb = row.insertCell(0);
                        const inUse = row.insertCell(1);
                        const next = row.insertCell(2);
                        const data = row.insertCell(3);
                        // inUse.style.borderLeft = "1px solid white";
                        inUse.style.borderRight = "1px solid white";
                        next.style.borderRight = "1px solid white";
                        let block = sessionStorage.getItem(_krnDiskDriver.createStorageKey(t, s, b));
                        let blockArr = block.split(':');
                        tsb.innerHTML = _krnDiskDriver.createStorageKey(t, s, b);
                        tsb.style.backgroundColor = "#087098";
                        tsb.style.borderRadius = "15px";
                        inUse.innerHTML = blockArr[0].slice(0, 1);
                        next.innerHTML = blockArr[0].slice(1, 4);
                        data.innerHTML = blockArr[1].toUpperCase();
                    }
                }
            }
        }
    }
    TSOS.DeviceDriverDisk = DeviceDriverDisk;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=deviceDriverDisk.js.map