import { DetailPage } from "@pages/DetailPage";
import { HomePage } from "@pages/Homepage";
import { ListPage } from "@pages/ListPage";
import { SettingsPage } from "@pages/SettingsPage";
import { createRouter, getRouteFromHash, routes } from "@router/router";
import type { Action, State, Task } from "@src/types";
import { createStore } from "@utils/store";

const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || `[]`)

const hashRoute = getRouteFromHash()
const intialState: State = {
    route: hashRoute.path,
    params: hashRoute.params,
    tasks: tasks || []
};

export function reducer(state: State, action: Action): State{
    if (action.type == "ROUTE_CHANGED"){
        return {
            ...state,
            route:action.payload.path,
            params: action.payload.params
        }
    }
    if (action.type == "TASK_ADDED") {
        return {
            ...state,
            tasks:[
                ...state.tasks,
                {
                    id: Date.now(),
                    title: action.payload.title
                }
            ]
        }
    }
    if (action.type == "TASK_DELETED") {
        return{
            ...state,
            tasks: state.tasks.filter(task => task.id != action.payload.task.id)
        }
    }
    if (action.type == "TASK_UPDATED") {
        return{
            ...state,
            tasks: state.tasks.map(task => (
                task.id == action.payload.task.id 
                ? {...task, title:action.payload.task.title}
                : task
            ))
        }
    }
    return state
}

export const store = createStore(intialState, reducer)


export function render(): void {
    const app = document.body.querySelector("#app")
    if (!app || app == undefined) return
    const state = store.getState();
    const params:{state: State, dispatch: (action: Action) => void} = {
        state: state,
        dispatch: store.dispatch
    }
    let component = routes.get(state.route);
    if(state.route.startsWith('/detail')) {
        component = routes.get('/detail')
        
    }
    if(!component) return
    if( component == undefined) return
    app.replaceChildren(component(params));
}

store.subscribe(render)

const router = createRouter(store.dispatch)
router.register("/", HomePage)
router.register("/settings", SettingsPage)
router.register("/list", ListPage)
router.register("/detail", DetailPage)

render()
