/* ----------------------------------
    dispatcher


------------------------------------- */
var TSOS;
(function (TSOS) {
    class Dispatcher {
        constructor() {
        }
        dispatchNextProgram() {
            if (_ReadyQueue.getSize() == 0) {
                // _Kernel.krnTrace('BREAKING BC NO READY QUEUE'); Testing
                _CPU.isExecuting = false;
                _RunningCycles = 0;
            }
            else {
                _PcbList[_CPU.PID].updatePcbDisplay();
                var pcb = _ReadyQueue.dequeue();
                _CPU.loadNextProgram(pcb);
                _ReadyQueue.enqueue(pcb);
            }
        }
    }
    TSOS.Dispatcher = Dispatcher;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=dispatcher.js.map