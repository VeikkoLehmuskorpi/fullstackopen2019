import React, { Component } from 'react';
import axios from 'axios';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anecdotes: [],
      current: 0,
    };
  }

  componentDidMount = async () => {
    const response = await axios.get('http://localhost:3001/anecdotes');
    this.setState({
      anecdotes: response.data,
    });
  };

  handleClick = () => {
    const randomAnecdote = Math.floor(Math.random() * this.state.anecdotes.length);
    console.log(randomAnecdote);
    this.setState({
      current: randomAnecdote,
    });
  };

  render() {
    if (this.state.anecdotes.length === 0) {
      return <div>No anecdotes.</div>;
    }

    return (
      <div>
        <h1>Anecdote of the day</h1>
        <div>{this.state.anecdotes[this.state.current].content}</div>
        <button onClick={this.handleClick}>next</button>
      </div>
    );
  }
}

export default App;
