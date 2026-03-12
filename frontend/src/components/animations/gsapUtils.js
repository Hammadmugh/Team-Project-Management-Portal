import gsap from 'gsap';

// ==================== TEXT ANIMATIONS ====================

export const slideInText = (element, delay = 0) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'power3.out',
    }
  );
};

export const slideInTextLines = (elements, stagger = 0.2) => {
  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger,
      ease: 'power3.out',
    }
  );
};

// ==================== CARD ANIMATIONS ====================

export const cardSlideIn = (cards, stagger = 0.1) => {
  gsap.fromTo(
    cards,
    {
      opacity: 0,
      y: 100,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger,
      ease: 'back.out(1.7)',
    }
  );
};

export const cardHoverAnimation = (element) => {
  gsap.to(element, {
    y: -10,
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
    duration: 0.3,
    ease: 'power2.out',
  });
};

export const cardHoverAnimationReverse = (element) => {
  gsap.to(element, {
    y: 0,
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    duration: 0.3,
    ease: 'power2.out',
  });
};

// ==================== DIALOG ANIMATIONS ====================

export const dialogFadeInScale = (element) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.7,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'back.out(1.5)',
    }
  );
};

export const dialogFadeOut = (element) => {
  return gsap.to(element, {
    opacity: 0,
    scale: 0.7,
    duration: 0.3,
    ease: 'back.in(1.5)',
  });
};

// ==================== COUNT-UP ANIMATIONS ====================

export const countUpAnimation = (element, targetValue, duration = 2) => {
  const counter = { value: 0 };

  gsap.to(counter, {
    value: targetValue,
    duration,
    ease: 'power1.inOut',
    onUpdate: () => {
      element.textContent = Math.floor(counter.value);
    },
  });
};

// ==================== STAGGER GRID ENTRANCE ====================

export const staggerGridEntrance = (items, stagger = 0.05, delay = 0) => {
  gsap.fromTo(
    items,
    {
      opacity: 0,
      scale: 0.9,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      stagger,
      delay,
      ease: 'power2.out',
    }
  );
};

// ==================== PAGE TRANSITIONS ====================

export const pageTransitionIn = (element) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.inOut',
    }
  );
};

export const pageTransitionOut = (element) => {
  return gsap.to(element, {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.inOut',
  });
};

// ==================== BUTTON ANIMATIONS ====================

export const buttonFloatingAnimation = (element) => {
  gsap.to(element, {
    y: -10,
    duration: 0.6,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });
};

export const buttonHoverAnimation = (element) => {
  gsap.to(element, {
    scale: 1.05,
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    duration: 0.3,
    ease: 'power2.out',
  });
};

export const buttonHoverAnimationReverse = (element) => {
  gsap.to(element, {
    scale: 1,
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
    duration: 0.3,
    ease: 'power2.out',
  });
};

// ==================== SVG PATH ANIMATIONS ====================

export const drawSVGPath = (element, duration = 2) => {
  const length = element.getTotalLength();

  gsap.fromTo(
    element,
    {
      strokeDasharray: length,
      strokeDashoffset: length,
    },
    {
      strokeDashoffset: 0,
      duration,
      ease: 'power2.inOut',
    }
  );
};

// ==================== STEPPER ANIMATIONS ====================

export const stepperStepAnimation = (element, index, delay = 0) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      x: -20,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.5,
      delay: delay + index * 0.15,
      ease: 'power3.out',
    }
  );
};

// ==================== UTILITY ANIMATIONS ====================

export const rotateAndFade = (element, { rotation = 360, duration = 1 } = {}) => {
  gsap.to(element, {
    rotation,
    opacity: 0,
    duration,
    ease: 'power2.inOut',
  });
};

export const pulseAnimation = (element, duration = 0.6) => {
  gsap.to(element, {
    scale: 1.1,
    duration: duration / 2,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });
};

export const shimmerAnimation = (element) => {
  const gradient = gsap.to(element, {
    backgroundPosition: '200% 0',
    duration: 2,
    ease: 'none',
    repeat: -1,
  });

  return gradient;
};

// ==================== BATCH ANIMATIONS ====================

export const batchSlideIn = (elements, options = {}) => {
  const {
    stagger = 0.1,
    delay = 0,
    direction = 'up',
    distance = 50,
  } = options;

  const fromValues =
    direction === 'up'
      ? { opacity: 0, y: distance }
      : direction === 'down'
        ? { opacity: 0, y: -distance }
        : direction === 'left'
          ? { opacity: 0, x: distance }
          : { opacity: 0, x: -distance };

  gsap.fromTo(
    elements,
    fromValues,
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.6,
      stagger,
      delay,
      ease: 'power3.out',
    }
  );
};
