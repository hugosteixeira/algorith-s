let graph = {
    "0": ["2"],
    "1": [],
    "2": ["1"],
    "3": ["0","1"],
    "4": [],
    "5": ["3"],
    "6": ["5", "4", "2"],
    "7": ["5", "6"]
}

function checkGraph() {
    for (node in graph) {
        if (graph[node].length != 0) {
            return false
        }
    }
    return true
}

function load(graph) {
    let result = []
    while (!checkGraph()) {
        for (node in graph) {
            if (graph[node].length == 0) {
                for (node1 in graph) {
                    if (graph[node1].indexOf(node) != -1) {
                        graph[node1].splice(graph[node1].indexOf(node), 1)
                        result.push(node)
                    }
                }
            }
        }
    }
    result = result.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    });
    return result
}

console.log(load(graph))