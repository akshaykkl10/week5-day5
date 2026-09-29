export class Queue<T> {
    private items: T[] = []
    enqueue(item:T): void {
        this.items.push(item)
    }
    dequeue(): T | undefined{
        return this.items.shift()
    }
    peek():T | undefined{
        return this.items[0]
    }
    getSize():number {
        return this.items.length
    }
}

export class ApiClient {
    async get<T>(url: string): Promise<T> {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Request Failed");
        }

        return response.json() as Promise<T>;
    }
}

export function addTask(title: string){
    return title
}