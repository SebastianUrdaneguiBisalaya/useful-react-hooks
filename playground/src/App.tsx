import { useIsDesktop, useScreenSize } from '../../src'

export function App() {
  const size = useScreenSize();
  const isDesktop = useIsDesktop(500);
  return (
    <div className='container'>
      <h1>{size.width}</h1>
      <h1>{`${isDesktop}`}</h1>
    </div>
  )
}
