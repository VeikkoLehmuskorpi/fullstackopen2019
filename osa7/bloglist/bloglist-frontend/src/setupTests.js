// jest.setup.js

// add some helpful assertions
import '@testing-library/jest-dom/extend-expect';

// this is basically: afterEach(cleanup)
import '@testing-library/react/cleanup-after-each';

// mock localstorage api
let savedItems = {};

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item;
  },
  getItem: key => savedItems[key],
  clear: (savedItems = {}),
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// supress unnecessary act() warning
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
