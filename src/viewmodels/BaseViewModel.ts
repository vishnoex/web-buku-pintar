import { useState, useCallback } from 'react';

export class BaseViewModel<T> {
  protected state: T;
  protected setState: React.Dispatch<React.SetStateAction<T>>;

  constructor(initialState: T) {
    const [state, setState] = useState<T>(initialState);
    this.state = state;
    this.setState = setState;
  }

  protected updateState(partialState: Partial<T>): void {
    this.setState((prevState: T) => ({
      ...prevState,
      ...partialState,
    }));
  }

  protected resetState(): void {
    this.setState(this.state);
  }
} 