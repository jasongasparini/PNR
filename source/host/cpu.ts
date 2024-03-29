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
                    public isExecuting: boolean = false,
                    public PID: number = 0,
                    public lowerBound: number = 0,
                    public address: number = null) {

        }

        public loadNextProgram(program: ProcessControlBlock){
            this.PC = program.PC;
            this.IR = program.IR;
            this.Acc = program.ACC;
            this.Xreg = program.X;
            this.Yreg = program.Y;
            this.Zflag = program.Z;
            this.PID = program.PID;
            this.lowerBound = program.lowerBound;


            _PcbList[this.PID].state = "Running";
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
            document.getElementById("pidValue").textContent = this.PID.toString(10).toUpperCase();
            document.getElementById("pcValue").textContent = this.PC.toString(10).toUpperCase();
            document.getElementById("irValue").textContent = this.IR.toString(16).toUpperCase();
            document.getElementById("accValue").textContent = this.Acc.toString(16).toUpperCase();
            document.getElementById("xValue").textContent = this.Xreg.toString(16).toUpperCase();
            document.getElementById("yValue").textContent = this.Yreg.toString(16).toUpperCase();
            document.getElementById("zValue").textContent = this.Zflag.toString(16).toUpperCase();
        }

        public cycle(): void {
            _Kernel.krnTrace('CPU cycle');
            this.address = this.PC + this.lowerBound;
            
            
            
            // Fetches the byte in memory at the current Program Counter address
            const currentByte = _MemoryAccessor.readMemory(this.address);

            _Kernel.krnTrace('Reading instruction: ' + currentByte.toString(16) + ' At location: ' + this.address.toString(16));

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
            _PcbList[this.PID].synchronize();
            _PcbList[this.PID].updatePcbDisplay();
            _RunningCycles++;
            
            

            
            this.updateTable();
            // _Memory.updateMemoryTable(); 
        }


        

        private execute(instruction: number): void {
            let value = 0x00;
            let writeAddress = 0x00

            switch (instruction) {
                case 0xA9: // Loads the accumulator with a constant
                    this.PC++;
                    value = _MemoryAccessor.readMemory(this.address+1); 
                    this.Acc = value; // Loads the accumulator with the constant
                    this.PC++;
                break;

                case 0xAD: // Loads the accumulator from memory
                    this.PC++;
                    writeAddress = _MemoryAccessor.readMemory(this.address+1) + this.lowerBound;
                    this.PC++;
                    this.PC++;
                    value = _MemoryAccessor.readMemory(writeAddress);
                    this.Acc = value;
                break;

                case 0x8D: // Stores the accumulator in memory
                    this.PC++;
                    writeAddress = _MemoryAccessor.readMemory(this.address+1) + this.lowerBound;
                    this.PC++;
                    this.PC++;
                    _MemoryAccessor.writeMemory(writeAddress, this.Acc);
                break;

                case 0x6D: // Adds the accumulator with a constant in memory
                    this.PC++;
                    writeAddress = _MemoryAccessor.readMemory(this.address+1) + this.lowerBound;
                    this.PC++;
                    this.PC++;
                    value = _MemoryAccessor.readMemory(writeAddress);
                    this.Acc = this.Acc+value;
                break;

                case 0xA2: // Loads the X reg with a constant
                    this.PC++;
                    value = _MemoryAccessor.readMemory(this.address+1);
                    this.PC++;
                    this.Xreg = value;
                break;

                case 0xAE: // Loads the X reg from memory
                    this.PC++;
                    writeAddress = _MemoryAccessor.readMemory(this.address+1) + this.lowerBound;
                    this.PC++;
                    this.PC++;
                    value = _MemoryAccessor.readMemory(writeAddress);
                    this.Xreg = value;
                break;

                case 0xA0: // Loads the Y reg with a constant
                    this.PC++;
                    value = _MemoryAccessor.readMemory(this.address+1);
                    this.PC++;
                    this.Yreg = value;
                break;

                case 0xAC: // Loads the Y reg from memory
                    this.PC++;
                    writeAddress = _MemoryAccessor.readMemory(this.address+1) + this.lowerBound;
                    this.PC++;
                    this.PC++;
                    value = _MemoryAccessor.readMemory(writeAddress);
                    this.Yreg = value;
                break;

                case 0xEA: // No op
                    this.PC++;
                break;

                case 0x00: // Break
                    
                    _PcbList[this.PID].state = "Terminated";
                    _PcbList[this.PID].synchronize();
                    _PcbList[this.PID].updatePcbDisplay();
                    if(_ReadyQueue.getSize() != 0){
                        var num = _ReadyQueue.getSize() -1;
                        _ReadyQueue.dequeueByIndex(num)
                        let params: string[];
                        _KernelInterruptQueue.enqueue(new Interrupt(CONTEXTSWITCH_IRQ, params));
                    } else {
                        _CPU.isExecuting = false;
                    }
                    
                break;

                case 0xEC: // Sets zflag if byte == x reg
                    this.PC++;
                    writeAddress = _MemoryAccessor.readMemory(this.address+1) + this.lowerBound;
                    this.PC++;
                    this.PC++;
                    value = _MemoryAccessor.readMemory(writeAddress);
                    if (value === this.Xreg){
                        this.Zflag = 1;
                    } else {
                        this.Zflag = 0;
                    }


                break;

                case 0xD0: // Branches n bytes
                    this.PC++;
                    let operand = _MemoryAccessor.readMemory(this.address+1);
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
                    writeAddress = _MemoryAccessor.readMemory(this.address+1) + this.lowerBound;
                    value = _MemoryAccessor.readMemory(writeAddress);
                    value++;
                    _MemoryAccessor.writeMemory(writeAddress, value);
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
