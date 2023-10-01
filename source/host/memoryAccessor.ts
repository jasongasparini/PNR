/* ----------------------------------
   memoryAccessor.ts

   Memory Accessor
   ---------------------------------- */

   module TSOS {
    export class MemoryAccessor {

        constructor() {
            
        }

        public readMemory(address: number): number {
            const value = _Memory.readByte(address);

            return value;
        }

        public writeMemory(address: number, value: number): void{
            _Memory.writeByte(address, value);
        }
    }

}