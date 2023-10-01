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
var TSOS;
(function (TSOS) {
    class Cpu {
        PC;
        IR;
        Acc;
        Xreg;
        Yreg;
        Zflag;
        isExecuting;
        constructor(PC = 0, IR = 0, Acc = 0, Xreg = 0, Yreg = 0, Zflag = 0, isExecuting = false) {
            this.PC = PC;
            this.IR = IR;
            this.Acc = Acc;
            this.Xreg = Xreg;
            this.Yreg = Yreg;
            this.Zflag = Zflag;
            this.isExecuting = isExecuting;
        }
        init() {
            this.PC = 0x0000;
            this.IR = 0x00;
            this.Acc = 0x00;
            this.Xreg = 0x00;
            this.Yreg = 0x00;
            this.Zflag = 0x00;
            this.isExecuting = false;
        }
        updateTable() {
            document.getElementById("pcValue").textContent = this.PC.toString(16);
            document.getElementById("irValue").textContent = this.IR.toString(16);
            document.getElementById("accValue").textContent = this.Acc.toString(16);
        }
        cycle() {
            _Kernel.krnTrace('CPU cycle');
            // TODO: Accumulate CPU usage and profiling statistics here.
            // Do the real work here. Be sure to set this.isExecuting appropriately.
            // Fetches the byte in memory at the current Program Counter address
            const currentByte = _MemoryAccessor.readMemory(this.PC);
            // Decoding step
            switch (currentByte) {
                case 0xA9:
                    this.IR = currentByte;
                    this.execute(this.IR); // Execute step
                    break;
            }
            this.updateTable();
        }
        execute(instruction) {
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
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=cpu.js.map