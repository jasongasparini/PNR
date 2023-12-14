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
                var currPID = _CPU.PID;
                _PcbList[_CPU.PID].updatePcbDisplay();
                var pcb = _ReadyQueue.dequeue();
                var nextpcbID = pcb.PID;
                // pcb = TSOS.Utils.pcbSync(_PcbList[nextpcbID], pcb);

                if(_PcbList[nextpcbID].segment == -1){ // Next program is on the disk
                    var currentProgramSegment = _PcbList[currPID].segment;
                    var currentProgram = _Memory.copyElementsToString(currentProgramSegment);
                    var currentSwapFile = ".swap" + currPID;
                    if(_krnDiskDriver.readFile(currentSwapFile) != null){
                        _krnDiskDriver.writeFile(currentSwapFile, currentProgram);
                        _PcbList[currPID].segment = -1;
                        _Memory.clearSegment(currentProgramSegment);

                        var nextPID = pcb.PID;
                        var nextswap = ".swap" + nextPID;
                        var program = _krnDiskDriver.readFile(nextswap);
                        _PcbList[nextpcbID].segment = currentProgramSegment;
                        _PcbList[nextpcbID].checkSetBounds();
                        pcb.segment = currentProgramSegment;
                        pcb.checkSetBounds();
                        _Memory.writeSegment(currentProgramSegment, program);
                    } else{
                        _krnDiskDriver.createSwapFile(currPID, currentProgram);
                        _PcbList[currPID].segment = -1;
                        _Memory.clearSegment(currentProgramSegment);

                        var nextPID = pcb.PID;
                        var nextswap = ".swap" + nextPID;
                        var program = _krnDiskDriver.readFile(nextswap);
                        _PcbList[nextpcbID].segment = currentProgramSegment;
                        _PcbList[nextpcbID].checkSetBounds();
                        pcb.segment = currentProgramSegment;
                        pcb.checkSetBounds();
                        _Memory.writeSegment(currentProgramSegment, program);
                    }

                }
                _PcbList[_CPU.PID].updatePcbDisplay();
                _PcbList[nextpcbID].updatePcbDisplay();
                _CPU.loadNextProgram(_PcbList[nextpcbID]);
                _ReadyQueue.enqueue(pcb);
                
            }
        }

    }
}