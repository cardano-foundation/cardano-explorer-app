import { SearchActions } from './actions';
import { SearchApi } from './api';
import { SearchStore } from './store';

export interface ISearchContext {
  actions: SearchActions;
  api: SearchApi;
  store: SearchStore;
}
