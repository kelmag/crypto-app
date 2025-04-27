import * as React from 'react';
import Svg, { Path, type SvgProps } from 'react-native-svg';

export function ArrowLeft({
  color = '#FFFFFF',
  size = 12,
  ...props
}: SvgProps & { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 8 12" fill="none" {...props}>
      <Path
        d="M6.58587 0.912728L1.63281 5.86579L6.58587 10.8188"
        stroke={color}
        strokeWidth={1.80376}
      />
    </Svg>
  );
}
