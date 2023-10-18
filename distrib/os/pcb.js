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
        constructor(pid, pc = 0, ir = 0x00, acc = 0x00, xReg = 0x00, yReg = 0x00, zFlag = 0, prior = 0, sta = "Idle") {
            this.PID = pid;
            this.PC = pc;
            this.IR = ir;
            this.ACC = acc;
            this.X = xReg;
            this.Y = yReg;
            this.Z = zFlag;
            this.priority = prior;
            this.state = sta;
        }
        synchronize() {
            this.PC = _CPU.PC;
            this.IR = _CPU.IR;
            this.ACC = _CPU.Acc;
            this.X = _CPU.Xreg;
            this.Y = _CPU.Yreg;
            this.Z = _CPU.Zflag;
        }
        updatepcbTable() {
            document.getElementById("pcbpidValue").textContent = this.PID.toString(10).toUpperCase();
            document.getElementById("pcbpcValue").textContent = this.PC.toString(10).toUpperCase();
            document.getElementById("pcbirValue").textContent = this.IR.toString(16).toUpperCase();
            document.getElementById("pcbaccValue").textContent = this.ACC.toString(16).toUpperCase();
            document.getElementById("pcbxValue").textContent = this.X.toString(16).toUpperCase();
            document.getElementById("pcbyValue").textContent = this.Y.toString(16).toUpperCase();
            document.getElementById("pcbzValue").textContent = this.Z.toString(16).toUpperCase();
            document.getElementById("pcbpriorityValue").textContent = this.priority.toString(10).toUpperCase();
            document.getElementById("pcbstateValue").textContent = this.state;
        }
    }
    TSOS.ProcessControlBlock = ProcessControlBlock;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=pcb.js.map