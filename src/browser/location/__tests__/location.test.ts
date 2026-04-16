import { getLocaltion } from '../index';

describe('Location', () => {
  const originalGeolocation = global.navigator.geolocation;

  beforeAll(() => {
    Object.defineProperty(global.navigator, 'geolocation', {
      value: {
        getCurrentPosition: jest.fn().mockImplementation((success) => {
          success({
            coords: {
              latitude: 30,
              longitude: 120,
            },
          });
        }),
      },
      writable: true,
    });
  });

  afterAll(() => {
    Object.defineProperty(global.navigator, 'geolocation', {
      value: originalGeolocation,
      writable: true,
    });
  });

  it('should return a promise resolving to latitude and longitude', async () => {
    const location = await getLocaltion();
    expect(location).toEqual({ latitude: 30, longitude: 120 });
    expect(global.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
  });
});
