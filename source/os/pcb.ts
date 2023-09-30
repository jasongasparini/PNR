/* ----------------------------------
   pcb.ts

   Process Control Block
   ---------------------------------- */

module TSOS {
    export class ProcessControlBlock {
        public PID: number = 0;
        public PC: number = 0;
        public IR: number = 0x00;
        public ACC: number = 0x00;
        public X: number = 0;
        public Y: number = 0;
        public Z: number = 0;
        public priority: number = 0;
        public state: string = "";
        public location: number = 0;

        constructor(pid: number, pc: number, ir: number, acc: number,
                    xReg: number, yReg: number, zFlag: number,
                    prior: number, sta: string, loca: number) {

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