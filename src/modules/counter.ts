import { createAction , ActionType, createReducer } from 'typesafe-actions';

const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';
const INCREASE_BY = 'counter/INCREASE_BY';

export const increase = createAction(INCREMENT)();
export const decrease = createAction(DECREMENT)();
export const increaseBy = createAction(INCREASE_BY)<number>();
// export const increaseBy = createAction(INCREASE_BY)().map((num:number)=>({payload : num}));

const actions = { increase, decrease, increaseBy };
type CounterAction = ActionType<typeof actions>;

type CounterState = {
    count: number;
}
const initialState: CounterState = {
    count: 0
};

const counter = createReducer<CounterState, CounterAction>(initialState, {
    [INCREMENT] : state => ({ count : state.count + 1}),
    [DECREMENT] : state => ({ count : state.count -1 }),
    [INCREASE_BY] : (state, action) => ({count : state.count + action.payload})
})

export default counter;