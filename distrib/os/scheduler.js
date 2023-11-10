/* ----------------------------------
    scheduler


------------------------------------- */
var TSOS;
(function (TSOS) {
    class Scheduler {
        constructor() {
        }
        checkForSwitch() {
            if (_RunningCycles == _Quantum && _ReadyQueue.getSize() != 0) {
                let params;
                _PcbList[_CPU.PID].state = "Ready";
                _KernelInterruptQueue.enqueue(new TSOS.Interrupt(CONTEXTSWITCH_IRQ, params));
                _RunningCycles = 0;
            }
        }
    }
    TSOS.Scheduler = Scheduler;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=scheduler.js.map