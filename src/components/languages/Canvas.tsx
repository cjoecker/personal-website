import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useEffectUnsafe } from '../../unsafeHooks';
import { useTheme } from '@mui/material';

export type LanguagesProps = {
  onLanguageDown: (languagePosition: number) => void;
  onLanguageUp: () => void;
  onLanguageHover: (languagePosition: number) => void;
  languagesNumber: number;
  isAnswerCorrect: boolean;
};
export const Canvas = ({
  onLanguageDown,
  onLanguageUp,
  languagesNumber,
  onLanguageHover,
                         isAnswerCorrect
}: LanguagesProps) => {
  const ratio = window.devicePixelRatio;
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<any>(null);
  const contextRef = useRef<any>(null);
  const [constraints, setConstraints] = useState<any>();
  const lasImageRef = useRef<any>(new Image());
  const linePoints = useRef<{ x: number; y: number }[]>([]);
  const languageHoverPosition = useRef<number | undefined>(undefined);
  const style = useTheme();
  const handleResize = () => {
    setConstraints(contextRef.current.getBoundingClientRect());
  };

  useEffectUnsafe(() => {
    window.addEventListener('resize', handleResize);
    setConstraints(canvasRef.current.getBoundingClientRect());
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (constraints) {
      const { width, height } = constraints;
      canvasRef.current.width = width * ratio;
      canvasRef.current.height = height * ratio;
      canvasRef.current.style.width = `${width}px`;
      canvasRef.current.style.height = `${height}px`;
      canvasRef.current.getContext('2d')?.scale(ratio, ratio);
    }
  }, [constraints, ratio, canvasRef]);

  useEffectUnsafe(() => {
    contextRef.current = canvasRef.current.getContext('2d');
  }, []);

  const startDrawing = (event:any) => {
    document.body.style.overflow = "hidden"
    contextRef.current.strokeStyle = 'white';
    const { height } = canvasRef.current;
    let { offsetX: x, offsetY: y } = event.nativeEvent;
    if (!x || !y) {
      const rect = event.target.getBoundingClientRect();
      const doc = document.documentElement;
      x = event.targetTouches[0].pageX - (rect.left + doc.scrollLeft);
      y = event.targetTouches[0].pageY - (rect.top + doc.scrollTop);
    }
    contextRef.current.beginPath();
    contextRef.current.lineCap = lineCap;
    contextRef.current.lineWidth = lineWidth;
    contextRef.current.moveTo(x, y);
    lasImageRef.current.src = canvasRef.current.toDataURL();
    setIsDrawing(true);
    linePoints.current = [];
    const { width } = canvasRef.current;
    const languagePos = Math.floor(
      (x * ratio) / ((width - 1) / languagesNumber)
    );
    onLanguageDown(languagePos);
  };
  const finishDrawing = (event: any) => {
    document.body.style.overflow = "scroll"
    event.preventDefault();
    const { width, height } = canvasRef.current;
    clearCanvas();
    contextRef.current.drawImage(
      lasImageRef.current,
      0,
      0,
      width * ratio,
      height * ratio,
      0,
      0,
      width,
      height
    );
    if (isAnswerCorrect) {
      markRightAnswer();
    } else {
      markWrongAnswer();
    }
    setIsDrawing(false);
    if (languageHoverPosition.current !== undefined) {
      onLanguageUp();
    }
  };
  const draw = (event: any) => {
    const { width, height } = canvasRef.current;
    if (!isDrawing) {
      return;
    }
    let { offsetX: x, offsetY: y } = event.nativeEvent;
    if (!x || !y) {
      const rect = event.target.getBoundingClientRect();
      const doc = document.documentElement;
      x = event.targetTouches[0].pageX - (rect.left + doc.scrollLeft);
      y = event.targetTouches[0].pageY - (rect.top + doc.scrollTop);
    }
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
    linePoints.current.push({ x: x, y: y });
    const languagePos = Math.floor(
      (x * ratio) / ((width - 1) / languagesNumber)
    );
    if (languagePos !== languageHoverPosition.current || languagePos === undefined) {
      languageHoverPosition.current = languagePos;
      onLanguageHover(languagePos);
    }
  };

  const markRightAnswer = () => {
    contextRef.current.strokeStyle = style.palette.primary.main;
    contextRef.current.beginPath();
    contextRef.current.lineCap = lineCap;
    contextRef.current.lineWidth = lineWidth;
    linePoints.current.forEach(point => {
      contextRef.current.lineTo(point.x, point.y);
    });
    contextRef.current.stroke();
    contextRef.current.closePath();
  };

  const markWrongAnswer = () => {
    contextRef.current.closePath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onTouchStart={startDrawing}
      onTouchEnd={finishDrawing}
      onMouseMove={draw}
      onTouchMove={draw}
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
};


const lineWidth = 4;
const lineCap = 'round'
