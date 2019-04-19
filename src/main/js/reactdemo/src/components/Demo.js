import React, { Component } from 'react';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      preset: '这是一段预置文本',
    };
  }

  updateUserInput(e) {
    this.setState({ userInput: e.target.value });
  }

  render() {
    return (
      <div>
        <label htmlFor='input'>请输入任意字符：</label>
        <input type="text" value={this.state.userInput}
               onChange={(e) => this.updateUserInput(e)}/>
        <p>您输入的字符依次为：{this.state.userInput}</p>
        <button type='button' onClick={() => this.setState(
          { userInput: this.state.preset })}>点击此处将输入框文本替换为预置文本
        </button>
      </div>
    );
  }
}

export default Demo;
