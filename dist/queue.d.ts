export declare class Queue<T> {
    private items;
    enqueue(item: T): void;
    dequeue(): T | undefined;
    peek(): T | undefined;
    getSize(): number;
}
export declare class ApiClient {
    get<T>(url: string): Promise<T>;
}
export declare function addTask(title: string): string;
//# sourceMappingURL=queue.d.ts.map