import React, { Fragment, FunctionComponent, useEffect } from 'react'
import styled from 'styled-components'
import Button from '../Button/Button'
import { Digit, Operator } from '../../type/types'

interface PadProps {
  onDigitButtonClick: (digit: Digit) => void
  onPointButtonClick: () => void
  onOperatorButtonClick: (operator: Operator) => void
  onChangeSignButtonClick: () => void
  onSquareBtnClick: () => void
  onEqualButtonClick: () => void
  onAllClearButtonClick: () => void
  onClearEntryButtonClick: () => void
  onMemoryRecallButtonClick: () => void
  onMemoryClearButtonClick: () => void
  onMemoryPlusButtonClick: () => void
  onMemoryMinusButtonClick: () => void
  onPercentageBtnClick: () => void
  onReciprocalClick: () => void
  onSquareRootBtnClick: () => void
  onDelClick: () => void
  openPremiumLayout: boolean
}

const StyledPad = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
`

export const Pad: FunctionComponent<PadProps> = ({
  openPremiumLayout,
  onDigitButtonClick,
  onPointButtonClick,
  onOperatorButtonClick,
  onChangeSignButtonClick,
  onReciprocalClick,
  onPercentageBtnClick,
  onSquareBtnClick,
  onSquareRootBtnClick,
  onEqualButtonClick,
  onAllClearButtonClick,
  onClearEntryButtonClick,
  onMemoryRecallButtonClick,
  onMemoryClearButtonClick,
  onMemoryPlusButtonClick,
  onMemoryMinusButtonClick,
  onDelClick,
}) => {

  return (
    <StyledPad>
      {openPremiumLayout && (
        <>
          <Button onClick={onMemoryRecallButtonClick}>
            MR
          </Button>
          <Button onClick={onMemoryClearButtonClick}>
            MC
          </Button>
          <Button onClick={onMemoryPlusButtonClick}>
            M+
          </Button>
          <Button onClick={onMemoryMinusButtonClick}>
            M-
          </Button>
      </>)
      }
      <Button color="red" onClick={onPercentageBtnClick}>
        %
      </Button>
      <Button onClick={onClearEntryButtonClick}>
        CE
      </Button>
      <Button color="red" onClick={onAllClearButtonClick}>
        C
      </Button>
      

      <Button color="red" onClick={onDelClick}>
        del
      </Button>
      
      <Button onClick={onReciprocalClick}>
        1/x
      </Button>
      <Button onClick={onSquareBtnClick}>
        x^2
      </Button>
      <Button onClick={onSquareRootBtnClick}>
        sqrt
      </Button>


      <Button color="dark" onClick={() => onOperatorButtonClick('÷')}>
        ÷
      </Button>
      <Button onClick={() => onDigitButtonClick(7)}>
        7
      </Button>
      <Button onClick={() => onDigitButtonClick(8)}>
        8
      </Button>
      <Button onClick={() => onDigitButtonClick(9)}>
        9
      </Button>
      <Button color="dark" onClick={() => onOperatorButtonClick('×')}>
        ×
      </Button>
      <Button onClick={() => onDigitButtonClick(4)}>
        4
      </Button>
      <Button onClick={() => onDigitButtonClick(5)}>
        5
      </Button>
      <Button onClick={() => onDigitButtonClick(6)}>
        6
      </Button>
      <Button color="dark" onClick={() => onOperatorButtonClick('-')}>
        -
      </Button>
      <Button onClick={() => onDigitButtonClick(1)}>
        1
      </Button>
      <Button onClick={() => onDigitButtonClick(2)}>
        2
      </Button>
      <Button onClick={() => onDigitButtonClick(3)}>
        3
      </Button>
      <Button color="dark" onClick={() => onOperatorButtonClick('+')}>
        +
      </Button>
      <Button onClick={onChangeSignButtonClick}>
        -/+
      </Button>
      <Button onClick={() => onDigitButtonClick(0)}>
        0
      </Button>
      <Button onClick={onPointButtonClick}>
        .
      </Button>
      <Button  onClick={onEqualButtonClick} isCoffee>
        =
      </Button>
      
    </StyledPad>
  )
}

export default Pad