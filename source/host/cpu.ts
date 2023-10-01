/* ------------
     CPU.ts

     Routines for the host CPU simulation, NOT for the OS itself.
     In this manner, it's A LITTLE BIT like a hypervisor,
     in that the Document environment inside a browser is the "bare metal" (so to speak) for which we write code
     that hosts our client OS. But that analogy only goes so far, and the lines are blurred, because we are using
     TypeScript/JavaScript in both the host and client environments.

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */

module TSOS {

    export class Cpu {

        constructor(public PC: number = 0,
                    public IR: number = 0,
                    public Acc: number = 0,
                    public Xreg: number = 0,
                    public Yreg: number = 0,
                    public Zflag: number = 0,
                    public isExecuting: boolean = false) {

        }

        public init(): void {
            this.PC = 0x0000;
            this.IR = 0x00;
            this.Acc = 0x00;
            this.Xreg = 0x00;
            this.Yreg = 0x00;
            this.Zflag = 0x00;
            this.isExecuting = false;


            
        }

        public cycle(): void {
            _Kernel.krnTrace('CPU cycle');
            // TODO: Accumulate CPU usage and profiling statistics here.
            // Do the real work here. Be sure to set this.isExecuting appropriately.
            
            // Fetches the byte in memory at the current Program Counter address
            const currentByte = _MemoryAccessor.readMemory(this.PC);

            // Decoding step
            switch (currentByte){
                case 0xA9:
                    this.IR = currentByte;
                    this.execute(this.IR); // Execute step

                break;
            }


        }


        

        private execute(instruction: number): void {
            switch (instruction) {
                case 0xA9:
                    this.PC++;
                    const value = _MemoryAccessor.readMemory(this.PC); 
                    this.Acc = value; // Loads the accumulator with the constant
                    this.PC++;
                    break;
            }
        }
    }
}
