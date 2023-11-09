/* ----------------------------------
    scheduler


------------------------------------- */

module TSOS {
    export class Scheduler {

        constructor() {
            
        }

        public checkForSwitch(): void{
            if(_RunningCycles > _Quantum){
                // Dispatch interrupt
            }
        }
    }
}