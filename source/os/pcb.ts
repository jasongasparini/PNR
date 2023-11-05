/* ----------------------------------
   pcb.ts

   Process Control Block
   ---------------------------------- */

module TSOS {
    export class ProcessControlBlock {
        public PID: number;
        public PC: number;
        public IR: number;
        public ACC: number;
        public X: number;
        public Y: number;
        public Z: number;
        public priority: number;
        public state: string;
        public lowerBound: number;
        public upperBound: number;
        public segment: number;


        constructor(pid: number, seg: number, pc: number = 0, ir: number = 0x00, acc: number = 0x00,
                    xReg: number = 0x00, yReg: number = 0x00, zFlag: number = 0,
                    prior: number = 0, sta: string = "Idle", lower: number = 0, upper: number = 255) {

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

        public checkSetBounds(): void{
            if(this.segment == 1){
                return;
            }
            else if(this.segment == 2){
                this.lowerBound = 256;
                this.upperBound = 511;
            }
            else if(this.segment == 3){
                this.lowerBound = 512;
                this.upperBound = 767;
            }
        }

        public synchronize(): void{
            this.PC = _CPU.PC;
            this.IR = _CPU.IR;
            this.ACC = _CPU.Acc;
            this.X = _CPU.Xreg;
            this.Y = _CPU.Yreg;
            this.Z = _CPU.Zflag;
        }

        public updatepcbTable(): void {
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

}