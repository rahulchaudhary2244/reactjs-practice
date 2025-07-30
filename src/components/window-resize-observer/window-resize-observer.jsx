import { useWindowResizeObserver } from './use-window-resize-observer';

export const WindowResizeObserver = () => {
  const { height, width } = useWindowResizeObserver();

  return (
    <div>
      <div>{`width: ${width}px, height: ${height}px`}</div>
    </div>
  );
};
