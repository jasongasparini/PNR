/* ----------------------------------
   pcb.ts

   Process Control Block
   ---------------------------------- */
var TSOS;
(function (TSOS) {
    class ProcessControlBlock {
        PID;
        PC;
        IR;
        ACC;
        X;
        Y;
        Z;
        priority;
        state;
        location;
        constructor(pid, pc, loca, ir = 0x00, acc = 0x00, xReg = 0x00, yReg = 0x00, zFlag = 0, prior = 0, sta = "Idle") {
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