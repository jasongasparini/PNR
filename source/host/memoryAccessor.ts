/* ----------------------------------
   memoryAccessor.ts

   Memory Accessor
   ---------------------------------- */

   module TSOS {
    export class MemoryAccessor {

        constructor() {
            
        }

        public readMemory(address: number): number {
            if(_CPU.isExecuting){
                var currPID = _CPU.PID;
                if(address > _PcbList[currPID].upperBound || address < _PcbList[currPID].lowerBound){
                    _StdOut.putText("Memory Access Violation from PID: " + currPID + " Stopping CPU execution.");
                    _CPU.isExecuting = false;
                }
            }
            const value = _Memory.readByte(address);
            return value;
        }

        public writeMemory(address: number, value: number): void{
            if(_CPU.isExecuting){
                var currPID = _CPU.PID;
                if(address > _PcbList[currPID].upperBound || address < _PcbList[currPID].lowerBound){
                    _StdOut.putText("Memory Access Violation from PID: " + currPID + " Stopping CPU execution.");
                    _CPU.isExecuting = false;
                }
                else{
                    _Memory.writeByte(address, value);
                }
            } else{
                _Memory.writeByte(address, value);
            }
            
        }
    }

}