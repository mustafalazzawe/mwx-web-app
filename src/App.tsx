import { useEffect, useRef } from 'react'
import { ThreeScene } from './scene/scene'
import './App.css'

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<ThreeScene | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      // Cleanup previous scene if it exists
      if (sceneRef.current) {
        sceneRef.current.cleanup()
        sceneRef.current = null
      }
      // Create new scene
      sceneRef.current = new ThreeScene(containerRef.current)
    }

    return () => {
      if (sceneRef.current) {
        sceneRef.current.cleanup()
        sceneRef.current = null
      }
    }
  }, []) // Empty dependency array to only run on mount/unmount

  return (
    <div ref={containerRef} style={{ width: '100vw', height: '100vh' }} />
  )
}

export default App