import * as React from 'react';
import Svg, {
  Defs,
  Path,
  RadialGradient,
  Rect,
  Stop,
  type SvgProps,
} from 'react-native-svg';

export function BnbIcon({ size = 40, ...props }: SvgProps & { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" fill="none" {...props}>
      <Rect width={40} height={40} rx={20} fill="url(#paint0_radial_359_133)" />
      <Path
        d="M13.701 19.8865L13.7104 23.324L16.6313 25.0428V27.0553L12.001 24.3396V18.8813L13.701 19.8865Z"
        fill="#FFD348"
      />
      <Path
        d="M13.701 16.449V18.4521L12 17.4459V15.4428L13.701 14.4365L15.4104 15.4428L13.701 16.449Z"
        fill="#FFD348"
      />
      <Path
        d="M17.851 15.4428L19.5521 14.4365L21.2615 15.4428L19.5521 16.449L17.851 15.4428Z"
        fill="#FFD348"
      />
      <Path
        d="M14.9326 22.6115V20.599L16.6337 21.6053V23.6084L14.9326 22.6115Z"
        fill="#FFD348"
      />
      <Path
        d="M17.8535 25.7636L19.5545 26.7699L21.2639 25.7636V27.7667L19.5545 28.773L17.8535 27.7667V25.7636Z"
        fill="#FFD348"
      />
      <Path
        d="M23.7035 15.4428L25.4045 14.4365L27.1139 15.4428V17.4459L25.4045 18.4521V16.449L23.7035 15.4428Z"
        fill="#FFD348"
      />
      <Path
        d="M25.4045 23.324L25.4139 19.8865L27.1149 18.8803V24.3386L22.4847 27.0542V25.0417L25.4045 23.324Z"
        fill="#FFD348"
      />
      <Path
        d="M24.182 22.6116L22.481 23.6085V21.6054L24.182 20.5991V22.6116Z"
        fill="#FFD348"
      />
      <Path
        d="M24.1847 17.1615L24.1941 19.174L21.2649 20.8927V24.3385L19.5639 25.3354L17.8628 24.3385V20.8927L14.9337 19.174V17.1615L16.642 16.1552L19.5535 17.8823L22.4826 16.1552L24.192 17.1615H24.1847Z"
        fill="#FFD348"
      />
      <Path
        d="M14.9326 13.725L19.5545 11L24.1847 13.725L22.4837 14.7312L19.5545 13.0042L16.6337 14.7312L14.9326 13.725Z"
        fill="#FFD348"
      />
      <Defs>
        <RadialGradient
          id="paint0_radial_359_133"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(20 20) rotate(90) scale(62.5)"
        >
          <Stop offset={0.038} stopColor="#735C12" />
          <Stop offset={0.95} stopColor="#F6CB44" />
        </RadialGradient>
      </Defs>
    </Svg>
  );
}
