// @no-flow
import React from "react";
import styled, { css } from "styled-components";
export const deviceSizes = {
  desktopExtraLarge: 1920,
  desktopMediumLarge: 1500,
  desktopLarge: 1200,
  desktop: 992,
  tablet: 768,
  small: 576,
  largerPhone: 475,
  phone: 320
};

// Iterate through the sizes and create a media template
export const media = Object.keys(deviceSizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${deviceSizes[label] / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

export const mediaStyle = (
  mediaSize: string,
  property: string,
  propertyValue: string
) => media[mediaSize]`${property}: ${propertyValue}`.join("");

export const mediaStyles = (mediaSize: string, styles: { [property]: any }) =>
  media[mediaSize]`${styles}`.join("");

const ResponsiveContainer = styled.div`
  display: ${props => (props.from ? "none" : "inherit")};

  ${props =>
    props.from &&
    media[props.from]`
    display: inherit
  `}

  ${props =>
    props.to &&
    media[props.to]`
    display: none;
  `}
`;

export const Responsive = props => (
  <ResponsiveContainer from={props.from} to={props.to} {...props}>
    {props.children}
  </ResponsiveContainer>
);

// Example
// ${media.tablet`
//   width: 33%;
//   text-align: left;
//   align-items: flex-start;
//     order: initial;
//   `}
