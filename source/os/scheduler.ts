/* ----------------------------------
    scheduler


------------------------------------- */

module TSOS {
    export class Scheduler {

        constructor() {
            
        }

        public checkForSwitch(): void{
            if(_RunningCycles == _Quantum && _ReadyQueue.getSize() != 0){
                let params: string[];
                _PcbList[_CPU.PID].state = "Ready";
                _KernelInterruptQueue.enqueue(new Interrupt(CONTEXTSWITCH_IRQ, params));
                _RunningCycles = 0;
            }
        }
    }
}