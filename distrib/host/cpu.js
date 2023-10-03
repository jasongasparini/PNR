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
            document.getElementById("pcValue").textContent = this.PC.toString(16).toUpperCase();
            document.getElementById("irValue").textContent = this.IR.toString(16).toUpperCase();
            document.getElementById("accValue").textContent = this.Acc.toString(16).toUpperCase();
            document.getElementById("xValue").textContent = this.Xreg.toString(16).toUpperCase();
            document.getElementById("yValue").textContent = this.Yreg.toString(16).toUpperCase();
            document.getElementById("zValue").textContent = this.Zflag.toString(16).toUpperCase();
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
                case 0xAD:
                    this.IR = currentByte;
                    this.execute(this.IR); // Execute step
                    break;
                case 0x8D:
                    this.IR = currentByte;
                    this.execute(this.IR); // Execute step
                    break;
                case 0x6D:
                    this.IR = currentByte;
                    this.execute(this.IR); // Execute step
                    break;
                case 0xA2:
                    this.IR = currentByte;
                    this.execute(this.IR); // Execute step
                    break;
                case 0xAE:
                    this.IR = currentByte;
                    this.execute(this.IR); // Execute step
                    break;
                case 0xA0:
                    this.IR = currentByte;
                    this.execute(this.IR); // Execute step
                    break;
                case 0xAC:
                    this.IR = currentByte;
                    this.execute(this.IR); // Execute step
                    break;
                case 0xEA:
                    this.IR = currentByte;
                    this.execute(this.IR); // Execute step
                    break;
                case 0x00:
                    this.IR = currentByte;
                    this.execute(this.IR); // Execute step
                    break;
                case 0xEC:
                    this.IR = currentByte;
                    this.execute(this.IR); // Execute step
                    break;
                case 0xD0:
                    this.IR = currentByte;
                    this.execute(this.IR); // Execute step
                    break;
                case 0xEE:
                    this.IR = currentByte;
                    this.execute(this.IR); // Execute step
                    break;
                case 0xFF:
                    this.IR = currentByte;
                    this.execute(this.IR); // Execute step
                    break;
            }
            // This was moved to the clock pulse in devices.ts
            // this.updateTable();
            // _Memory.updateMemoryTable(); 
        }
        execute(instruction) {
            let value = 0x00;
            let address = 0x00;
            switch (instruction) {
                case 0xA9: // Loads the accumulator with a constant
                    this.PC++;
                    value = _MemoryAccessor.readMemory(this.PC);
                    this.Acc = value; // Loads the accumulator with the constant
                    this.PC++;
                    break;
                case 0xAD: // Loads the accumulator from memory
                    this.PC++;
                    address = _MemoryAccessor.readMemory(this.PC);
                    this.PC++;
                    this.PC++;
                    value = _MemoryAccessor.readMemory(address);
                    this.Acc = value;
                    break;
                case 0x8D: // Stores the accumulator in memory
                    this.PC++;
                    address = _MemoryAccessor.readMemory(this.PC);
                    this.PC++;
                    this.PC++;
                    _MemoryAccessor.writeMemory(address, this.Acc);
                    break;
                case 0x6D: // Adds the accumulator with a constant in memory
                    this.PC++;
                    address = _MemoryAccessor.readMemory(this.PC);
                    this.PC++;
                    this.PC++;
                    value = _MemoryAccessor.readMemory(address);
                    this.Acc = this.Acc + value;
                    break;
                case 0xA2: // Loads the X reg with a constant
                    this.PC++;
                    value = _MemoryAccessor.readMemory(this.PC);
                    this.PC++;
                    this.Xreg = value;
                    break;
                case 0xAE: // Loads the X reg from memory
                    this.PC++;
                    address = _MemoryAccessor.readMemory(this.PC);
                    this.PC++;
                    this.PC++;
                    value = _MemoryAccessor.readMemory(address);
                    this.Xreg = value;
                    break;
                case 0xA0: // Loads the Y reg with a constant
                    this.PC++;
                    value = _MemoryAccessor.readMemory(this.PC);
                    this.PC++;
                    this.Yreg = value;
                    break;
                case 0xAC: // Loads the Y reg from memory
                    this.PC++;
                    address = _MemoryAccessor.readMemory(this.PC);
                    this.PC++;
                    this.PC++;
                    value = _MemoryAccessor.readMemory(address);
                    this.Yreg = value;
                    break;
                case 0xEA: // No op
                    this.PC++;
                    break;
                case 0x00: // Break
                    this.isExecuting = false;
                    break;
                case 0xEC: // Sets zflag if byte == x reg
                    this.PC++;
                    address = _MemoryAccessor.readMemory(this.PC);
                    this.PC++;
                    this.PC++;
                    value = _MemoryAccessor.readMemory(address);
                    if (value == this.Xreg) {
                        this.Zflag = 0x01;
                    }
                    break;
                case 0xD0: // Branches n bytes
                    this.PC++;
                    let operand = _MemoryAccessor.readMemory(this.PC);
                    if (this.Zflag == 0x00) {
                        let mask = 0b11111111;
                        operand = operand & mask;
                        operand += 1;
                        this.PC = this.PC - operand;
                    }
                    break;
                case 0xEE: // Increments the value of a byte
                    this.PC++;
                    address = _MemoryAccessor.readMemory(this.PC);
                    value = _MemoryAccessor.readMemory(address);
                    value++;
                    _MemoryAccessor.writeMemory(address, value);
                    this.PC++;
                    this.PC++;
                    break;
                case 0xFF: // FF System call print
                    this.PC++;
                    if (this.Xreg == 0x01) {
                        let xString = this.Yreg.toString(16);
                        _StdOut.putText("Case satisfied. Testing output");
                        _StdOut.putText(xString);
                        let xStringArray;
                        xStringArray.push(xString);
                        var interrupt = new TSOS.Interrupt(FF_IRQ, xStringArray);
                        _KernelInterruptQueue.enqueue(interrupt);
                    }
                    else if (this.Xreg == 0x02) {
                        // let yString = this.Yreg.toString(16).split("");
                        // var interrupt = new Interrupt(FF_IRQ, yString);
                        // _Kernel.krnInterruptHandler(interrupt.irq, interrupt.params);
                    }
                    break;
            }
        }
    }
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=cpu.js.map