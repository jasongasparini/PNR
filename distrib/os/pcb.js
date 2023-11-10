/* ----------------------------------
   pcb.ts

   Process Control Block
   ---------------------------------- */
var TSOS;
(function (TSOS) {
    class ProcessControlBlock {
        PID;
        segment;
        PC;
        IR;
        ACC;
        X;
        Y;
        Z;
        priority;
        state;
        lowerBound;
        upperBound;
        constructor(pid, seg, pc = 0, ir = 0x00, acc = 0x00, xReg = 0x00, yReg = 0x00, zFlag = 0, prior = 0, sta = "Resident", lower = 0, upper = 255) {
            this.PID = pid;
            this.segment = seg;
            this.PC = pc;
            this.IR = ir;
            this.ACC = acc;
            this.X = xReg;
            this.Y = yReg;
            this.Z = zFlag;
            this.priority = prior;
            this.state = sta;
            this.lowerBound = lower;
            this.upperBound = upper;
            this.checkSetBounds(); // Checks what segment this program resides in and update the bounds of the program accordingly
        }
        checkSetBounds() {
            if (this.segment == 1) {
                return;
            }
            else if (this.segment == 2) {
                this.lowerBound = 256;
                this.upperBound = 511;
            }
            else if (this.segment == 3) {
                this.lowerBound = 512;
                this.upperBound = 767;
            }
        }
        setState(string) {
            this.state = string;
        }
        synchronize() {
            this.PC = _CPU.PC;
            this.IR = _CPU.IR;
            this.ACC = _CPU.Acc;
            this.X = _CPU.Xreg;
            this.Y = _CPU.Yreg;
            this.Z = _CPU.Zflag;
        }
        updatePcbDisplay() {
            const properties = Object.getOwnPropertyNames(this);
            for (const prop of properties) {
                const tagId = this.PID + "-" + prop;
                let tag = document.getElementById(tagId);
                if (!tag) {
                    return;
                }
                if (typeof this[prop] === "number") {
                    tag.innerHTML = this[prop].toString(16).toUpperCase();
                }
                //To update the state of the PCB since its not a number
                else if (prop === "state") {
                    tag.innerHTML = this[prop];
                }
            }
        }
    }
    TSOS.ProcessControlBlock = ProcessControlBlock;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=pcb.js.map