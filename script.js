function calculateMinCost() {
    var ropeInput = document.getElementById("ropeLengths").value;
    var ropeLengths = ropeInput.split(',').map(Number);

    var minCost = findMinCost(ropeLengths);

    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Minimum cost of connecting ropes: " + minCost;
}

function findMinCost(ropeLengths) {
    if (ropeLengths.length <= 1) {
        return 0;
    }

    var minHeap = new MinHeap();
    for (var i = 0; i < ropeLengths.length; i++) {
        minHeap.insert(ropeLengths[i]);
    }

    var totalCost = 0;
    while (minHeap.size() > 1) {
        var sum = minHeap.extractMin() + minHeap.extractMin();
        totalCost += sum;
        minHeap.insert(sum);
    }

    return totalCost;
}

class MinHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    insert(value) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }

    extractMin() {
        if (this.size() === 0) {
            return null;
        }

        const minValue = this.heap[0];
        const lastValue = this.heap.pop();

        if (this.size() > 0) {
            this.heap[0] = lastValue;
            this.bubbleDown(0);
        }

        return minValue;
    }

    bubbleUp(index) {
        const parentIndex = Math.floor((index - 1) / 2);

        if (index > 0 && this.heap[index] < this.heap[parentIndex]) {
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            this.bubbleUp(parentIndex);
        }
    }

    bubbleDown(index) {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let smallest = index;

        if (leftChildIndex < this.size() && this.heap[leftChildIndex] < this.heap[smallest]) {
            smallest = leftChildIndex;
        }

        if (rightChildIndex < this.size() && this.heap[rightChildIndex] < this.heap[smallest]) {
            smallest = rightChildIndex;
        }

        if (smallest !== index) {
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            this.bubbleDown(smallest);
        }
    }
}