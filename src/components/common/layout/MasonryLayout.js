import React from 'react';

// eslint-disable-next-line max-lines-per-function
export default (props) => {
  const column_wrapper = {};
  const result = [];
  let {children} = props;
  if (!children.length) {
    // eslint-disable-next-line fp/no-mutation
    children = [children];
  }

  // eslint-disable-next-line fp/no-loops,fp/no-mutation
  for (let i = 0; i < props.columns; i++) {
    // eslint-disable-next-line fp/no-mutation
    column_wrapper[`column${i}`] = [];
  }

  // eslint-disable-next-line fp/no-loops,fp/no-mutation
  for (let i = 0; i < children.length; i++) {
    const column_index = i % props.columns;
    // eslint-disable-next-line fp/no-mutating-methods
    column_wrapper[`column${column_index}`].push(
      <div style={{marginTop: `${props.gap}px`}}>
        {children[i]}
      </div>
    );
  }

  // eslint-disable-next-line fp/no-loops,fp/no-mutation
  for (let i = 0; i < props.columns; i++) {
    // eslint-disable-next-line fp/no-mutating-methods
    result.push(
      <div
        style={{
          marginLeft: `${i > 0 ? props.gap : 0}px`,
          flex: 1,
        }}
      >
        {column_wrapper[`column${i}`]}
      </div>
    );
  }

  return (
    <div
      style={{display: 'flex'}}
      className={props.className}
      id={props.id}
    >
      {result}
    </div>
  );
};
