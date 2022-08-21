import { toast } from "react-toastify";

const toaster = {
  error: (message) => {
    toast.error(message, {
      theme: "colored",
    });
  },
  success: (message) => {
    toast.success(message, {
      theme: "colored",
    });
  },
};

export default toaster;
