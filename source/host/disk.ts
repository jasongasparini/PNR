module TSOS{

    export class Disk{
        
        constructor(public trackCount = 4, public sectorCount = 8, public blockCount = 8, public blockSize = 64, public isFormatted = false, public isFull = false){
            this.trackCount = trackCount;
            this.sectorCount = sectorCount;
            this.blockCount = blockCount;
            this.blockSize = blockSize;
            this.isFormatted = isFormatted;
            this.isFull = isFull;
        }
    }
}