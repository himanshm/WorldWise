import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import Root from './Root.tsx';

import CitiesContextProvider from './contexts/CitiesContext.tsx';
import AuthProvider from './contexts/FakeAuthContext.tsx';

function App() {
  const router = createBrowserRouter(createRoutesFromElements(Root));

  // Since the React.Suspense component just needs to be higher in the tree than the lazy component, you might also wrap the RouterProvider in Navigation in the Suspense component.

  return (
    <AuthProvider>
      <CitiesContextProvider>
        <RouterProvider router={router} />
      </CitiesContextProvider>
    </AuthProvider>
  );
}

export default App;
