/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

type ColorNames = keyof typeof Colors;

export function useThemeColor(colorName: ColorNames) {
  return Colors[colorName];
}
