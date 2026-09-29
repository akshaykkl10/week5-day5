"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStore = createStore;
function createStore(initialState, reducer) {
    let state = initialState;
    function getState() {
        return state;
    }
    const subscribers = new Set();
    function dispatch(action) {
        state = reducer(state, action);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
        subscribers.forEach(subscriber => {
            subscriber();
        });
    }
    function subscribe(callback) {
        subscribers.add(callback);
        return function unsubscribe() {
            subscribers.delete(callback);
        };
    }
    return {
        getState,
        dispatch,
        subscribe
    };
}
//# sourceMappingURL=store.js.map