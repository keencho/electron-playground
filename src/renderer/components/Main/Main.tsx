import styled from 'styled-components';
import React, {useEffect} from 'react';
import { DefaultChannel } from "../../../main/channel";

const Title = styled.div`
	color: red;
`

const Main = () => {
  
  const test = () => {
    window.electron.ipcRenderer.sendMessage(DefaultChannel, ['ping']);
  }
  
  const onKeyDown = (event: KeyboardEvent) => {
    window.electron.ipcRenderer.sendMessage(DefaultChannel, ['ping']);
  }
  
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])
  
  return (
    <Title>
      Hello!
      <button onClick={test}>버튼</button>
    </Title>
  )
}

export default Main
