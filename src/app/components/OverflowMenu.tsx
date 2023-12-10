"use client";

import React, { forwardRef, useLayoutEffect, useState } from "react";

import styles from "./OverflowMenu.module.scss";

export const OverflowMenu = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement> & { overflowControlLabel: string }>
>(function OverflowMenu({ children, className, overflowControlLabel, ...rest }, ref) {
  const [observedList, setObservedList] = useState<HTMLOListElement | null>(null);
  const [overflowIndexes, setOverflowIndexes] = useState<number[]>();

  useLayoutEffect(() => {
    if (!observedList) return;

    const intersectionOb = new IntersectionObserver(
      (entries) =>
        entries.forEach(({ target, target: { parentElement }, isIntersecting: isIn }) => {
          const kids = Array.from(parentElement?.children ?? []);
          const index = kids.indexOf(target) + 1;
          setOverflowIndexes((prev) =>
            (prev?.filter((n) => n <= kids.length && n !== index) ?? []).concat(isIn || index < 0 ? [] : index)
          );
        }),
      { root: observedList, threshold: 1 }
    );

    const mutationOb = new MutationObserver((mutations) =>
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => node instanceof Element && intersectionOb.observe(node));
        m.removedNodes.forEach((node) => node instanceof Element && intersectionOb.unobserve(node));
      })
    );

    Array.from(observedList.children).forEach((kid) => intersectionOb.observe(kid));
    mutationOb.observe(observedList, { childList: true });
    return () => {
      mutationOb.disconnect();
      intersectionOb.disconnect();
    };
  }, [observedList]);

  return (
    <div
      {...rest}
      className={[styles.base, className ?? []].flat().join(" ")}
      data-overflows={overflowIndexes?.join(" ")}
      ref={ref}
    >
      <ol className={styles.observedList} ref={setObservedList}>
        {children}
      </ol>

      <button className={styles.overflowControl} type="button">
        {overflowControlLabel}
      </button>
      <ul className={styles.overflowList}>{children}</ul>
    </div>
  );
});
