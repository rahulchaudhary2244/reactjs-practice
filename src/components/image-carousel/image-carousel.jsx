import { useRef } from 'react';

export const ImageCarousel = ({ images = IMAGES, height = 400, width = 600 }) => {
  const containerRef = useRef();

  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += width;
    }
  };

  const handlePrevious = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= width;
    }
  };

  return (
    <div className="relative" style={{ height, width }}>
      <div className="w-fit flex overflow-auto scroll-smooth" ref={containerRef}>
        {images.map((image) => (
          <img key={image.src} src={image.src} alt={image.alt} className="object-cover w-full" />
        ))}
      </div>

      <button
        className="h-10 w-10 rounded-full hover:bg-gray-400 cursor-pointer text-white bg-gray-600 text-xl font-bold absolute left-4 -translate-y-1/2 top-1/2"
        aria-label="Previous button"
        onClick={handlePrevious}
      >
        {'<'}
      </button>
      <button
        className="h-10 w-10 rounded-full hover:bg-gray-400 cursor-pointer text-white bg-gray-600 text-xl font-bold absolute right-4 -translate-y-1/2 top-1/2"
        aria-label="Next button"
        onClick={handleNext}
      >
        {'>'}
      </button>
    </div>
  );
};

const IMAGES = [
  {
    src: 'https://picsum.photos/id/600/600/400',
    alt: 'Forest',
  },
  {
    src: 'https://picsum.photos/id/100/600/400',
    alt: 'Beach',
  },
  {
    src: 'https://picsum.photos/id/200/600/400',
    alt: 'Yak',
  },
  {
    src: 'https://picsum.photos/id/300/600/400',
    alt: 'Hay',
  },
  {
    src: 'https://picsum.photos/id/400/600/400',
    alt: 'Plants',
  },
  {
    src: 'https://picsum.photos/id/500/600/400',
    alt: 'Building',
  },
];
