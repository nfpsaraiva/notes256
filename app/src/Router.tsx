import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BlockNotes, LocalNotes, WebNotes, Home } from '@/pages';
import { ReactNode, useEffect, useState } from 'react';
import { AppOverlay } from './components/Layout';
import { useTimeout } from '@mantine/hooks';

const router = createBrowserRouter([
  { path: '/', element: (<Home />) },
  { path: '/block-notes', element: (<BlockNotes />), },
  { path: '/web-notes', element: (<WebNotes />), },
  { path: '/local-notes', element: (<LocalNotes />), },
]);

export function Router() {
  const [toRender, setToRender] = useState<ReactNode>(<AppOverlay />);

  const { start } = useTimeout(() => setToRender(<RouterProvider router={router} />), 500);

  useEffect(() => start(), []);
  
  return toRender
}