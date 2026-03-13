import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';

/**
 * Root App Component
 * Handles the main layout container and routing.
 */
function App() {
    return (
        <div className="min-h-screen">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
