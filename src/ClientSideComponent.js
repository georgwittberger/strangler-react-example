import React, { Component } from 'react';
import './ClientSideComponent.css';

/**
 * Component intended for client-side rendering only.
 * 
 * It is safe to use lifecycle hooks and asynchronous initialization in this kind of component.
 */
class ClientSideComponent extends Component {
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
      <div className="client-side-component" onClick={this.handleClick}>
        <h2 className="client-side-component__title">{this.state.title}</h2>
        <p className="client-side-component__text">{this.state.text}</p>
      </div>
    );
  }

  handleClick() {
    this.setState((prevState) => ({
      text: 'Oh yes, keep touching me! 🤗'
    }));
  }
}

export default ClientSideComponent;
