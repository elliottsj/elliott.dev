import { css, Theme } from '@emotion/react';
import chroma from 'chroma-js';
import { DateTime } from 'luxon';
import * as sun from 'suncalc';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
    fonts: {
      body: string;
      heading: string;
    };
  }
}

const BASE_FONT_SIZE_PX = 16;

/**
 * Convert a px value to the equivalent rem value, based on a font size of 16px.
 */
export const pxRem = (px: number) => `${px / BASE_FONT_SIZE_PX}rem`;

export const globalStyles = css`
  @import url('https://fonts.googleapis.com/css?family=Merriweather|Ubuntu&display=swap');
`;

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

export const getTheme = (datetime: DateTime = NOON_UTC): Theme => {
  const backgroundColor = chroma.temperature(getDaylightTemperature(datetime));
  return {
    colors: {
      primary: '#635cb3',
      secondary: '#ffd615',
      background: backgroundColor.hex(),
      text: '#292929',
    },
    fonts: {
      body: "'Merriweather', serif",
      heading: "'Ubuntu', sans-serif",
    },
  };
};
