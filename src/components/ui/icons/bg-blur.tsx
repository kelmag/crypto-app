import * as React from 'react';
import Svg, {
  Circle,
  Defs,
  FeBlend,
  FeFlood,
  FeGaussianBlur,
  Filter,
  G,
  RadialGradient,
  Stop,
  type SvgProps,
} from 'react-native-svg';

export function BgBlur({ size = 400, ...props }: SvgProps & { size?: number }) {
  const ratio = size / 375;
  const height = 571 * ratio;

  return (
    <Svg
      width={size}
      height={height}
      viewBox="0 0 375 571"
      fill="none"
      {...props}
    >
      <G filter="url(#filter0_f_358_3431)">
        <Circle cx="188" cy="285" r="143" fill="url(#paint0_radial_358_3431)" />
      </G>
      <Defs>
        <Filter
          id="filter0_f_358_3431"
          x="-129"
          y="-32"
          width="634"
          height="634"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <FeGaussianBlur
            stdDeviation="87"
            result="effect1_foregroundBlur_358_3431"
          />
        </Filter>
        <RadialGradient
          id="paint0_radial_358_3431"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(188.22 284.341) rotate(90) scale(240.53)"
        >
          <Stop stopColor="#1656D0" stopOpacity="0.5" />
          <Stop offset="0.36179" stopColor="#2150AA" stopOpacity="0.4" />
          <Stop offset="0.919075" stopColor="#323439" stopOpacity="0.1" />
        </RadialGradient>
      </Defs>
    </Svg>
  );
}
