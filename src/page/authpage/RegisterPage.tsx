import CustomButton from "@/components/CustomButton";
import CustomInputWithLabel from "@/components/CustomInputWithLabel";
import useUserStore from "@/stores/userStore";
import validateRegister from "@/validation/registerValidator";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const initialInput = {
  username: "",
  password: "",
  confirmPassword: "",
};

const initialError = {
  username: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage() {
  const { register } = useUserStore();
  const navigate = useNavigate();
  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState(initialError);

  const hdlSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validateRegister(input);
    if (result.error && result.errors) {
      setError(result.errors);
      toast.error("Register failed");
      return;
    }
    register(input);
    toast.success("Register success");
    navigate("/login");
  };

  const hdlOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(initialError);
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const hdlBack = () => {
    navigate("/");
  };

  return (
    <div className="bg-primary-color h-screen flex flex-col items-center justify-center">
      <div className="w-[500px] flex flex-col gap-5 text-4xl text-white font-semibold">
        <h1 className="">Register</h1>
        <form onSubmit={hdlSubmit} className="flex flex-col gap-3">
          <CustomInputWithLabel
            label="username"
            id="username"
            value={input.username}
            onChange={hdlOnChange}
            errorMsg={error.username}
          />
          <CustomInputWithLabel
            label="password"
            id="password"
            value={input.password}
            onChange={hdlOnChange}
            type="password"
            errorMsg={error.password}
          />
          <CustomInputWithLabel
            label="confirmPassword"
            id="confirmPassword"
            value={input.confirmPassword}
            onChange={hdlOnChange}
            type="password"
            errorMsg={error.confirmPassword}
          />
          <CustomButton>Sign up</CustomButton>
          <CustomButton type="button" onClick={hdlBack}>
            Back
          </CustomButton>
        </form>
      </div>
    </div>
  );
}
