import React, { useEffect, useMemo, useState, useRef } from "react";
import mapValues from "lodash/mapValues";

type DefaultBreakpoint = "SM" | "MD" | "LG" | "XL";

// Default breakpoints that should apply to all observed
// elements that don't define their own custom breakpoints.
const defaultBreakpoints: Record<DefaultBreakpoint, number> = {
  SM: 384,
  MD: 576,
  LG: 768,
  XL: 960
};

type Config<Breakpoint extends string> = {
  breakpoints?: Record<Breakpoint, number>;
};

export function useResponsiveContainer<
  Breakpoint extends string = DefaultBreakpoint
>({
  breakpoints: _breakpoints
}: Config<Breakpoint>): [
  React.RefObject<HTMLDivElement>,
  Record<Breakpoint, boolean>
] {
  const ref = useRef<HTMLDivElement | null>(null);
  const breakpoints = _breakpoints || defaultBreakpoints;
  const [result, setResult] = useState<Record<Breakpoint, boolean>>(
    mapValues(breakpoints, () => false)
  );

  const observer = useMemo(() => {
    return new ResizeObserver(entries => {
      for (const entry of entries) {
        // Update the matching breakpoints on the observed element.
        for (const [key, value] of Object.entries(breakpoints)) {
          const minWidth = value;
          if (entry.contentRect.width >= minWidth) {
            setResult(result => ({ ...result, [key]: true }));
          } else {
            setResult(result => ({ ...result, [key]: false }));
          }
        }
      }
    });
  }, [breakpoints]);

  useEffect(() => {
    if (ref.current) {
      const { current } = ref;
      observer.observe(current);

      return () => {
        observer.unobserve(current);
      };
    }
  }, [observer]);

  return [ref, result];
}

type Props<Breakpoint extends string, Props> = Config<Breakpoint> & {
  children(result: { result: Record<Breakpoint, boolean> }): React.ReactNode;
  component?: React.ElementType | React.ComponentType<Props>;
} & Props;

export function ResponsiveContainer<Breakpoint extends string>({
  children,
  component: Component = "div",
  breakpoints,
  ...props
}: Props<Breakpoint, React.ComponentProps<typeof Component>>) {
  const [ref, result] = useResponsiveContainer({ breakpoints });
  return (
    <Component {...props} ref={ref}>
      {children({ result })}
    </Component>
  );
}
