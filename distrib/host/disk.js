var TSOS;
(function (TSOS) {
    class Disk {
        trackCount;
        sectorCount;
        blockCount;
        blockSize;
        isFormatted;
        isFull;
        constructor(trackCount = 4, sectorCount = 8, blockCount = 8, blockSize = 64, isFormatted = false, isFull = false) {
            this.trackCount = trackCount;
            this.sectorCount = sectorCount;
            this.blockCount = blockCount;
            this.blockSize = blockSize;
            this.isFormatted = isFormatted;
            this.isFull = isFull;
            this.trackCount = trackCount;
            this.sectorCount = sectorCount;
            this.blockCount = blockCount;
            this.blockSize = blockSize;
            this.isFormatted = isFormatted;
            this.isFull = isFull;
        }
    }
    TSOS.Disk = Disk;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=disk.js.map