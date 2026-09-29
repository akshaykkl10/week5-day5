export class Queue {
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
export class ApiClient {
    async get(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Request Failed");
        }
        return response.json();
    }
}
export function addTask(title) {
    return title;
}
//# sourceMappingURL=queue.js.map