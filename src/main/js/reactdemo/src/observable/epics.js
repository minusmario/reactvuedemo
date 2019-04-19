import { ajax } from 'rxjs/ajax';
import { fillListData } from '../redux/actions';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

const getListDataEpic = action$ => action$.ofType('GET_LIST_DATA').debounceTime(1000).mergeMap(
  () => ajax.getJSON('/example').map(response => fillListData(response)),
);

export default getListDataEpic;