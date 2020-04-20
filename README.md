# algorithms

# Algorithms

Algorithms is a repository where i will store a few algorithms and tests.

## Running

To run the dependencies.js you need to set the graph up. Set the dependencies inside the array of each node.

```bash
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
```

To run the dijkstra.js you need to set the graph up and the vertex. The value is the weight.

```bash
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
}
```


## License
[MIT](https://choosealicense.com/licenses/mit/)
