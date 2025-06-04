import CustomButton from "@/components/CustomButton";
import CustomInputWithLabel from "@/components/CustomInputWithLabel";
import useUserStore from "@/stores/userStore";
import validateLogin from "@/validation/loginValidator";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const initialInput = {
  username: "",
  password: "",
};

const initialError = {
  username: "",
  password: "",
};

function LoginPage() {
  const { login } = useUserStore();

  const navigate = useNavigate();

  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState(initialError);

  const hdlOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(initialError);
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const hdlSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validateLogin(input);
    if (result.error && result.errors) {
      setError(result.errors);
      return;
    }
    login(input);
    toast.success("Login success");
    navigate("/movie");
  };

  const hdlBack = () => {
    navigate("/");
  };
  return (
    <div className="bg-primary-color h-screen flex flex-col items-center justify-center">
      <div className="w-[500px] flex flex-col gap-5 text-4xl text-white font-semibold">
        <h1 className="">Log in</h1>
        <form onSubmit={hdlSubmit} className="flex flex-col gap-3">
          <CustomInputWithLabel
            label="username"
            id="username"
            errorMsg={error.username}
            value={input.username}
            onChange={hdlOnChange}
          />
          <CustomInputWithLabel
            label="password"
            id="password"
            errorMsg={error.password}
            value={input.password}
            onChange={hdlOnChange}
            type="password"
          />
          <CustomButton>Log in</CustomButton>
          <CustomButton type="button" onClick={hdlBack}>
            Back
          </CustomButton>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
