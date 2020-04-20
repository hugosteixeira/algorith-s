class PriorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    };
    dequeue() {
        return this.values.shift();
    };
    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    };
}

class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }
    addVertex(name) {
        if (!this.adjacencyList[name]) {
            this.adjacencyList[name] = {};
        }
    }
    addEdge(vert1, vert2, weight) {
        this.adjacencyList[vert1][vert2] = weight;
        this.adjacencyList[vert2][vert1] = weight;
    }
    removeEdge(v1, v2) {
        delete this.adjacencyList[v1][v2];
        delete this.adjacencyList[v2][v1];
    }
    removeVertex(vert) {
        for (let i in this.adjacencyList[vert]) {
            this.removeEdge(vert, i);
        }
        delete this.adjacencyList[vert];
    }
    DFS(target) {
        const result = [];
        const visited = {};
        const helper = (vert) => {
            if (!vert) return null;
            visited[vert] = true;
            result.push(vert);
            for (let neighbor in this.adjacencyList[vert]) {
                if (!visited[neighbor]) {
                    return helper(neighbor)
                }
            }
        }
        helper(target);
        return result;
    }
    BFS(start) {
        const queue = [start];
        const result = [];
        const visited = {};
        while (queue.length) {
            let current = queue.shift();
            visited[current] = true;
            result.push(current)
            for (let neighbor in this.adjacencyList[current]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            }
        }
        return result;
    }

    Dijkstras(start, finish) {
        const costFromStartTo = {};
        const checkList = new PriorityQueue();
        const prev = {};
        let current;
        let result = [];
        for (let vert in this.adjacencyList) {
            if (vert === start) {
                costFromStartTo[vert] = 0;
                checkList.enqueue(vert, 0);
            } else {
                costFromStartTo[vert] = Infinity;
            }
            prev[vert] = null;
        }
        while (checkList.values.length) {
            current = checkList.dequeue().val;
            if (current === finish) {
                // Done
                while (prev[current]) {
                    result.push(current);
                    current = prev[current];
                }
                break;
            } else {

                for (let neighbor in this.adjacencyList[current]) {
                    let costToNeighbor = costFromStartTo[current] + this.adjacencyList[current][neighbor];
                    if (costToNeighbor < costFromStartTo[neighbor]) {
                        costFromStartTo[neighbor] = costToNeighbor;
                        prev[neighbor] = current;
                        checkList.enqueue(neighbor, costToNeighbor);
                    }
                }
            }
        }
        return result.concat(current).reverse();
    }
}

const graph = {
    "0" : {
        "1" : 2,
        "4" : 3
    },
    "1": {
        "3":8,
        "5":9,
        "6":6
    },
    "2": {
        "5":3,
        "6":7
    },
    "3":{
        "7":6
    },
    "4":{
        "6":5,
        "7":9
    },
    "5":{
        "6":4,
        "7":5
    }
}

const vertexs = ['0',"1","2","3","4","5","6","7"]

let g = new (WeightedGraph);

for (vertex in vertexs){
    g.addVertex(vertex);
}

for(node in graph) {
    for(relation in graph[node]) {
        g.addEdge(node,relation,graph[node][relation]);
    }
}

for(vertex1 in vertexs){
    const inicial = "0"; //Vertice inicial de procura
    let custo = 0;
    let caminho = g.Dijkstras(inicial,vertex1);
    for(node = 0; node < caminho.length-1;node++ ){
        custo = custo + g.adjacencyList[caminho[node]][caminho[node+1]];
    }
    caminho = caminho.join('-');
    custo = custo.toString();
    
    const result = vertex1+", "+custo+", "+caminho;
    console.log(result);
}


