import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BlockNotes, LocalNotes, WebNotes, HowItWorks, Roadmap, About, Home } from '@/pages';

const router = createBrowserRouter([
  { path: '/', element: (<Home />), },
  { path: '/block-notes', element: (<BlockNotes />) },
  { path: '/web-notes', element: (<WebNotes />), },
  { path: '/local-notes', element: (<LocalNotes />), },
  { path: '/how-it-works', element: (<HowItWorks />), },
  { path: '/roadmap', element: (<Roadmap />), },
  { path: '/about', element: (<About />) }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
