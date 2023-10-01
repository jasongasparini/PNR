/* ----------------------------------
   memoryAccessor.ts

   Memory Accessor
   ---------------------------------- */
var TSOS;
(function (TSOS) {
    class MemoryAccessor {
        constructor() {
        }
        readMemory(address) {
            const value = _Memory.readByte(address);
            return value;
        }
        writeMemory(address, value) {
            _Memory.writeByte(address, value);
        }
    }
    TSOS.MemoryAccessor = MemoryAccessor;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memoryAccessor.js.map