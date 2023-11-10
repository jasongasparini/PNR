/* ----------------------------------
    scheduler


------------------------------------- */

module TSOS {
    export class Scheduler {

        constructor() {
            
        }

        public checkForSwitch(): void{
            if(_RunningCycles == _Quantum){
                let params: string[];
                _KernelInterruptQueue.enqueue(new Interrupt(CONTEXTSWITCH_IRQ, params));
                _RunningCycles = 0;
            }
        }
    }
}