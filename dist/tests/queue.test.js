import { describe, expect, it, vi } from "vitest";
import { addTask, ApiClient, Queue } from "../src/queue";
import { reducer } from "./store.test";
describe("Queue", () => {
    it("Tests number queue", () => {
        const queue = new Queue();
        queue.enqueue(1);
        queue.enqueue(1);
        expect(queue.peek()).toEqual(1);
        expect(queue.getSize()).toEqual(2);
        expect(queue.dequeue()).toEqual(1);
        expect(queue.peek()).toEqual(1);
    });
    it("Tests string queue", () => {
        const queue = new Queue();
        queue.enqueue("akshay");
        queue.enqueue("kumar");
        expect(queue.peek()).toEqual("akshay");
        expect(queue.getSize()).toEqual(2);
        expect(queue.dequeue()).toEqual("akshay");
        expect(queue.peek()).toEqual("kumar");
    });
    it("Tests object queue", () => {
        const queue = new Queue();
        queue.enqueue({ id: 1, title: "Learn TS Test" });
        expect(queue.peek()).toEqual({ id: 1, title: "Learn TS Test" });
        expect(queue.getSize()).toEqual(1);
        expect(queue.dequeue()).toEqual({ id: 1, title: "Learn TS Test" });
        expect(queue.peek()).toBe(undefined);
    });
});
describe("Api Client", () => {
    it("tests the ApiClient with mocked fetch", async () => {
        const client = new ApiClient();
        const mockFetch = vi.fn();
        globalThis.fetch = mockFetch;
        mockFetch.mockResolvedValue({
            ok: true,
            json: async () => ({
                id: 1,
                name: "akshay"
            })
        });
        const user1 = {
            id: 1,
            name: "akshay"
        };
        const user = await client.get("/user/1");
        expect(user).toEqual(user1);
    });
    it("tests the ApiClient with mocked fetch failure", async () => {
        const client = new ApiClient();
        const mockFetch = vi.fn();
        globalThis.fetch = mockFetch;
        mockFetch.mockResolvedValue({
            ok: false,
            json: async () => ({
                id: 1,
                name: "akshay"
            })
        });
        await expect(async () => await client.get("/users/1")).rejects.toThrow("Request Failed");
    });
});
describe("isolated types test for state, action", () => {
    const initialState = {
        route: "/",
        params: {},
        tasks: []
    };
    const action = {
        type: "TASK_ADDED",
        payload: {
            title: "Learn TypeScript"
        }
    };
    it("adds a task", () => {
        const nextState = reducer(initialState, action);
        expect(nextState.tasks).toHaveLength(1);
        expect(nextState.tasks[0].title).toBe("Learn TypeScript");
    });
});
describe("ts type error comments", () => {
    it("commented some lines that may make the ts compile errors", () => {
        const task = addTask("new task");
        expect(task).toEqual("new task");
        // const task2 = addTask(124)
    });
});
//# sourceMappingURL=queue.test.js.map