import React from 'react';

const Total = ({ course }) => {
  const parts = course.parts;

  const getTotalExercises = () => {
    const exercisesArr = parts.map(part => part.exercises);
    return exercisesArr.reduce((a, b) => a + b);
  };

  return <h3>total of {getTotalExercises()} exercises</h3>;
};

export default Total;
