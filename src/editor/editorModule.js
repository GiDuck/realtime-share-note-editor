

export function getRandomColor(){
    const bubbleColors = ["#80ffff", "#66ff66", "#d11aff", "#ff6633", "#8080ff", "#ff6699"];
    let index = Math.floor((Math.random() * bubbleColors.length));
    return bubbleColors[index];

}
