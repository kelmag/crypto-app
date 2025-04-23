import * as React from 'react';
import Svg, {
  Defs,
  Path,
  RadialGradient,
  Rect,
  Stop,
  type SvgProps,
} from 'react-native-svg';

export function EthIcon({ size = 40, ...props }: SvgProps & { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 39 40" fill="none" {...props}>
      <Rect
        x={0.018}
        y={0.685}
        width={38.559}
        height={38.559}
        rx={19.279}
        fill="url(#paint0_radial_359_179)"
      />
      <Path
        d="M19.538 10.3242V17.451L25.5616 20.1426L19.538 10.3242Z"
        fill="white"
        fillOpacity={0.602}
      />
      <Path
        d="M19.538 10.3242L13.5135 20.1426L19.538 17.451V10.3242Z"
        fill="white"
      />
      <Path
        d="M19.538 24.7614V29.6039L25.5656 21.2646L19.538 24.7614Z"
        fill="white"
        fillOpacity={0.602}
      />
      <Path
        d="M19.538 29.6039V24.7605L13.5135 21.2646L19.538 29.6039Z"
        fill="white"
      />
      <Path
        d="M19.5383 23.6436L25.562 20.1461L19.5383 17.4561V23.6436Z"
        fill="white"
        fillOpacity={0.2}
      />
      <Path
        d="M13.5135 20.1461L19.538 23.6436V17.4561L13.5135 20.1461Z"
        fill="white"
        fillOpacity={0.602}
      />
      <Defs>
        <RadialGradient
          id="paint0_radial_359_179"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(19.2973 19.9638) rotate(90) scale(19.2793)"
        >
          <Stop stopColor="#36426E" />
          <Stop offset={0.95} stopColor="#455698" />
        </RadialGradient>
      </Defs>
    </Svg>
  );
}
