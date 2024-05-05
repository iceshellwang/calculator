import React, {FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import Display from '../Display/Display'
import Pad from '../Pad/Pad'
import Modal from '../Modal/Modal'
import { Digit, Operator } from '../../type/types';

const StyledHeader = styled.div`
  border-bottom: 1px solid black;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align:center
`
const StyledTitle = styled.div`
  flex: 1;
  font-size: 30px;
  
`
const StyledButton = styled.button`
  color: #3f7de1;
  background-color: transparent;
  border: none;
  
 
`
const StyledCalculator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledPanel = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue" ,Arial ,sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  width: 100%;
  max-width: 320px;
  position: absolute;
  left: calc(50% - 160px);
  top: 20%;
`

export const App: FunctionComponent = () => {
  // Calculator's states
  const [memory, setMemory] = useState<number>(0)
  const [result, setResult] = useState<number>(0)
  const [subscribeOpen, setSubscribeOpen] = useState<boolean>(false)
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(true)
  const [pendingOperator, setPendingOperator] = useState<Operator>()
  const [display, setDisplay] = useState<string>('0')
  const [premiumOpen, setPremiumOpen] = useState<boolean>(false)

  const handleSubscribeOpen = () => {
    setSubscribeOpen(true)
  }
  const calculate = (rightOperand: number, pendingOperator: Operator): boolean => {
    let newResult = result

    switch (pendingOperator) {
      case '+':
        newResult += rightOperand
        break
      case '-':
        newResult -= rightOperand
        break
      case '×':
        newResult *= rightOperand
        break
      case '÷':
        if (rightOperand === 0) {
          return false
        }

        newResult /= rightOperand
    }

    setResult(newResult)
    setDisplay(newResult.toString().toString().slice(0, 12))

    return true
  }

  // Pad buttons handlers
  const onDigitButtonClick = (digit: Digit) => {
    let newDisplay = display

    if ((display === '0' && digit === 0) || display.length > 12) {
      return
    }

    if (waitingForOperand) {
      newDisplay = ''
      setWaitingForOperand(false)
    }

    if (display !== '0') {
      newDisplay = newDisplay + digit.toString()
    } else {
      newDisplay = digit.toString()
    }

    setDisplay(newDisplay)
  }

  const onPointButtonClick = () => {
    let newDisplay = display

    if (waitingForOperand) {
      newDisplay = '0'
    }

    if (newDisplay.indexOf('.') === -1) {
      newDisplay = newDisplay + '.'
    }

    setDisplay(newDisplay)
    setWaitingForOperand(false)
  }

  const onOperatorButtonClick = (operator: Operator) => {
    const operand = Number(display)

    if (typeof pendingOperator !== 'undefined' && !waitingForOperand) {
      if (!calculate(operand, pendingOperator)) {
        return
      }
    } else {
      setResult(operand)
    }

    setPendingOperator(operator)
    setWaitingForOperand(true)
  }

  const onChangeSignButtonClick = () => {
    const value = Number(display)

    if (value > 0) {
      setDisplay('-' + display)
    } else if (value < 0) {
      setDisplay(display.slice(1))
    }
  }

  const onEqualButtonClick = () => {
    const operand = Number(display)

    if (typeof pendingOperator !== 'undefined' && !waitingForOperand) {
      if (!calculate(operand, pendingOperator)) {
        return
      }

      setPendingOperator(undefined)
    } else {
      setDisplay(operand.toString())
    }

    setResult(operand)
    setWaitingForOperand(true)
  }

  const onSquareBtnClick = () => {
    // 0.4 square needs retest
    const value = Number(display)
    const res = value * value
    setDisplay(String(res))
  }

  const onPercentageBtnClick = () => {
    const value = Number(display)
    const res = value / 100
    setDisplay(String(res))
  }

  const onReciprocalClick = () => {
    const value = Number(display)
    if (value == 0) {
      setDisplay('Not a number')
    }
    // decial precision needs to fix
    else {
      const res = 1 / value
      setDisplay(String(res))
    }
  }

  const onSquareRootBtnClick = () => {
    const value = Number(display)
    const res = Math.sqrt(value);
    setDisplay(String(res))
  }

  const onAllClearButtonClick = () => {
    setMemory(0)
    setResult(0)
    setPendingOperator(undefined)
    setDisplay('0')
    setWaitingForOperand(true)
  }

  const onClearEntryButtonClick = () => {
    setDisplay('0')
    setWaitingForOperand(true)
  }

  const onMemoryRecallButtonClick = () => {
    setDisplay(memory.toString())
    setWaitingForOperand(true)
  }

  const onMemoryClearButtonClick = () => {
    setMemory(0)
    setWaitingForOperand(true)
  }

  const onMemoryPlusButtonClick = () => {
    setMemory(memory + Number(display))
    setWaitingForOperand(true)
  }

  const onMemoryMinusButtonClick = () => {
    setMemory(memory - Number(display))
    setWaitingForOperand(true)
  }

  const handlePremiumOpen = () => {
    setPremiumOpen(true);
  }
  const handlePremiumClose = () => {
    setPremiumOpen(false);
  }
  return (
    <>
      <StyledHeader>
        <StyledTitle>WEB CALCULATOR</StyledTitle>
        <StyledButton onClick={handlePremiumOpen}>Go Premium</StyledButton>
      </StyledHeader>
      <StyledCalculator>
        
        <Modal open={premiumOpen} handleModalClose={handlePremiumClose} handleSubscribeOpen={handleSubscribeOpen} />
        <StyledPanel>
          <Display value={display} hasMemory={memory !== 0} expression={typeof pendingOperator !== 'undefined' ? `${result}${pendingOperator}${waitingForOperand ? '' : display}` : ''} />
          <Pad
            openPremiumLayout={subscribeOpen}
            onDigitButtonClick={onDigitButtonClick}
            onPointButtonClick={onPointButtonClick}
            onOperatorButtonClick={onOperatorButtonClick}
            onChangeSignButtonClick={onChangeSignButtonClick}
            onSquareBtnClick={onSquareBtnClick}
            onPercentageBtnClick={onPercentageBtnClick}
            onReciprocalClick={onReciprocalClick}
            onSquareRootBtnClick={onSquareRootBtnClick}
            onEqualButtonClick={onEqualButtonClick}
            onAllClearButtonClick={onAllClearButtonClick}
            onClearEntryButtonClick={onClearEntryButtonClick}
            onMemoryRecallButtonClick={onMemoryRecallButtonClick}
            onMemoryClearButtonClick={onMemoryClearButtonClick}
            onMemoryPlusButtonClick={onMemoryPlusButtonClick}
            onMemoryMinusButtonClick={onMemoryMinusButtonClick}
          />
        </StyledPanel>
      </StyledCalculator>
    </>
  )
}

export default App