//EASY USE OF COUNTER HOOK
//  SIMPLY IMPORT THIS HOOK IN YOU CODE
//  const quantity = useCounter(0);
//  TO INCREASE COUNTER VALUE SIMPLY USE LIKE THIS
//  quantity={quantity.value}
//  onIncrement={quantity.increment}
//  onDecrement={quantity.decrement}
//  onReset={quantity.reset}

import { useState } from 'react';

const useCounter = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const increment = () => setValue((e) => e + 1);
  const decrement = () => setValue((e) => e - 1);
  const reset = () => setValue(initialValue);

  return { value, increment, decrement, reset };
};

export default useCounter;
