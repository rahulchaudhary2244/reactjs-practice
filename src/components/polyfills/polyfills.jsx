import {
  customFilterPolyFill,
  customIncludesPolyFill,
  customMapPolyFill,
  customReducePolyFill,
} from './utils';

export const Polyfills = () => {
  return (
    <div className="text-4xl p-9 m-9">
      {JSON.stringify({
        customMapPolyFill,
        customReducePolyFill,
        customFilterPolyFill,
        customIncludesPolyFill,
      })}
    </div>
  );
};
