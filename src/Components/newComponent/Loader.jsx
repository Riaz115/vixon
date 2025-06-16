import React from "react";
import styled, { keyframes } from "styled-components";

let cubeSize = "50px";

const rotation = keyframes`
  0% {
    transform: rotateX(45deg) rotateY(0) rotateZ(45deg);
    animation-timing-function: cubic-bezier(0.17, 0.84, 0.44, 1);
  }
  50% {
    transform: rotateX(45deg) rotateY(0) rotateZ(225deg);
    animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
  }
  100% {
    transform: rotateX(45deg) rotateY(0) rotateZ(405deg);
    animation-timing-function: cubic-bezier(0.17, 0.84, 0.44, 1);
  }
`;

const bouncing = keyframes`
  0% {
    transform: translateY(-40px);
    animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
  }
  45% {
    transform: translateY(40px);
    animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  }
  100% {
    transform: translateY(-40px);
    animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
  }
`;

const bouncingShadow = keyframes`
  0% {
    transform: translateZ(-${cubeSize}) scale(1.3);
    animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
    opacity: 0.05;
  }
  45% {
    transform: translateZ(0);
    animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
    opacity: 0.3;
  }
  100% {
    transform: translateZ(-${cubeSize}) scale(1.3);
    animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
    opacity: 0.05;
  }
`;

const Scene = styled.div`
  position: relative;
  z-index: 2;
  height: 220px;
  width: 220px;
  display: grid;
  place-items: center;
`;

const CubeWrapper = styled.div`
  transform-style: preserve-3d;
  animation: ${bouncing} 2s infinite;
`;

const Cube = styled.div`
  transform-style: preserve-3d;
  transform: rotateX(45deg) rotateZ(45deg);
  animation: ${rotation} 2s infinite;
`;

const CubeFaces = styled.div`
  transform-style: preserve-3d;
  height: ${cubeSize};
  width: ${cubeSize};
  position: relative;
  transform-origin: 0 0;
  transform: translateX(0) translateY(0) translateZ(-40px);
`;

const CubeFace = styled.div`
  position: absolute;
  inset: 0;
  background: #110d31ff;
  border: solid 1px white;

  &.shadow {
    transform: translateZ(-${cubeSize});
    animation: ${bouncingShadow} 2s infinite;
  }
  &.top {
    transform: translateZ(${cubeSize});
  }
  &.front {
    transform-origin: 0 50%;
    transform: rotateY(-90deg);
  }
  &.back {
    transform-origin: 0 50%;
    transform: rotateY(-90deg) translateZ(-${cubeSize});
  }
  &.right {
    transform-origin: 50% 0;
    transform: rotateX(-90deg) translateY(-${cubeSize});
  }
  &.left {
    transform-origin: 50% 0;
    transform: rotateX(-90deg) translateY(-${cubeSize}) translateZ(${cubeSize});
  }
`;

const Loader = () => {
  return (
    <Scene>
      <CubeWrapper>
        <Cube>
          <CubeFaces>
            <CubeFace className='shadow' />
            <CubeFace className='bottom' />
            <CubeFace className='top' />
            <CubeFace className='left' />
            <CubeFace className='right' />
            <CubeFace className='back' />
            <CubeFace className='front' />
          </CubeFaces>
        </Cube>
      </CubeWrapper>
    </Scene>
  );
};

export default Loader;
