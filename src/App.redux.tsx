import { Provider as ReduxProvider } from 'react-redux';

import { store } from './store';
import { VideoContainer } from './pages/Player';

export function App() {
  return (
    <ReduxProvider store={store}>
      <VideoContainer />
    </ReduxProvider>
  )
}
