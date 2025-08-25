import '@testing-library/jest-dom';

// Mock IntersectionObserver for jsdom
class IO {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = IO;
