import * as querystring from 'querystring';
import { INavigationRouterDependency } from '../index';

/**
 * Minimal navigation router mock that simulates the API
 * of NextRouter for testing.
 */
export class NavigationRouterMock implements INavigationRouterDependency {
  public readonly pathname = '';
  public readonly query = {};
  public readonly events = {
    off: () => {
      this.eventType = null;
      this.callback = null;
    },
    on: (type: string, callback: (url: string) => void) => {
      this.eventType = type;
      this.callback = callback;
    },
  };
  private eventType: string | null = null;
  private callback: ((url: string) => void) | null = null;
  public push({ pathname, query }: { pathname?: string; query?: object }) {
    if (this.callback && this.eventType === 'routeChangeComplete') {
      const qs = querystring.stringify(query);
      this.callback(`http://localhost:4000/${pathname}?${qs}`);
    }
  }
}
