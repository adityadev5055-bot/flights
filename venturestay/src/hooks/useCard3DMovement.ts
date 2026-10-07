import React, { useState, useEffect, useRef, useCallback } from 'react';

interface UseCard3DMovementOptions {
  maxTilt?: number; // max tilt in degrees (default: 8)
  enableDeviceTilt?: number; // max gyro tilt degrees on mobile/tablet (default: 5, 0 to disable)
  scaleOnInteract?: boolean; // whether to scale up on hover/touch
}

export function useCard3DMovement(options: UseCard3DMovementOptions = {}) {
  const { maxTilt = 8, enableDeviceTilt = 5 } = options;

  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  // References to keep track of touch coordinates & device orientation
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const isTouchActiveRef = useRef(false);
  const isHoveredRef = useRef(false);
  const gyroActiveRef = useRef(false);

  // Calculate tilt from normalized coordinate (-1 to 1)
  const calculateTilt = useCallback((normX: number, normY: number) => {
    const clampedX = Math.max(-1, Math.min(1, normX));
    const clampedY = Math.max(-1, Math.min(1, normY));
    const rY = clampedX * maxTilt;
    const rX = -clampedY * maxTilt;
    return { rX, rY };
  }, [maxTilt]);

  // Mouse Handlers (Desktop)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x - rect.width / 2) / (rect.width / 2);
    const normY = (y - rect.height / 2) / (rect.height / 2);

    const { rX, rY } = calculateTilt(normX, normY);
    setRotX(rX);
    setRotY(rY);
    setGlarePos({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100)
    });
  }, [calculateTilt]);

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    setIsInteracting(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    setIsInteracting(false);
    if (!gyroActiveRef.current) {
      setRotX(0);
      setRotY(0);
    }
  }, []);

  // Touch Handlers (Mobile & Tablet)
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLElement>) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    isTouchActiveRef.current = true;
    setIsInteracting(true);

    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const normX = (x - rect.width / 2) / (rect.width / 2);
    const normY = (y - rect.height / 2) / (rect.height / 2);

    const { rX, rY } = calculateTilt(normX, normY);
    setRotX(rX);
    setRotY(rY);
    setGlarePos({
      x: Math.round(Math.max(0, Math.min(100, (x / rect.width) * 100))),
      y: Math.round(Math.max(0, Math.min(100, (y / rect.height) * 100)))
    });
  }, [calculateTilt]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLElement>) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    // Check if touch is reasonably within or near card
    const normX = (x - rect.width / 2) / (rect.width / 2);
    const normY = (y - rect.height / 2) / (rect.height / 2);

    const { rX, rY } = calculateTilt(normX, normY);
    setRotX(rX);
    setRotY(rY);
    setGlarePos({
      x: Math.round(Math.max(0, Math.min(100, (x / rect.width) * 100))),
      y: Math.round(Math.max(0, Math.min(100, (y / rect.height) * 100)))
    });
  }, [calculateTilt]);

  const handleTouchEnd = useCallback(() => {
    isTouchActiveRef.current = false;
    // Smooth reset
    setTimeout(() => {
      if (!isTouchActiveRef.current && !isHoveredRef.current) {
        setIsInteracting(false);
        if (!gyroActiveRef.current) {
          setRotX(0);
          setRotY(0);
        }
      }
    }, 180);
  }, []);

  const handleTouchCancel = useCallback(() => {
    isTouchActiveRef.current = false;
    setIsInteracting(false);
    if (!gyroActiveRef.current) {
      setRotX(0);
      setRotY(0);
    }
  }, []);

  // Device Orientation / Gyroscope (Mobile & Tablet physical device tilt)
  useEffect(() => {
    if (enableDeviceTilt <= 0) return;
    if (typeof window === 'undefined') return;

    // Only activate on touch-capable devices (smartphones and tablets)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) return;

    let rafId: number;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      // If user is currently touching the card or hovering, prioritize direct touch
      if (isTouchActiveRef.current || isHoveredRef.current) return;

      const gamma = event.gamma; // [-90, 90] left-to-right tilt
      const beta = event.beta;   // [-180, 180] front-to-back tilt

      if (gamma === null || beta === null) return;

      gyroActiveRef.current = true;

      // Normal holding angle for a tablet or phone is ~45 degrees beta
      const targetBeta = beta - 45; 
      const clampedGamma = Math.max(-30, Math.min(30, gamma));
      const clampedBeta = Math.max(-30, Math.min(30, targetBeta));

      const tiltY = (clampedGamma / 30) * enableDeviceTilt;
      const tiltX = -(clampedBeta / 30) * enableDeviceTilt;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!isTouchActiveRef.current && !isHoveredRef.current) {
          setRotX(tiltX);
          setRotY(tiltY);
          setGlarePos({
            x: Math.round(50 + (clampedGamma / 30) * 35),
            y: Math.round(50 + (clampedBeta / 30) * 35)
          });
        }
      });
    };

    window.addEventListener('deviceorientation', handleOrientation, { passive: true });

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      cancelAnimationFrame(rafId);
    };
  }, [enableDeviceTilt]);

  return {
    rotX,
    rotY,
    isInteracting,
    glarePos,
    cardMovementProps: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchCancel
    }
  };
}
