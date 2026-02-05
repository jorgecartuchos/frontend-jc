"use client";

import { useEffect } from "react";

/**
 * Hook personalizado para manejar el comportamiento sticky dinámico de un sidebar
 * @param {React.RefObject} contentRef - Referencia al elemento del contenido sticky
 */
export const useStickySidebar = (contentRef) => {
  useEffect(() => {
    if (!contentRef.current) return;

    const content = contentRef.current;

    content.style.transition = "top 0.2s ease-out, bottom 0.2s ease-out";

    let lastScrollY = window.scrollY;
    let offset = 0;
    let rafId = null;

    const BREAKPOINT_HEIGHT = 1066;
    const MIN_VIEWPORT = 996;
    const MAX_VIEWPORT = 1065;
    const MIN_BOTTOM = 5;
    const MAX_BOTTOM = 1;
    const OVERFLOW_ADJUSTMENT = 4;
    const WIDTH_BREAKPOINT = 1150;
    const SPECIAL_TOP = 52;

    const getHeaderHeight = () => {
      return window.innerWidth <= WIDTH_BREAKPOINT ? 90 : 68;
    };

    const interpolate = (value, minVal, maxVal, minOut, maxOut) => {
      if (value <= minVal) return minOut;
      if (value >= maxVal) return maxOut;
      const ratio = (value - minVal) / (maxVal - minVal);
      return minOut - ratio * (minOut - maxOut);
    };

    const calculateOffset = () => {
      const viewportHeight = window.innerHeight;
      const contentHeight = content.getBoundingClientRect().height;
      const headerHeight = getHeaderHeight();

      if (viewportHeight >= BREAKPOINT_HEIGHT) {
        content.style.position = "sticky";
        content.style.top = `${headerHeight}px`;
        content.style.bottom = "auto";
        content.style.marginTop = "0";
        offset = 0;
        return;
      }

      offset =
        contentHeight <= viewportHeight
          ? 0
          : Math.max(0, contentHeight - viewportHeight);
    };

    const applyTop = () => {
      const headerHeight = getHeaderHeight();
      const viewportHeight = window.innerHeight;

      content.style.position = "sticky";
      content.style.bottom = "auto";
      content.style.marginTop = "0";

      if (offset === 0) {
        const isInRange =
          viewportHeight >= MIN_VIEWPORT && viewportHeight <= MAX_VIEWPORT;
        const topValue =
          isInRange && window.innerWidth <= WIDTH_BREAKPOINT
            ? SPECIAL_TOP
            : headerHeight;
        content.style.top = `${topValue}px`;
      } else {
        const topValue = Math.max(
          -(offset + 5),
          -(
            content.getBoundingClientRect().height -
            viewportHeight +
            headerHeight
          )
        );
        content.style.top = `${topValue}px`;
      }
    };

    const applyBottom = () => {
      const headerHeight = getHeaderHeight();
      const viewportHeight = window.innerHeight;

      content.style.position = "sticky";
      content.style.top = "auto";
      content.style.marginTop = "auto";

      if (offset === 0) {
        const bottomValue = interpolate(
          viewportHeight,
          MIN_VIEWPORT,
          MAX_VIEWPORT,
          MIN_BOTTOM,
          MAX_BOTTOM
        );
        content.style.bottom = `${bottomValue}px`;
      } else {
        const adjustment = interpolate(
          viewportHeight,
          MIN_VIEWPORT,
          MAX_VIEWPORT,
          0,
          OVERFLOW_ADJUSTMENT
        );
        const contentHeight = content.getBoundingClientRect().height;
        const bottomValue = Math.min(
          -(offset + headerHeight - adjustment),
          -(contentHeight - viewportHeight + headerHeight - adjustment)
        );
        content.style.bottom = `${bottomValue}px`;
      }
    };

    calculateOffset();
    if (window.innerHeight < BREAKPOINT_HEIGHT) {
      applyTop();
    }

    const onScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const viewportHeight = window.innerHeight;
        const current = window.scrollY;

        if (viewportHeight >= BREAKPOINT_HEIGHT) {
          rafId = null;
          return;
        }

        if (current > lastScrollY) {
          applyTop();
        } else if (current < lastScrollY) {
          applyBottom();
        }

        lastScrollY = current;
        rafId = null;
      });
    };

    const onResize = () => {
      calculateOffset();
      if (window.innerHeight < BREAKPOINT_HEIGHT) {
        applyTop();
      }
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (content) {
        content.style.transition = "";
      }
    };
  }, [contentRef]);
};
