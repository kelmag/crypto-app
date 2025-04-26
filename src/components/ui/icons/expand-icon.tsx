import * as React from 'react';
import Svg, { Path, type SvgProps } from 'react-native-svg';

export function ExpandIcon({
  color = '#CDFF00',
  size = 24,
  ...props
}: SvgProps & { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none" {...props}>
      <Path
        d="M18 9V4L13 4"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4 13L4 18H9"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 4L12 10"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 12L4 18"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
