/* ----------------------------------
    dispatcher


------------------------------------- */

module TSOS {
    export class Dispatcher {

        constructor() {
            
        }


        public dispatchNextProgram(): void{
            
            if(_ReadyQueue.getSize() == 0){
                // _Kernel.krnTrace('BREAKING BC NO READY QUEUE'); Testing
                _CPU.isExecuting = false;
                _RunningCycles = 0;
            }   
            else{
                
                _PcbList[_CPU.PID].updatePcbDisplay();
                var pcb = _ReadyQueue.dequeue();
                if(pcb.segment == -1){
                    var program = _Memory.copyLast256ToString();
                    var swapFilename = ".swap" + _CPU.PID;
                    _krnDiskDriver.writeFile(swapFilename, program); // Saves program in disk
                    _PcbList[_CPU.PID].segment = -1;

                    var nextSwapFilename = ".swap" + pcb.PID;
                    pcb.segment = 3;
                    pcb.checkSetBounds();
                    var nextProgram = _krnDiskDriver.readFile(nextSwapFilename);
                    const opcodes = nextProgram.match(/.{1,2}/g);
                    for (let i = 0; i < opcodes.length; i++) {
                        const opcode = opcodes[i];
                        if (opcode.length === 2) {
                            // Assuming each opcode is a 2-digit hexadecimal string
                            const value = parseInt(opcode, 16);
                            
                            // Check if value is a valid number
                            if (!isNaN(value) && value >= 0 && value <= 255) {
                                // Write the value to memory at the next available address
                                var address = i+pcb.lowerBound;
                                // _StdOut.putText(" Writing to address: " + address.toString(16));
                                _Memory.writeByte(address, value);
                            }
                        }
                    }
                    
                    
                }
                _CPU.loadNextProgram(pcb);
                _ReadyQueue.enqueue(pcb);

            }
        }

    }
}