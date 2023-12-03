/* ----------------------------------
   memoryManager.ts

   Memory Manager

   10/9/2023 - This has not been built out yet as there is only one segment
                of memory to allocate and de-allocate. I will be building out
                this component once more memory segments are added. (Next project)
   ---------------------------------- */

   module TSOS {
    export class MemoryManager {
        public segmentOneOccupied: boolean = false;
        public segmentTwoOccupied: boolean = false;
        public segmentThreeOccupied: boolean = false;
        public memoryFull: boolean = false;
        public currentSegment: number = 1

        constructor() {
            
        }

        public getNextSegment(): number{
            if(this.currentSegment == 1){
                if(this.segmentOneOccupied == false){
                    this.currentSegment++;
                    this.segmentOneOccupied = true;
                    return 1;
                }
                else if(this.segmentOneOccupied && this.segmentTwoOccupied == false && this.segmentThreeOccupied == false){
                    this.currentSegment++;
                } 
                else if(this.segmentOneOccupied && this.segmentTwoOccupied && this.segmentThreeOccupied){
                    _PcbList[_PidCounter-3].state = "Terminated";
                    this.clearSegment(1);
                    this.currentSegment++;
                    return 1;
                }
            }

            else if(this.currentSegment == 2){
                if(this.segmentTwoOccupied == false){
                    this.currentSegment++;
                    this.segmentTwoOccupied = true;
                    return 2;
                }
                else if(this.segmentTwoOccupied && this.segmentThreeOccupied == false){
                    this.currentSegment++;
                }
                else if(this.segmentTwoOccupied && this.segmentThreeOccupied){
                    _PcbList[_PidCounter-3].state = "Terminated";
                    this.clearSegment(2);
                    this.currentSegment++;
                    return 2;
                }
            }

            else if(this.currentSegment == 3){
                if(this.segmentThreeOccupied == false){
                    this.currentSegment = 1;
                    this.segmentThreeOccupied = true;
                    this.memoryFull = true;
                    return 3;
                }
                else if(this.segmentThreeOccupied){
                    _PcbList[_PidCounter-3].state = "Terminated";
                    this.clearSegment(3);
                    this.currentSegment = 1;
                    return 3;
                }
            }
        }

        public clearSegment(segment: number): void{
            if(segment == 1){
                for(let i = 0; i < 256; i++){
                    _MemoryAccessor.writeMemory(i, 0x00);
                }
            }
            else if(segment == 2){
                for(let i = 256; i < 512; i++){
                    _MemoryAccessor.writeMemory(i, 0x00);
                }
            }
            else if(segment == 3){
                for(let i = 512; i < 768; i++){
                    _MemoryAccessor.writeMemory(i, 0x00);
                }
            }
        }

        public clearAll(): void{
            _Memory.init();
        }
    }

}