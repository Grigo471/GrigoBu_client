import { useDispatch } from 'react-redux';
import { Button } from '@/shared/ui/Button';
import { useCounterActions } from '../model/slice/counterSlice';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export function Counter() {
    const dispatch = useDispatch();

    const counterValue = useCounterValue();
    const { increment, decrement, add } = useCounterActions();

    const incrementHandler = () => {
        increment();
    };

    const decrementHandler = () => {
        decrement();
    };

    const addFiveHandler = () => {
        add(5);
    };

    return (
        <div>
            {/* eslint-disable */} 
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button
                onClick={incrementHandler}
                data-testid='increment-button'
            >
                increment
            </Button>
            <Button
                onClick={decrementHandler}
                data-testid='decrement-button'
            >
                decrement
            </Button>
            <Button
                onClick={addFiveHandler}
                data-testid='add-five-button'
            >
                add five
            </Button>
        </div>
    );
}
