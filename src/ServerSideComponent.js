import React, { Component } from 'react';
import './ServerSideComponent.css';

/**
 * Component intended for server-side rendering.
 * 
 * IMPORTANT: We cannot rely on lifecycle hooks or asynchronous initialization during server-side rendering.
 * All initial data which must be visible in pre-rendered HTML must be passed as props.
 * See factory function in server-side-components.js for a clue how to fetch initial data asynchronously.
 */
class ServerSideComponent extends Component {
  /**
   * Creates a new component.
   *
   * @param {Object} props Initial data for the component.
   * @param {string} props.title Initial title of the component.
   * @param {string} props.text Initial text content of the component.
   */
  constructor(props) {
    super(props);
    this.state = { title: props.title, text: props.text };
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div className="server-side-component" onClick={this.handleClick}>
        <h2 className="server-side-component__title">{this.state.title}</h2>
        <p className="server-side-component__text">{this.state.text}</p>
      </div>
    );
  }

  handleClick() {
    this.setState((prevState) => ({
      text: 'Oh yes, keep touching me! 🤗'
    }));
  }
}

export default ServerSideComponent;
