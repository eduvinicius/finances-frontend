import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { Spinner } from "./components/ui/Spinner";

function App() {
  return (
    <Suspense 
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner className="size-8" />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;