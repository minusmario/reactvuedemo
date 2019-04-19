<template>
    <div class="about">
        <h1>This is an about page</h1>
        <label for='input'>请输入任意字符：</label>
        <input id='input' type='text' v-model='userInput'>
        <p>您输入的字符依次为：{{userInput}}</p>
        <button type='button' @click='updateUserInput()'>点击此处将输入框文本替换为预置文本</button>
        <button type='button' @click='getListData()'>点击此处获取列表数据</button>
        <ul>
            <li v-for="data in listData" :key="data.row">
                <span>数据编号为：{{data.row}}</span><br><span>数据内容为：{{data.data}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'about',
    data() {
      return {
        preset: '这是一段预置文本',
      };
    },
    computed: {
      userInput: {
        get: function () {
          return this.$store.state.userInput;

        },
        set: function (value) {
          this.$store.commit('setUserInput', { textValue: value });
        },
      },
      listData: {
        get: function () {
          return this.$store.state.listData;
        },
      },
    },
    methods: {
      updateUserInput() {
        this.$store.commit('setUserInput', { textValue: this.preset });
      },
      getListData() {
        this.$store.dispatch('getListData');
      },
    },
  };
</script>
