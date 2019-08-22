import Action from '../../utils/Action';

export class BlocksActions {
  public searchBlockById: Action<{ id: string }> = new Action();
}
