import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { useToggle } from 'react-use'

import styles from './App.module.css'

function App() {
  const [visible, toggle] = useToggle(false)

  return (
    <div className={styles.App}>
      <p className={styles.title}>Hello Vite + React!</p>
      <Button type="primary" onClick={() => toggle(true)}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" visible={visible} onOk={() => toggle(false)} onCancel={() => toggle(false)}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  )
}

export default App
