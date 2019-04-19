import React, { Component } from 'react';
import { setUserInput, getListData } from '../redux/actions';
import { connect } from 'react-redux';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preset: '这是一段预置文本',
    };
  }

  deriveState(state) {
    switch (state) {
      case 0 :
        return '用户没有点击按钮';
      case 1:
        return '距离上次用户点击按钮不到1秒，不发送请求';
      case 2:
        return '距离用户上次点击超过1秒，发送请求';
      default:
        return '';
    }
  }

  render() {
    const listData = this.props.listData.map(item => <li key={item.row}>
      <span>数据编号为：{item.row}</span><br/><span>数据内容为：{item.data}</span></li>);
    return (
      <div>
        <label htmlFor='input'>请输入任意字符：</label>
        <input type="text"
               value={this.props.userInput}
               onChange={(e) => this.props.setUserInput(e.target.value)}/>
        <p>您输入的字符依次为：{this.props.userInput}</p>
        <span>当前状态：{this.deriveState(this.props.state)}</span><br/>
        <button type='button'
                onClick={() => this.props.setUserInput(this.state.preset)}>
          点击此处将输入框文本替换为预置文本
        </button>
        <button type='button'
                onClick={() => this.props.getListData()}>
          点击此处获取列表数据
        </button>
        <ul>{listData}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInput: state.demo.userInput,
    listData: state.demo.listData,
    state: state.demo.state,
  };
};

const mapDispatchToProps = {
  setUserInput,
  getListData,
};
export default connect(mapStateToProps, mapDispatchToProps)(Demo);
