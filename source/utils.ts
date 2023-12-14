/* --------
   Utils.ts

   Utility functions.
   -------- */

module TSOS {

    export class Utils {

        public static trim(str): string {
            // Use a regular expression to remove leading and trailing spaces.
            return str.replace(/^\s+ | \s+$/g, "");
            /*
            Huh? WTF? Okay... take a breath. Here we go:
            - The "|" separates this into two expressions, as in A or B.
            - "^\s+" matches a sequence of one or more whitespace characters at the beginning of a string.
            - "\s+$" is the same thing, but at the end of the string.
            - "g" makes is global, so we get all the whitespace.
            - "" is nothing, which is what we replace the whitespace with.
            */
        }

        public static rot13(str: string): string {
            /*
               This is an easy-to understand implementation of the famous and common Rot13 obfuscator.
               You can do this in three lines with a complex regular expression, but I'd have
               trouble explaining it in the future.  There's a lot to be said for obvious code.
            */
            var retVal: string = "";
            for (var i in <any>str) {    // We need to cast the string to any for use in the for...in construct.
                var ch: string = str[i];
                var code: number = 0;
                if ("abcedfghijklmABCDEFGHIJKLM".indexOf(ch) >= 0) {
                    code = str.charCodeAt(Number(i)) + 13;  // It's okay to use 13.  It's not a magic number, it's called rot13.
                    retVal = retVal + String.fromCharCode(code);
                } else if ("nopqrstuvwxyzNOPQRSTUVWXYZ".indexOf(ch) >= 0) {
                    code = str.charCodeAt(Number(i)) - 13;  // It's okay to use 13.  See above.
                    retVal = retVal + String.fromCharCode(code);
                } else {
                    retVal = retVal + ch;
                }
            }
            return retVal;
        }

        public static trimData(data){
            let dataArray = data.match(/.{1,2}/g);
            let i = 0;
            let result = '';
            while(i < dataArray.length){
                if(dataArray[i] != '00'){
                    result += dataArray[i];
                }
                else{
                    break;
                }
                i++;
            }
            return result;
        }

        public static replaceAt(value, index, replacement){
            return value.substring(0, index) + replacement + value.substring(index + replacement.length);
        }

        public static textToHex(str) {
            let hexStr = "";
            for (let i = 0; i < str.length; i++) {
                hexStr += str.charCodeAt(i).toString(16);
            }
            return hexStr;
        }
        
        public static hexToText(str) {
            if (str) {
                str = this.trimData(str);
                let textStr = "";
                for (let i = 0; i < str.length; i += 2) {
                    textStr += String.fromCharCode(parseInt(str.substr(i, 2), 16));
                }
                return textStr;
            }
            else {
                return null;
            }
        }

        public static checkIfHex(string){
            string = string.toLowerCase();
            var opCodes = string.match(/.{1,2}/g);
            
            for (var i = 0; i < opCodes.length; i++) {
                var temp = parseInt(opCodes[i], 16);
                if ((opCodes[i].startsWith("0")) && (temp.toString(16) === opCodes[i].slice(-1))) { 
                    continue;
                }
                else if (temp.toString(16) === opCodes[i]) {
                    continue;
                }
                else {
                    return false;
                }
            }
            
            return true;
        }

        // public static pcbSync(listpcb, outdatedpcb){
        //     outdatedpcb.PID
        //     outdatedpcb.segment
        //     outdatedpcb.PC
        //     outdatedpcb.IR
        //     outdatedpcb.ACC = 
        //     outdatedpcb.X = 
        //     outdatedpcb.Y = 
        //     outdatedpcb.Z = 
        //     outdatedpcb.priority = 
        //     outdatedpcb.state = 
        //     outdatedpcb.lowerbo
        // }
        
    

    }
}
