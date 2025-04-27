import * as React from 'react';
import Svg, {
  Defs,
  Path,
  RadialGradient,
  Rect,
  Stop,
  type SvgProps,
} from 'react-native-svg';

export function SolIcon({ size = 40, ...props }: SvgProps & { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 39 40" fill="none" {...props}>
      <Rect
        x={0.018}
        y={0.685}
        width={38.559}
        height={38.559}
        rx={19.279}
        fill="url(#paint0_radial_359_390)"
      />
      <Path
        d="M13.4412 23.5166C13.5459 23.4127 13.6898 23.3521 13.8425 23.3521H27.6905C27.9435 23.3521 28.07 23.6551 27.8912 23.8326L25.1556 26.5473C25.0509 26.6512 24.9069 26.7119 24.7542 26.7119H10.9063C10.6532 26.7119 10.5267 26.4088 10.7056 26.2313L13.4412 23.5166Z"
        fill="#00FFA3"
      />
      <Path
        d="M13.4409 13.3808C13.55 13.2769 13.694 13.2163 13.8423 13.2163H27.6902C27.9433 13.2163 28.0698 13.5194 27.8909 13.6969L25.1554 16.4116C25.0507 16.5155 24.9067 16.5761 24.754 16.5761H10.9061C10.653 16.5761 10.5265 16.273 10.7054 16.0955L13.4409 13.3808Z"
        fill="#00FFA3"
      />
      <Path
        d="M25.1556 18.416C25.0509 18.3121 24.9069 18.2515 24.7542 18.2515H10.9063C10.6532 18.2515 10.5267 18.5545 10.7056 18.7321L13.4412 21.4467C13.5459 21.5507 13.6898 21.6113 13.8425 21.6113H27.6905C27.9435 21.6113 28.07 21.3082 27.8912 21.1307L25.1556 18.416Z"
        fill="#00FFA3"
      />
      <Defs>
        <RadialGradient
          id="paint0_radial_359_390"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(19.2974 19.9639) rotate(90) scale(71.3333)"
        >
          <Stop offset={0.025} stopColor="#106345" />
          <Stop offset={0.95} stopColor="#00FFA3" />
        </RadialGradient>
      </Defs>
    </Svg>
  );
}
