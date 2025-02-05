export function HexagonTickIcon({
  color = "#FFFFFF",
  bgColor = "#E9BE5C",
  borderColor = "#E9BE5C",
  width = 33,
  height = 30,
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 33 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_bii_440_101868)">
        <path
          d="M0.766577 17.8495C-0.255525 16.0857 -0.255526 13.9143 0.766577 12.1505L6.15105 2.85872C7.17601 1.08999 9.07298 1.09917e-07 11.1262 1.34792e-07L21.8738 2.64996e-07C23.927 2.8987e-07 25.824 1.08999 26.8489 2.85872L32.2334 12.1505C33.2555 13.9143 33.2555 16.0857 32.2334 17.8495L26.8489 27.1413C25.824 28.91 23.927 30 21.8738 30L11.1262 30C9.07298 30 7.17601 28.91 6.15105 27.1413L0.766577 17.8495Z"
          fill={bgColor}
        />
        <path
          d="M1.6318 17.3481C0.789401 15.8944 0.7894 14.1056 1.6318 12.6519L7.01628 3.36011C7.86142 1.90168 9.42772 1 11.1262 1L21.8738 1C23.5723 1 25.1386 1.90168 25.9837 3.36011L31.3682 12.6519C32.2106 14.1056 32.2106 15.8944 31.3682 17.3481L25.9837 26.6399C25.1386 28.0983 23.5723 29 21.8738 29L11.1262 29C9.42772 29 7.86142 28.0983 7.01627 26.6399L1.6318 17.3481Z"
          stroke={borderColor}
          stroke-width="2"
        />
      </g>
      <path
        d="M23.5713 10.2632L14.1428 19.7369L9.42847 15.0001"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <filter
          id="filter0_bii_440_101868"
          x="-22.4196"
          y="-22.4196"
          width="77.8393"
          height="74.8393"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="11.2098" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_440_101868"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_440_101868"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3.44917" />
          <feGaussianBlur stdDeviation="1.72459" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_440_101868"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="29.318" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_innerShadow_440_101868"
            result="effect3_innerShadow_440_101868"
          />
        </filter>
      </defs>
    </svg>
  );
}
