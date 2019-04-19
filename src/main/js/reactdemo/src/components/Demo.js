import React, { Component } from 'react';
import setUserInput from '../redux/actions';
import { connect } from 'react-redux';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preset: '这是一段预置文本',
    };
  }

  render() {
    return (
      <div>
        <label htmlFor='input'>请输入任意字符：</label>
        <input type="text" value={this.props.userInput}
               onChange={(e) => this.props.setUserInput(e.target.value)}/>
        <p>您输入的字符依次为：{this.props.userInput}</p>
        <button type='button' onClick={() => this.props.setUserInput(
          this.state.preset)}>点击此处将输入框文本替换为预置文本
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    userInput: state.demo.userInput,
  };
};

const mapDispatchToProps = {
  setUserInput,
};
export default connect(mapStateToProps, mapDispatchToProps)(Demo);
