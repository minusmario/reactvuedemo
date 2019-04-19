const setUserInput = text => ({
  type: 'SET_USER_INPUT',
  text,
});

const getListData = () => ({
  type: 'GET_LIST_DATA',
});

const fillListData = listData => ({
  type: 'FILL_LIST_DATA',
  listData,
});
export { setUserInput, getListData, fillListData };