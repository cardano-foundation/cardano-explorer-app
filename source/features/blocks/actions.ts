import Action from '../../lib/Action';

export class SearchActions {
  public searchBlockById: Action<{ id: string }> = new Action();
}
