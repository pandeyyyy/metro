class PriorityQueue {
    constructor() {
      this.collection = [];
    }
    enqueue(element) {
      if (this.isEmpty()) {
        this.collection.push(element);
      } else {
        let added = false;
        for (let i = 1; i <= this.collection.length; i++) {
          if (element[1] < this.collection[i - 1][1]) {
            this.collection.splice(i - 1, 0, element);
            added = true;
            break;
          }
        }
        if (!added) {
          this.collection.push(element);
        }
      }
    };
     dequeue() {
      let value = this.collection.shift();
      return value;
    };

    isEmpty() {
      return (this.collection.length === 0)
    };
  }

function findFastestPath(adj, start, end,stations) {

    var fastestPath = [end];
    let pq = new PriorityQueue();
    
    var validStart =0, validEnd =0 ;
    let times = {};
    let backtrace = {};
    times[start] = 0;
    stations.forEach(node => {
        if(node==start) {
          validStart=1
        }
        if(node==end) {
          validEnd =1
        }
        if (node !== start) {
          times[node] = Infinity
        }
      });

      
      if(validStart == 0 && validEnd ==0)
            return {
            "message":"Enter valid Start and End Station"
        };
        else if(validStart == 0){
            return {"message":"Enter valid Start Station"};
        }
        else if(validEnd == 0){
            return {"message":"Enter valid End Station"};
        }

pq.enqueue([start, 0]);

    while (!pq.isEmpty()) {
        let shortestStep = pq.dequeue();
        let currentNode = shortestStep[0];

        adj[currentNode].forEach(neighbor => {
          let time = times[currentNode] + neighbor.time;

          if (currentNode != start) {
            if (getline(currentNode, neighbor.station,adj) != getline(currentNode, backtrace[currentNode],adj)) {
                
              if (currentNode == 'Yamuna Bank' && neighbor.station == 'Indraprastha' && backtrace[currentNode] == 'Laxmi Nagar') {
           
              }
              else if (currentNode == 'Yamuna Bank' && neighbor.station == 'Laxmi Nagar' && backtrace[currentNode] == 'Indraprastha') {
                
              }
              else if (currentNode == 'Ashok Park Main' && neighbor.station == 'Punjabi Bagh' && backtrace[currentNode] == 'Satguru Ram Singh Marg') {
               
              }
              else if (currentNode == 'Ashok Park Main' && neighbor.station == 'Satguru Ram Singh Marg' && backtrace[currentNode] == 'Punjabi Bagh') {
  
              }
              else
                time = time + 9;
            }
          }
  
          if (time < times[neighbor.station]) {
            times[neighbor.station] = time;
            backtrace[neighbor.station] = currentNode;
            pq.enqueue([neighbor.station, time]);
          }
        });
    }
    
   
    let lastStep = end;
    var totalTime=times[end];
    while (lastStep !== start) {
        fastestPath.unshift(backtrace[lastStep]);
        lastStep = backtrace[lastStep];
    }

    finalPath=[];
    interChanges=[];
    var color2=getline(fastestPath[0],fastestPath[1],adj)+'Color';
    finalPath.push({ "station":fastestPath[0],
                              "color1":null,
                              "color2":color2,
                            });

    for(var i=1;i<fastestPath.length;i++) {
           var color1=getline(fastestPath[i-1],fastestPath[i],adj)+'Color';
           var color2=null;

           if(i+1<fastestPath.length){
            color2=getline(fastestPath[i],fastestPath[i+1],adj);
           }

           if(color2)
           color2=color2+'Color';

                       finalPath.push({ "station":fastestPath[i],
                                        "color1":color1,
                                        "color2":color2,
                                      });

                       if(color1 && color2 && color1!==color2){
                        interChanges.push(fastestPath[i]);
                       }               
    }

    // DEBUG LOGS ADDED HERE
    console.log('=== DEBUG FARE CALCULATION ===');
    console.log('finalPath.length:', finalPath.length);
    
    const estimatedFare = calculateFare(finalPath.length);
    console.log('estimatedFare returned:', estimatedFare);
    
    const result = {finalPath, totalTime, interChanges, estimatedFare};
    console.log('Final result object:', result);
    console.log('=== END DEBUG ===');
    
    return result;
}
            

function getline(sta1, sta2, adj) {
    for (var i = 0; i < adj[sta1].length; i++) {
        if (adj[sta1][i].station == sta2){
          return (adj[sta1][i].line);
        }
      }
    
    for (var i = 0; i < adj[sta2].length; i++) {
        if (adj[sta2][i].station == sta1){
          return (adj[sta2][i].line);
        }
      }

    return null; 
}

function calculateFare(numStations) {
    console.log('calculateFare called with numStations:', numStations);
    
    // Calculate distance (assuming 1km average per station hop) - FIXED SYNTAX ERROR
    const distance = (numStations - 1) * 1; // in km
    console.log('calculated distance:', distance);
    
    let fare;
    // Latest Delhi Metro fare structure (Aug 2025)
    if (distance <= 2) fare = 11;
    else if (distance <= 5) fare = 21;
    else if (distance <= 12) fare = 32;
    else if (distance <= 21) fare = 43;
    else if (distance <= 32) fare = 54;
    else fare = 64;
    
    console.log('calculated fare:', fare);
    return fare;
}

module.exports = { findFastestPath };
