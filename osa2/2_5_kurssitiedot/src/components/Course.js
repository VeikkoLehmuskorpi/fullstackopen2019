import React from 'react';
import Header from './Header';
import Content from './Content';

const Course = ({ courses }) => {
  const courseRows = () =>
    courses.map((course, index) => (
      <div key={index}>
        <Header key={course.id} course={course} />
        <Content key={course.id} course={course} />
      </div>
    ));

  return (
    <>
      <h1>Web development curriculum</h1>
      {Boolean(courses) && courseRows()}
    </>
  );
};

export default Course;
