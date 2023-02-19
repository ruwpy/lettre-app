import { supabase } from "../../supabase";

export default function AuthPage() {
  const authGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.log(error);
  };

  return (
    <div>
      <button onClick={() => authGoogle()}>гугл</button>
    </div>
  );
}
