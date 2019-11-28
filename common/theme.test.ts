import { DateTime } from 'luxon';

import { approximateLongitudeFromTimezone, getDaylightTemperature } from './theme';

describe('approximateLongitudeFromTimezone', () => {
  test('US Eastern Standard Time', () => {
    expect(
      approximateLongitudeFromTimezone(
        DateTime.fromISO('2019-06-08T04:20:00-05:00', { setZone: true }),
      ),
    ).toMatchInlineSnapshot(`-75`);
  });

  test('US Pacific Standard Time', () => {
    expect(
      approximateLongitudeFromTimezone(
        // US Pacific Standard Time
        DateTime.fromISO('2019-06-08T04:20:00-08:00', { setZone: true }),
      ),
    ).toMatchInlineSnapshot(`-120`);
  });
});

describe('getDaylightTemperature', () => {
  test('day', () => {
    expect(
      getDaylightTemperature(DateTime.fromISO('2019-06-08T14:20:00-05:00', { setZone: true })),
    ).toMatchInlineSnapshot(`6500`);
  });

  test('evening start', () => {
    expect(
      getDaylightTemperature(DateTime.fromISO('2019-06-08T16:50:00-05:00', { setZone: true })),
    ).toMatchInlineSnapshot(`5631.430249236464`);
  });

  test('evening end', () => {
    expect(
      getDaylightTemperature(DateTime.fromISO('2019-06-08T17:50:00-05:00', { setZone: true })),
    ).toMatchInlineSnapshot(`3793.727298174929`);
  });

  test('night', () => {
    expect(
      getDaylightTemperature(DateTime.fromISO('2019-06-08T04:20:00-05:00', { setZone: true })),
    ).toMatchInlineSnapshot(`3500`);
  });

  test('morning start', () => {
    expect(
      getDaylightTemperature(DateTime.fromISO('2019-06-08T06:20:00-05:00', { setZone: true })),
    ).toMatchInlineSnapshot(`4130.623069876323`);
  });

  test('morning end', () => {
    expect(
      getDaylightTemperature(DateTime.fromISO('2019-06-08T07:20:00-05:00', { setZone: true })),
    ).toMatchInlineSnapshot(`5966.026008208231`);
  });
});
