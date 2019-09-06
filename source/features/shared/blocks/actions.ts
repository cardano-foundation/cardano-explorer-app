import Action from '../../../utils/Action';

export class SearchActions {
  public searchBlockById: Action<{ id: string }> = new Action();
}
