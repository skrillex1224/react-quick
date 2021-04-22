var fs =require('fs')

var dataFile = './src/assets/16k.pcm';
fs.readFile(dataFile, function(err, res) {
    if(err) {

        console.log('Error:', e.stack);

    }else{
        var ampData = [];
        var arrByte = Uint8Array.from(Buffer.from(res)); //Convert to byte array
        for(var i=0;i<arrByte.length;i=i+2){
            var val;
            var byteA = arrByte[i];
            var byteB = arrByte[i+1];
            var sign = byteA & (1 << 7);
            var x = (((byteA & 0xFF) << 8) | (byteB & 0xFF)); // convert to 16 bit signed int
            if (sign) { // if negative
                val = 0xFFFF0000 | x;  // fill in most significant bits with 1's
            }else{
                val = x;
            }
            ampData.push(val)
        }
        console.log(ampData.length /1365)
    }
});