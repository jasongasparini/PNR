/* ----------------------------------
   coreMemory.ts

   Core Memory
   ---------------------------------- */

   module TSOS {
    export class Memory {
        private memory: number[];

        constructor() {
            this.memory = new Array(256).fill(0); // Initializes memory
        }

        // Read a byte from memory at the specified address
        readByte(address: number): string {
            // if (address < 0 || address >= 256) {
            // throw new Error("Invalid memory address");
            // }

            return this.byteToHexString(this.memory[address]);
        }

        // Write a byte to memory at the specified address
        writeByte(address: number, value: string): void {
            // if (address < 0 || address >= 256) {
            // throw new Error("Invalid memory address");
            // }

            this.memory[address] = this.hexStringToByte(value);
        }

        // Helper function to convert a byte (number) to a 2-digit hexadecimal string
        private byteToHexString(byteValue: number): string {
            return byteValue.toString(16).toUpperCase().padStart(2, "0");
        }

        // Helper function to convert a 2-digit hexadecimal string to a byte (number)
        private hexStringToByte(hexString: string): number {
            const byteValue = parseInt(hexString, 16);
            // if (isNaN(byteValue) || byteValue < 0 || byteValue > 255) {
            // throw new Error("Invalid hexadecimal value");
            // }
            return byteValue;
        }
    }

}