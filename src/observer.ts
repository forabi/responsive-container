export const observer = new ResizeObserver(entries => {
  // Default breakpoints that should apply to all observed
  // elements that don't define their own custom breakpoints.
  const defaultBreakpoints = { SM: 384, MD: 576, LG: 768, XL: 960 };

  entries.forEach(function(entry) {
    // If breakpoints are defined on the observed element,
    // use them. Otherwise use the defaults.
    const breakpoints = entry.target.dataset.breakpoints
      ? JSON.parse(entry.target.dataset.breakpoints)
      : defaultBreakpoints;

    // Update the matching breakpoints on the observed element.
    Object.keys(breakpoints).forEach(function(breakpoint) {
      const minWidth = breakpoints[key];

      if (entry.contentRect.width >= minWidth) {
        entry.target.classList.add(breakpoint);
      } else {
        entry.target.classList.remove(breakpoint);
      }
    });
  });
});
