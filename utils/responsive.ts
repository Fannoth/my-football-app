import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const scale = (size: number) => (SCREEN_WIDTH / 375) * size;
export const verticalScale = (size: number) => (SCREEN_HEIGHT / 812) * size;
export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;
