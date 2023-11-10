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
            }   
            else{
                var pcb = _ReadyQueue.dequeue();
                _CPU.loadNextProgram(pcb);
                _ReadyQueue.enqueue(pcb);
            }
        }

    }
}