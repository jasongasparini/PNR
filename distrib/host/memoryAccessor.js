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
            if (_CPU.isExecuting) {
                var currPID = _CPU.PID;
                if (address > _PcbList[currPID].upperBound || address < _PcbList[currPID].lowerBound) {
                    _StdOut.putText("Memory Access Violation from PID: " + currPID + " Stopping CPU execution.");
                    _CPU.isExecuting = false;
                }
            }
            const value = _Memory.readByte(address);
            return value;
        }
        writeMemory(address, value) {
            if (_CPU.isExecuting) {
                var currPID = _CPU.PID;
                if (address > _PcbList[currPID].upperBound || address < _PcbList[currPID].lowerBound) {
                    _StdOut.putText("Memory Access Violation from PID: " + currPID + " Stopping CPU execution.");
                    _CPU.isExecuting = false;
                }
                else {
                    _Memory.writeByte(address, value);
                }
            }
            else {
                _Memory.writeByte(address, value);
            }
        }
    }
    TSOS.MemoryAccessor = MemoryAccessor;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memoryAccessor.js.map