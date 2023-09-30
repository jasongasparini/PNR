/* ----------------------------------
   pcb.ts

   Process Control Block
   ---------------------------------- */
var TSOS;
(function (TSOS) {
    class ProcessControlBlock {
        PID = 0;
        PC = 0;
        IR = 0x00;
        ACC = 0x00;
        X = 0;
        Y = 0;
        Z = 0;
        priority = 0;
        state = "";
        location = 0;
        constructor(pid, pc, ir, acc, xReg, yReg, zFlag, prior, sta, loca) {
            this.PID = pid;
            this.PC = pc;
            this.IR = ir;
            this.ACC = acc;
            this.X = xReg;
            this.Y = yReg;
            this.Z = zFlag;
            this.priority = prior;
            this.state = sta;
            this.location = loca;
        }
    }
    TSOS.ProcessControlBlock = ProcessControlBlock;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=pcb.js.map