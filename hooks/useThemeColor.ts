import { useColorScheme as _useColorScheme } from 'react-native';


export function useThemeColor(
  props: { light?: string; dark?: string },
  fallbackColor: string
): string {
  const theme = _useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return fallbackColor;
  }
}
