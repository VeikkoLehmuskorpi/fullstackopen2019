import React from 'react';
import Part from './Part';
import Total from './Total';

const Content = ({ course }) => {
  const partRows = () =>
    course.parts.map((course, index) => (
      <Part
        key={course.id || index}
        name={course.name}
        exercises={course.exercises}
      />
    ));

  return (
    Boolean(course.parts) && (
      <div>
        {partRows()}
        <Total course={course} />
      </div>
    )
  );
};

export default Content;
