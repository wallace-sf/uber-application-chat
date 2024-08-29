export interface IEventBusProps {
  publish: <T>(event: string, ...args: T[]) => boolean;
  subscribe: (
    event: string,
    listener: EventListenerOrEventListenerObject,
  ) => void;
  unsubscribe: (event: string) => void;
}
