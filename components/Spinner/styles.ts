import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { CommonColorVariants } from '@/theme/types';

const borderRotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
   }
`;

const circleRotate = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }
  
  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }
  
  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`;

export const StyledSpinner = styled('span')<{
  color?: string;
  size: number;
}>(({ theme, color, size }) => {
  const defaultColor = theme.palette.primary.main;

  return {
    color: color || defaultColor,
    width: `${size}px`,
    height: `${size}px`,
    display: 'inline-block',
    animation: `1.4s linear 0s infinite normal none running ${borderRotate}`,

    svg: {
      display: 'block',

      circle: {
        stroke: 'currentcolor',
        strokeDasharray: '80px, 200px',
        strokeDashoffset: 0,
        animation: `1.4s ease-in-out 0s infinite normal none running ${circleRotate}`,
      },
    },
  };
});
