import React, { useEffect, useRef, useState } from 'react';
import { Message } from '@fineboard/api-interfaces';

function useInterval(callback, delay) {
  const savedCallback: any = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback !== undefined) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function Counter() {
  let [count, setCount] = useState(0);

  useInterval(() => {
    // Your custom logic here
    setCount(count + 1);
  }, 1000);

  return <h1>{count}</h1>;
}

export const App = () => {
  const { useState, useEffect } = React;

  const [counter, setCounter] = useState(0);

  useInterval(() => {
    // Your custom logic here
    setCounter(counter + 1);
  }, 1000);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to fineboard v0.0.0.1!</h1>
        <img src={`/api/assets/nx-logo.png?random=${Math.random()}`} />
        <h1>{counter}</h1>
      </div>
    </>
  );
};

export default App;
