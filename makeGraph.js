var blueLine = []
var blueBranchedLine = []
var magentaLine = []
var yellowLine = []
var violetLine = []
var redLine = []
var greenLine = []
var greenBranchedLine = []
var pinkLine = []
var pinkBranchedLine = []
var orangeLine = []
var greyLine = []



class MetroMap {

    constructor() {
        this.stations = [];
        this.adjacencyList = {};
    }

    addstation(station) {
        this.stations.push(station);
        this.adjacencyList[station] = [];
    }

     
    addEdge(station1, station2, time, lineColor) {

        if (!this.adjacencyList[station1]) {
            throw new Error(`station '${station1}' does not exist in the graph`);
        }
        if (!this.adjacencyList[station2]) {
            throw new Error(`station '${station2}' does not exist in the graph`);
        }

        this.adjacencyList[station1].push({ station: station2, time: time, line: lineColor });
        this.adjacencyList[station2].push({ station: station1, time: time, line: lineColor });
    }  

    

}

function getAllStations(){

   var blue=require('./stations/blueLine.json')
   var blueBranched=require('./stations/blueBranchedLine.json')
   var magenta=require('./stations/magentaLine.json')
   var yellow=require('./stations/yellowLine.json')
   var violet=require('./stations/violetLine.json')
   var green = require('./stations/greenLine.json')
   var greenBranched=require('./stations/greenBranchedLine.json')
   var pink = require('./stations/pinkLine.json')
   var pinkBranched = require('./stations/pinkBranchedLine.json')
   var orange = require('./stations/orangeLine.json')
   var red = require('./stations/redLine.json')
   var grey = require('./stations/greyLine.json')

   
    // console.log(blue);

    //blueMain 
    for(var i=0;i<blue.length;i++) {
        blueLine[i] = blue[i]["name"].toLowerCase();
    }
    for (var i = 0; i < blueLine.length; i++) {
        g.addstation(blueLine[i]);
    }
    for (var i = 0; i < (blueLine.length - 1); i++) {
        g.addEdge(blueLine[i], blueLine[i + 1], 3.02, "blue");
    }

    //blueBranched
    for (var i = 0; i < blueBranched.length; i++) {
        blueBranchedLine[i] = blueBranched[i]["name"].toLowerCase();
      }
    for (var i = 0; i < blueBranchedLine.length; i++) {
        if (blueBranchedLine[i] == 'yamuna bank')
            continue;
        else
            g.addstation(blueBranchedLine[i]);
    }
    for (var i = 0; i < (blueBranchedLine.length - 1); i++) {
        g.addEdge(blueBranchedLine[i], blueBranchedLine[i + 1], 1.87, "bluebranch");
    }

    //magenta
    for (var i = 0; i < magenta.length; i++) {
    magentaLine[i] = magenta[i]["name"].toLowerCase();
    }
    for (var i = 0; i < magentaLine.length; i++) {

    if (magentaLine[i] == 'janakpuri west')
    continue;
    if (magentaLine[i] == 'botanical garden')
    continue;
    else
    g.addstation(magentaLine[i]);
    }
    for (var i = 0; i < (magentaLine.length - 1); i++) {
        g.addEdge(magentaLine[i], magentaLine[i + 1], 2.36, "magenta");
    }

    //yellow 
    for (var i = 0; i < yellow.length; i++) {
    yellowLine[i] = yellow[i]["name"].toLowerCase();
    }
    for (var i = 0; i < yellowLine.length; i++) {
    if (yellowLine[i] == 'hauz khas' || yellowLine[i] == 'rajiv chowk')
        continue;
    else
        g.addstation(yellowLine[i]);
    }
    for (var i = 0; i < (yellowLine.length - 1); i++) {
    g.addEdge(yellowLine[i], yellowLine[i + 1], 2.22, "yellow");
    }

    //violet
    for (var i = 0; i < violet.length; i++) {

        violetLine[i] = violet[i]["name"].toLowerCase();
    }
    for (var i = 0; i < violetLine.length; i++) {
        if (violetLine[i] == 'kashmere gate' || violetLine[i] == 'mandi house' || violetLine[i] == 'central secretariat' || violetLine[i] == 'kalkaji mandir')
        continue;
        else
        g.addstation(violetLine[i]);
    }
    for (var i = 0; i < (violetLine.length - 1); i++) {
        g.addEdge(violetLine[i], violetLine[i + 1], 2.24, "violet");
    }

    //redLine
    for (var i = 0; i < red.length; i++) {
        redLine[i] = red[i]["name"].toLowerCase();
    }
    for (var i = 0; i < redLine.length; i++) {
        if (redLine[i] == 'kashmere gate')
        continue;
        else
        g.addstation(redLine[i]);
    }
    for (var i = 0; i < (redLine.length - 1); i++) {
        g.addEdge(redLine[i], redLine[i + 1], 2.03, "red");
    }

    //greenLine
    for (var i = 0; i < green.length; i++) {
        greenLine[i] = green[i]["name"].toLowerCase();
    }
    for (var i = 0; i < greenLine.length; i++) {
        if (greenLine[i] == 'inderlok')
        continue;
        else
        g.addstation(greenLine[i]);
    }
    for (var i = 0; i < (greenLine.length - 1); i++) {
        g.addEdge(greenLine[i], greenLine[i + 1], 2.49, "green");
    }

    //greenBranched
    for (var i = 0; i < greenBranched.length; i++) {
        greenBranchedLine[i] = greenBranched[i]["name"].toLowerCase();
    }
    for (var i = 0; i < greenBranchedLine.length; i++) {
        if (greenBranchedLine[i] == 'kirti nagar' || greenBranchedLine[i] == 'ashok park main')
        continue;
        else
        g.addstation(greenBranchedLine[i]);
    }
    for (var i = 0; i < (greenBranchedLine.length - 1); i++) {
        g.addEdge(greenBranchedLine[i], greenBranchedLine[i + 1], 1.33, "greenbranch");
    }

    //pinkLine
    for (var i = 0; i < pink.length; i++) {
        pinkLine[i] = pink[i]["name"].toLowerCase();
    }
    for (var i = 0; i < pinkLine.length; i++) {
        if (pinkLine[i] == 'azadpur' || pinkLine[i] == 'netaji subhash place' || pinkLine[i] == 'rajouri garden' || pinkLine[i] == 'dilli haat - ina' || pinkLine[i] == 'lajpat nagar' || pinkLine[i] == 'mayur vihar - i')
        continue;
        else
        g.addstation(pinkLine[i]);
    }
    for (var i = 0; i < (pinkLine.length - 1); i++) {
        g.addEdge(pinkLine[i], pinkLine[i + 1], 2.73, "pink");
    }

    //pinkBranchedLine
    for (var i = 0; i < pinkBranched.length; i++) {
        pinkBranchedLine[i] = pinkBranched[i]["name"].toLowerCase();
      }
      for (var i = 0; i < pinkBranchedLine.length; i++) {
        if (pinkBranchedLine[i] == 'anand vihar' || pinkBranchedLine[i] == 'karkarduma' || pinkBranchedLine[i] == 'welcome')
          continue;
        else
          g.addstation(pinkBranchedLine[i]);
      }
      for (var i = 0; i < (pinkBranchedLine.length - 1); i++) {
        g.addEdge(pinkBranchedLine[i], pinkBranchedLine[i + 1], 2.43, "pinkbranch");
      }

    //orange
    for (var i = 0; i < orange.length; i++) {
        orangeLine[i] = orange[i]["name"].toLowerCase();
    }
    for (var i = 0; i < orangeLine.length; i++) {
        if (orangeLine[i] == 'new delhi' || orangeLine[i] == 'dwarka sector 21')
        continue;
        else
        g.addstation(orangeLine[i]);
    }
    for (var i = 0; i < (orangeLine.length - 1); i++) {
        g.addEdge(orangeLine[i], orangeLine[i + 1], 5.2, "orange");
    }

    //  //aqua 
    // for (var i = 0; i < aqua.length; i++) {
    //     aquaLine[i] = aqua[i]["Hindi"].toLowerCase();
    // }
    // for (var i = 0; i < aquaLine.length; i++) {
    //     g.addstation(aquaLine[i]);
    // }
    // for (var i = 0; i < (aquaLine.length - 1); i++) {
    //     g.addEdge(aquaLine[i], aquaLine[i + 1], 2.86, "aqua");
    // }

    //grey

    for (var i = 0; i < grey.length; i++) {
        greyLine[i] = grey[i]["name"].toLowerCase();
    }
    for (var i = 0; i < greyLine.length; i++) {
        if (greyLine[i] == 'dwarka')
        continue;
        else
        g.addstation(greyLine[i]);
    }
    for (var i = 0; i < (greyLine.length - 1); i++) {
        g.addEdge(greyLine[i], greyLine[i + 1], 2.10, "grey");
    }

}


let g = new MetroMap();
getAllStations();

// console.log("GreyLine",greyLine);
module.exports = g;
