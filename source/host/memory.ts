/* ----------------------------------
   coreMemory.ts

   Core Memory
   ---------------------------------- */

   module TSOS {
    export class Memory {
        private memory: number[];

        constructor() {
            
        }

        public init(): void {
            this.memory = new Array(256).fill(0); // Initializes memory
        }

        // Read a byte from memory at the specified hexadecimal address
        public readByte(hexAddress: number): number {
            return this.memory[hexAddress];
        }

        // Write a byte to memory at the specified hexadecimal address
        public writeByte(hexAddress: number, value: number): void {
            const address = this.hexToByte(hexAddress);
            

            this.memory[address] = this.hexToByte(value);
        }

        // Helper function to convert a byte (number) to a 2-digit hexadecimal string
        private byteToHexString(byteValue: number): string {
            return byteValue.toString(16).toUpperCase().padStart(2, "0");
        }

        // Helper function to convert a 2-digit hexadecimal string to a byte (number)
        private hexToByte(hexValue: number): number {
            return hexValue & 0xFF; // Ensure that the value is within the range of 0x00 to 0xFF
        }

        public updateMemoryTable(): void {
            const tableBody = document.querySelector('#memoryTable tbody');
            tableBody.innerHTML = '';
        
            for (let address = 0; address < 256; address++) {
              const hexAddress = address.toString(16).toUpperCase().padStart(2, '0');
              const hexValue = this.readByte(address);

            // const hexAddress = address;
            // const hexValue = 1
              
              const row = `<tr>
                             <td>0x${hexAddress}</td>
                             <td>${hexValue}</td>
                           </tr>`;
              tableBody.innerHTML += row;
            }
          }

    }

}