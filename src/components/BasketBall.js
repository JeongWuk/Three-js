import { useEffect, useLayoutEffect, useState } from "react";
import { useRef } from "react";
import styled from "styled-components";

const BasketBall = () => {
  const basketBallRef = useRef(null);
  const canvasRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isMouseUp, setIsMouseUp] = useState(false);
  const [clickStartTime, setClickStartTime] = useState(0);
  const [ball, setBall] = useState(null);
  const [arrow, setArrow] = useState({
    startX: 400,
    startY: 300,
    endX: 400,
    endY: 300
  });

  const createBall = () => {
    const canvas = canvasRef.current;
    const newBall = {
      x: canvas.width / 2,
      y: canvas.height * 0.8,
      radius: canvas.width / 20,
      dx: 4,
      dy: -10,
      gravity: 0.5,
      dragCoefficient: 0.99,
    };
    setBall(newBall);
  }

  const drawArrow = (startX, startY, endX, endY) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (ball) {
      drawBall();
    }
    
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    const angle = Math.atan2(endY - startY, endX - startX);
    const arrowSize = 10;
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - arrowSize * Math.cos(angle - Math.PI / 6), endY - arrowSize * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - arrowSize * Math.cos(angle + Math.PI / 6), endY - arrowSize * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
  };

  const drawBall = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
  }

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newArrow = {
      startX: canvas.width / 2,
      startY: canvas.height * 0.8,
      endX: mouseX,
      endY: mouseY,
    };

    setArrow(newArrow);
  };

  const handleMouseDown = () => {
    setIsMouseDown(true);
    setClickStartTime(Date.now());
  };

  const handleMouseUp = () => {
    if (!isMouseUp) {
      let clickDuration = Date.now() - clickStartTime;

      if (clickDuration > 3000) {
        clickDuration = 3000;
      }

      const dx = arrow.endX - ball.x;
      const dy = arrow.endY - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const force = Math.min(clickDuration / 100, 20);

      const normalizedDX = (dx / distance) * force;
      const normalizedDY = (dy / distance) * force;

      setBall((prevBall) => ({
        ...prevBall,
        dx: normalizedDX,
        dy: normalizedDY
      }));
    }
    setIsMouseUp(true);
    setIsMouseDown(false);
  };

  const updateBall = () => {
    setBall((prevBall) => {
      let newX = prevBall.x + prevBall.dx;
      let newY = prevBall.y + prevBall.dy;
      let newDy = prevBall.dy + prevBall.gravity;
      let newDx = prevBall.dx * prevBall.dragCoefficient;

      if (newY + prevBall.radius > canvasRef.current.height) {
        newY = canvasRef.current.height - prevBall.radius;
        newDy = 0;
      }

      if (newX + prevBall.radius > canvasRef.current.width || newX - prevBall.radius < 0) {
        newDx = 0;
        newX = prevBall.x;
      }

      return {
        ...prevBall,
        x: newX,
        y: newY,
        dx: newDx,
        dy: newDy,
      };
    });
  };

  useLayoutEffect(() => {
    const basketBallContainer = basketBallRef.current;

    if (basketBallContainer) {
      canvasRef.current.width = basketBallContainer.clientWidth;
      canvasRef.current.height = basketBallContainer.clientHeight;

      createBall();
    }
  }, []);

  useEffect(() => {
    drawArrow(arrow.startX, arrow.startY, arrow.endX, arrow.endY);
  }, [arrow, ball]);

  useEffect(() => {
    if (!isMouseDown && isMouseUp) {
      const intervalId = setInterval(() => {
        updateBall();
      }, 1000 / 60);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isMouseDown, isMouseUp]);

  return (
    <BasketBallContainer ref={basketBallRef}>
      <Canvas ref={canvasRef} onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}></Canvas>
      <BasketBallCourt>
        <Court />
        <FrontWall />
        <LeftWall />
        <RightWall />
      </BasketBallCourt>
    </BasketBallContainer>
  );
}

const BasketBallContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Canvas = styled.canvas`
  background-color: transparent;
  position: relative;
  z-index: 999;
`;

const BasketBallCourt = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  perspective: 600px;
  overflow: hidden;
`;

const Court = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 25rem;
  z-index: 99;
  transform: rotateX(75deg);
  background: linear-gradient(
    0deg,
    #f1c27d 30%,
    #b57f52 100%
  );
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
`;

const FrontWall = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9;
  background: linear-gradient(
    180deg,
    #f1c27d 30%,
    #b57f52 100%
  );
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
`;

const LeftWall = styled.div`
  position: absolute;
  left: 0;
  width: 13%;
  height: 100%;
  z-index: 9;
  transform: rotateY(45deg);
  background: linear-gradient(
    135deg,
    #f1c27d 30%,
    #b57f52 100%
  );
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
`;

const RightWall = styled.div`
  position: absolute;
  right: 0;
  width: 13%;
  height: 100%;
  z-index: 9;
  transform: rotateY(-45deg);
  background: linear-gradient(
    180deg,
    #f1c27d 30%,
    #b57f52 100%
  );
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
`

export default BasketBall;