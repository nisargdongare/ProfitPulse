import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../redux/slices/counterSlice';
import { RootState } from '../redux/store';

const CounterTest: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h2>Redux Counter Test</h2>
      <div>
        <button onClick={() => dispatch(decrement())}>-</button>
        <span style={{ margin: '0 20px', fontSize: '24px' }}>{count}</span>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
        <button onClick={() => dispatch(incrementByAmount(-5))} style={{ marginLeft: '10px' }}>-5</button>
      </div>
    </div>
  );
};

export default CounterTest;
