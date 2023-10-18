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
            this.PC = 0;
            this.IR = 0x00;
            this.Acc = 0x00;
            this.Xreg = 0x00;
            this.Yreg = 0x00;
            this.Zflag = 0x00;
            this.isExecuting = false;

        }

        public updateTable(): void {
            document.getElementById("pcValue").textContent = this.PC.toString(10).toUpperCase();
            document.getElementById("irValue").textContent = this.IR.toString(16).toUpperCase();
            document.getElementById("accValue").textContent = this.Acc.toString(16).toUpperCase();
            document.getElementById("xValue").textContent = this.Xreg.toString(16).toUpperCase();
            document.getElementById("yValue").textContent = this.Yreg.toString(16).toUpperCase();
            document.getElementById("zValue").textContent = this.Zflag.toString(16).toUpperCase();
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
            _PcbList[0].synchronize();
            _PcbList[0].updatepcbTable();

            
            this.updateTable();
            _Memory.updateMemoryTable(); 
        }


        

        private execute(instruction: number): void {
            let value = 0x00;
            let address = 0x00

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
                    this.Acc = this.Acc+value;
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
                    _PcbList[0].state = "Terminated";
                break;

                case 0xEC: // Sets zflag if byte == x reg
                    this.PC++;
                    address = _MemoryAccessor.readMemory(this.PC);
                    this.PC++;
                    this.PC++;
                    value = _MemoryAccessor.readMemory(address);
                    if (value == this.Xreg){
                        this.Zflag = 0x01;
                    }

                break;

                case 0xD0: // Branches n bytes
                    this.PC++;
                    let operand = _MemoryAccessor.readMemory(this.PC);
                    this.PC++;
                    if(this.Zflag == 0x00){
                        this.PC += operand;
                        if(this.PC >= 0x0100){
                            this.PC = this.PC % 0x100;
                        }
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
                    if(this.Xreg == 0x01){
                        // let xString = this.Yreg.toString(16);
                        // _StdOut.putText("Case satisfied. Testing output");
                        // _StdOut.putText(xString);
                        let params: string[];
                        _KernelInterruptQueue.enqueue(new Interrupt(FF_IRQ, params));
                    }
                    else if(this.Xreg == 0x02){
                        // let yString = this.Yreg.toString(16).split("");
                        // var interrupt = new Interrupt(FF_IRQ, yString);
                        // _Kernel.krnInterruptHandler(interrupt.irq, interrupt.params);
                        let params: string[];
                        _KernelInterruptQueue.enqueue(new Interrupt(FF_IRQ, params));
                    }

                break;
            }
        }
    }
}
