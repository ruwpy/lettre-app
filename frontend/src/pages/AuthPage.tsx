import { supabase } from "../../supabase";
import lettre from "/lettre.svg";
import { useUserStore } from "../stores/userStore";
import { Navigate } from "react-router-dom";

export default function AuthPage() {
  const user = useUserStore((state) => state.user);
  const authGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.log(error);
  };

  return !user ? (
    <div className="text-white w-full max-w-sm m-auto flex flex-col items-center mt-24">
      <img className="w-44" src={lettre} alt="" />
      <h2 className="text-lg font-semibold mt-6">Login to Lettre</h2>
      <button
        onClick={() => authGoogle()}
        className="bg-indigo-500 px-6 py-3 rounded-xl mt-5"
      >
        Continue with Google
      </button>
    </div>
  ) : (
    <Navigate to="/" />
  );
}
