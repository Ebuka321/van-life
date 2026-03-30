import { useRouteError } from "react-router-dom";

export default function ErrorComponent() {
  const routeError = useRouteError(); // get the error from the router

  // Safely extract a message
  const message =
    routeError instanceof Error
      ? routeError.message
      : JSON.stringify(routeError);

  // Optional: for status and statusText if routeError has them
  const status =
    routeError && typeof routeError === "object" && "status" in routeError
      ? (routeError as { status?: number }).status
      : "Unknown";
  const statusText =
    routeError && typeof routeError === "object" && "statusText" in routeError
      ? (routeError as { statusText?: string }).statusText
      : "";

  return (
    <div className="error-page">
      <h1>Error: {message}</h1>
      <pre>
        {status} - {statusText}
      </pre>
    </div>
  );
}
