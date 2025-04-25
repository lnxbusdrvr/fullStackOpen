import React from 'react';

const Todo = ({ text, done }) => {
  return (
    <div>
      {text} {done}
    </div>
  );
};

export default Todo;

