import { DeferredHook } from './components/concurrent-hooks-example/deferred-hook';
import { OptimisticHook } from './components/concurrent-hooks-example/optimistic-hook';
import { TransitionHook } from './components/concurrent-hooks-example/transition-hook';
import { HocExample } from './components/hoc/hoc';
import { ImageCarousel } from './components/image-carousel/image-carousel';
import { InfiniteScrollWithPosts } from './components/infinite-scroll-with-posts/infinite-scroll-with-posts';
import { NestedCheckboxes } from './components/nested-checkboxes';
import { Polyfills } from './components/polyfills/polyfills';
import { VirtualizedListExample } from './components/virtualized-list-example/virtualized-list-example';

const App = () => {
  return (
    <div className="m-3">
      {/* <Polyfills />
      <HocExample /> */}
      {/* <InfiniteScrollWithPosts /> */}
      {/* <VirtualizedListExample /> */}
      {/* <ImageCarousel /> */}
      {/* <TransitionHook /> */}
      {/* <DeferredHook /> */}
      {/* <OptimisticHook /> */}
      <NestedCheckboxes />
    </div>
  );
};

export default App;
