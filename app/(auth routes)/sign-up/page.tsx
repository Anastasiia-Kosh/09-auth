"use client";
import { useRouter } from "next/navigation";
import css from "./SignUpPage.module.css"
import { register, RegisterRequest } from "@/lib/api/clientApi";
import { useAuth } from "@/lib/store/authStore";


const SignUp = () => {
  const router = useRouter();
  const setAuth = useAuth((store)=>store.setUser)
    const handleRegister = async (action: FormData) => {
      try {
        const loginData: RegisterRequest = {
          email: action.get("email") as string,
          password: action.get("password") as string,
        };
        const user = await register(loginData);
        if (user) {
          setAuth(user)
          router.push("/profile");
        }
      } catch {
        alert("error....");
      }
    };
  
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleRegister}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        <p className={css.error}>Error</p>
      </form>
    </main>
  );
};
export default SignUp;
