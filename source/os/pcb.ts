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
        public location: number;

        constructor(pid: number, pc: number, loca: number, ir: number = 0x00, acc: number = 0x00,
                    xReg: number = 0x00, yReg: number = 0x00, zFlag: number = 0,
                    prior: number = 0, sta: string = "Idle") {

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

}