export function uuidGen(){
    function randomGen(){
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }
    let uuid = "";
    for(let i=0; i<4; ++i) {
        uuid += randomGen();
        if(i < 3){
            uuid += "-";
        }
    }
    return uuid;
}


export function getRandomColor(){
    this.bubbleColors = ["#80ffff", "#66ff66", "#d11aff", "#ff6633", "#8080ff", "#ff6699"];
    let index = Math.floor((Math.random() * this.bubbleColors.length));
    return this.bubbleColors[index];


}