import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, type FormEvent } from "react";
import { useSearchParams } from "react-router";

export default function SearchPage() {
  const [_searchParams, setSearchParams] = useSearchParams();

  const refInput = useRef<HTMLInputElement>(null);

  const hdlSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!refInput.current?.value) return;
    setSearchParams({ movieName: refInput.current.value });
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="w-[80%] flex flex-col gap-3">
          <h1 className="text-4xl text-white font-semibold ">Search</h1>
          <div>
            <form className="flex" onSubmit={hdlSearch}>
              <Input ref={refInput} className="bg-white w-[400px]" />
              <Button className="hover:cursor-pointer hover:opacity-80 ml-3 bg-tertiary-color primary-color font-4xl font-semibold">
                Search
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
