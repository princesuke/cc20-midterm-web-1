import { Button } from "./ui/button";

type CustomButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
};

export default function CustomButton(props: CustomButtonProps) {
  return (
    <Button
      type={props.type}
      onClick={props.onClick}
      className="mt-7 bg-tertiary-color hover:opacity-80 py-5 px-5 text-2xl hover:cursor-pointer"
    >
      {props.children}
    </Button>
  );
}
