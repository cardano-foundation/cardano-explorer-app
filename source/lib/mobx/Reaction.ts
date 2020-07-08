import { autorun } from 'mobx';

export default class Reaction {
  private readonly reaction: () => void;

  private isRunning: boolean = false;

  private dispose: (() => void) | null = null;

  constructor(reaction: () => void) {
    this.reaction = reaction;
  }

  public start() {
    if (!this.isRunning) {
      this.dispose = autorun(this.reaction);
      this.isRunning = true;
    }
  }

  public stop() {
    if (this.isRunning && this.dispose) {
      this.dispose();
      this.isRunning = false;
    }
  }
}

export const createReactions = (reactions: Array<() => void>) =>
  reactions.map((r) => new Reaction(r));
