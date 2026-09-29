"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClient = exports.Queue = void 0;
exports.addTask = addTask;
class Queue {
    items = [];
    enqueue(item) {
        this.items.push(item);
    }
    dequeue() {
        return this.items.shift();
    }
    peek() {
        return this.items[0];
    }
    getSize() {
        return this.items.length;
    }
}
exports.Queue = Queue;
class ApiClient {
    async get(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Request Failed");
        }
        return response.json();
    }
}
exports.ApiClient = ApiClient;
function addTask(title) {
    return title;
}
//# sourceMappingURL=queue.js.map