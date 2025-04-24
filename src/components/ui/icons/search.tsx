import * as React from 'react';
import Svg, { Circle, Path, type SvgProps } from 'react-native-svg';

export function SearchIcon({
  color = 'white',
  size = 23,
  ...props
}: SvgProps & { size?: number }) {
  return (
    <Svg
      width={size}
      height={size * (22 / 23)}
      viewBox="0 0 23 22"
      fill="none"
      {...props}
    >
      <Circle cx="10.8238" cy="10.3238" r="7.62308" stroke={color} />
      <Path
        d="M19.9464 19.8178C20.1417 20.0131 20.4583 20.0131 20.6535 19.8178C20.8488 19.6226 20.8488 19.306 20.6535 19.1107L19.9464 19.8178ZM16.2234 16.0948L19.9464 19.8178L20.6535 19.1107L16.9305 15.3877L16.2234 16.0948Z"
        fill={color}
      />
    </Svg>
  );
}
