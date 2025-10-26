export const breakPoints = {
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1200,
};

export const breakPointsMediaQueries = {
  mobile: `@media (min-width: ${breakPoints.mobile}px)`,
  tablet: `@media (min-width: ${breakPoints.tablet}px)`,
  laptop: `@media (min-width: ${breakPoints.laptop}px)`,
  desktop: `@media (min-width: ${breakPoints.desktop}px)`,
};
