"use client";

import React, { forwardRef, useLayoutEffect, useState } from "react";

import styles from "./OverflowMenu.module.scss";

export const OverflowMenu = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    children: (React.ReactElement | null | undefined)[];
    overflowControlLabel: string;
  }
>(function OverflowMenu({ children, className, overflowControlLabel, ...rest }, ref) {
  const [observedList, setObservedList] = useState<HTMLOListElement | null>(null);
  const [overflowIndexes, setOverflowIndexes] = useState<number[]>();

  useLayoutEffect(() => {
    if (!observedList?.children.length || ![children].flat()?.length) return;

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(({ target, isIntersecting: isIn }) => {
          const index = Array.from(observedList.children).indexOf(target) + 1;
          setOverflowIndexes((prev) =>
            (prev?.filter((n) => n < observedList.children.length && n !== index) ?? []).concat(isIn ? [] : index)
          );
        }),
      { root: observedList, threshold: 1 }
    );

    Array.from(observedList.children).forEach((k) => observer.observe(k));
    return () => observer.disconnect();
  }, [observedList, children]);

  return (
    <div
      {...rest}
      className={[styles.base, ...(className ? [className] : [])].join(" ")}
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
