module TSOS{

    export class DeviceDriverDisk extends DeviceDriver{
        
        constructor(public disk = new TSOS.Disk()){
            super();
            this.disk = disk;
            this.driverEntry = this.krnKbdDriverEntry;
        }

        krnKbdDriverEntry() {
            this.status = "loaded";
        }
    }
}