import AppRouter from "./router/AppRouter";
import { ToastContainer, Zoom } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="dark"
        transition={Zoom}
        closeOnClick
      />
      <AppRouter />
    </>
  );
}

export default App;
