import styled from 'styled-components';
import React, {useEffect} from 'react';
import { DefaultChannel } from "../../../main/channel";

const Title = styled.div`
	color: red;
`

const Main = () => {
  
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey) {
      if (event.key === 'ArrowUp') {
        window.electron.ipcRenderer.sendMessage(DefaultChannel, ['ping']);
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
