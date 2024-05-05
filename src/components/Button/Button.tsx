import React, { FunctionComponent, ReactNode } from 'react'

import styled, { css } from 'styled-components'

interface ButtonProps {
  color?: 'red' | 'green' | 'dark'
  isCoffee?: boolean
  onClick?: () => void
  children: ReactNode
}

const colorToCss:any = (color: ButtonProps['color']) => {
}

export const StyledButton = styled.button<ButtonProps>`
  font-family: inherit;
  font-size: inherit;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 0;
  padding-top: 1em;
  padding-bottom: 1em;
  background-color: #fcdea0;
  transition: background-color 0.15s ease-in-out, opacity 0.15s ease-in-out;
  ${({ color }) => colorToCss(color)}
  ${({ isCoffee }) =>
    isCoffee &&
    css`
      background-color: #b56333;
      color: #fff;
    `}

  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);

  &:focus {
    outline: 0;
  }

  :after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform 0.3s, opacity 1s;
  }

  :active:after {
    transform: scale(0, 0);
    opacity: 0.2;
    transition: 0s;
  }
`

export const Button: FunctionComponent<ButtonProps> = ({ children, color, isCoffee, onClick }) => {
  return (
    <StyledButton color={color} isCoffee={isCoffee} onClick={onClick}>
      {children}
    </StyledButton>
  )
}

export default Button