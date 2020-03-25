const INCREMENT = 'counter/INCREMENT' as const;
const DECREMENT = 'counter/DECREMENT' as const;
const INCREASE_BY = 'counter/INCREASE_BY' as const;

export const increase = () => ({ type: INCREMENT });
export const decrease = () => ({ type: DECREMENT });
export const increaseBy = (diff: number) => ({
    type: INCREASE_BY,
    payload: diff
});

type CounterAction =
    | ReturnType<typeof increase>
    | ReturnType<typeof decrease>
    | ReturnType<typeof increaseBy>;

type CounterState = {
    count: number;
}
const initialState: CounterState = {
    count: 0
};

const counter = (state = initialState, action: CounterAction) => {
    switch (action.type) {
        case INCREMENT:
            return { count: state.count + 1 };
        case DECREMENT:
            return { count: state.count - 1 };
        case INCREASE_BY:
            return { count: state.count + action.payload };
        default:
            return state;
    }
};

export default counter;