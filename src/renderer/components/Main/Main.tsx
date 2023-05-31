import styled from 'styled-components';
import React, {useEffect} from 'react';
import {ipcMain} from "electron";

const Title = styled.div`
  color: red;
`

const Main = () => {
  
  ipcMain.on('TE', (event, payload) => {
    console.log(event)
  })

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey) {
      if (event.key === 'ArrowUp') {
      
      } else if (event.key === 'ArrowDown') {

      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <Title>Hello!</Title>
  )
}

export default Main
