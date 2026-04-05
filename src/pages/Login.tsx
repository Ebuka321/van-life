import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from "react-router-dom";
import { loginUser } from "../api";

export function loader({ request }: LoaderFunctionArgs) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const email: string = String(formData.get("email") ?? "");
  const password: string = String(formData.get("password") ?? "");

  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/host";

  try {
    await loginUser({ email, password });
    localStorage.setItem("loggedin", JSON.stringify(true));
    const response: any = redirect(pathname);
    response.body = true;
    return response;
  } catch (error) {
    // Narrow the error safely
    if (error instanceof Error) {
      return error.message;
    }

    // Fallback for unknown errors
    return "An unexpected error occurred";
  }
}

export default function Login() {
  const navigation = useNavigation();
  const message = useLoaderData();
  const errorMessage = useActionData();

  return (
    <div className="login-container">
      <h1>sign in to your account</h1>
      {errorMessage && <h3 className="red">{errorMessage}</h3>}
      {message && <h3 className="red">{message}</h3>}
      <Form method="post" className="login-form" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button
          type="submit"
          disabled={navigation.state === "submitting" ? true : false}
        >
          {navigation.state === "submitting" ? "Logging in...." : "Log In"}
        </button>
      </Form>
    </div>
  );
}
