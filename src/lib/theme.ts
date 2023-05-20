import chroma from 'chroma-js';
import { DateTime } from 'luxon';
import * as sun from 'suncalc';

/**
 * Given a datetime, determine the approximate longitude of its time zone.
 */
export const approximateLongitudeFromTimezone = (datetime: DateTime) =>
  (datetime.offset * 360) / (24 * 60);

/**
 * A mapping of the current time of day to a colour temperature, based on the current sun altitude
 * (solar elevation angle).
 * A warmer colour (3500K) is used during night time, and a cooler colour (6500K) during day time.
 *
 * See also:
 *  - https://en.wikipedia.org/wiki/Color_temperature
 *  - https://justgetflux.com/research.html
 *  - https://en.wikipedia.org/wiki/Solar_zenith_angle
 *  - https://github.com/mourner/suncalc
 */
export const getDaylightTemperature = (datetime: DateTime) => {
  const MIN_TEMPERATURE_KELVINS = 6000;
  const MAX_TEMPERATURE_KELVINS = 6500;
  const TEMPERATURE_RANGE = MAX_TEMPERATURE_KELVINS - MIN_TEMPERATURE_KELVINS;

  // When sun is 22.5 degrees or greater above the horizon, use max temperature
  const MAX_TEMPERATURE_ALTITUDE = Math.PI / 2 / 4;

  // If no location is provided by the user, assume their latitude as at the equator, and infer their
  // approximate longitude from their time zone.
  // TODO: determine user's location from browser APIs
  const { altitude: sunAltitude } = sun.getPosition(
    datetime.toJSDate(),
    0 /* equator */,
    approximateLongitudeFromTimezone(datetime),
  );
  const temperature =
    sunAltitude * (TEMPERATURE_RANGE / MAX_TEMPERATURE_ALTITUDE) + MIN_TEMPERATURE_KELVINS;
  return Math.max(MIN_TEMPERATURE_KELVINS, Math.min(temperature, MAX_TEMPERATURE_KELVINS));
};

const NOON_UTC = DateTime.fromISO('1970-01-01T12:00:00Z', { setZone: true });

export const getBackgroundColor = (datetime: DateTime = NOON_UTC) =>
  chroma.temperature(getDaylightTemperature(datetime));
