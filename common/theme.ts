import chroma from 'chroma-js';
import { useTheme as emotionUseTheme } from 'emotion-theming';

import { css } from '@emotion/core';

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

const BASE_FONT_SIZE_PX = 16;

/**
 * Convert a px value to the equivalent rem value, based on a font size of 16px.
 */
export const pxRem = (px: number) => `${px / BASE_FONT_SIZE_PX}rem`;

export const globalStyles = css`
  @import url('https://fonts.googleapis.com/css?family=Merriweather|Ubuntu&display=swap');
`;

/**
 * A simple mapping of the current time of day to a colour temperature.
 * A warmer colour (3500K) is used during night time, and a cooler colour (6500K) during day time.
 * For simplicity, sunrise is assumed to be at 8 AM (08:00) and sunset at 8 PM (20:00).
 * During a four-hour interval around sunrise (06:00 - 10:00), a colour is determined based
 * on a linear scale from 3500K to 6500K, and vice-versa for a four-hour interval around sunset.
 *
 * See also:
 *  - https://en.wikipedia.org/wiki/Color_temperature
 *  - https://justgetflux.com/research.html
 */
const getDaylightTemperature = (datetime: Date) => {
  const MIN_TEMPERATURE_KELVINS = 3500;
  const MAX_TEMPERATURE_KELVINS = 6500;
  const TWO_HOURS_IN_SECONDS = 2 * 60 * 60;
  const SUNRISE_HOUR = 8; // 8 AM (08:00)
  const SUNRISE_START_SECONDS = SUNRISE_HOUR * 60 * 60 - TWO_HOURS_IN_SECONDS;
  const SUNRISE_END_SECONDS = SUNRISE_HOUR * 60 * 60 + TWO_HOURS_IN_SECONDS;
  const SUNSET_HOUR = 20; // 8 PM (20:00)
  const SUNSET_START_SECONDS = SUNSET_HOUR * 60 * 60 - TWO_HOURS_IN_SECONDS;
  const SUNSET_END_SECONDS = SUNSET_HOUR * 60 * 60 + TWO_HOURS_IN_SECONDS;
  const currentSeconds =
    datetime.getHours() * 60 * 60 + datetime.getMinutes() * 60 + datetime.getSeconds();
  if (SUNRISE_START_SECONDS <= currentSeconds && currentSeconds <= SUNRISE_END_SECONDS) {
    const sunriseProgressSeconds = currentSeconds - SUNRISE_START_SECONDS;
    const sunriseTotalSeconds = TWO_HOURS_IN_SECONDS * 2;
    return (
      (sunriseProgressSeconds / sunriseTotalSeconds) *
        (MAX_TEMPERATURE_KELVINS - MIN_TEMPERATURE_KELVINS) +
      MIN_TEMPERATURE_KELVINS
    );
  }
  if (SUNRISE_END_SECONDS <= currentSeconds && currentSeconds <= SUNSET_START_SECONDS) {
    return MAX_TEMPERATURE_KELVINS;
  }
  if (SUNSET_START_SECONDS <= currentSeconds && currentSeconds <= SUNSET_END_SECONDS) {
    const sunsetProgressSeconds = currentSeconds - SUNSET_START_SECONDS;
    const sunsetTotalSeconds = TWO_HOURS_IN_SECONDS * 2;
    return (
      (sunsetProgressSeconds / sunsetTotalSeconds) *
        (MIN_TEMPERATURE_KELVINS - MAX_TEMPERATURE_KELVINS) +
      MAX_TEMPERATURE_KELVINS
    );
  }
  return MIN_TEMPERATURE_KELVINS;
};

export const getTheme = (datetime: Date): Theme => {
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

export const useTheme = () => emotionUseTheme<Theme>();
