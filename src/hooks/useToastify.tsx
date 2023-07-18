import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useToast = () => {
  const notify = (msg: string, type: "error" | "success") =>
    type === "success"
      ? toast.success(msg, { className: "toast-message" })
      : toast.error(msg, { className: "toast-message-err" });

  // useEffect(()=>{
  //     notify()
  // },[])

  return { notify };
};

export default useToast;
