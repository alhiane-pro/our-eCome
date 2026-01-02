import { registerSchema, type TRegisterSchema } from "@/validations";
import { registerUser, resetUI } from "@/store/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCheckEmailAvailability } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addToast } from "@/store/toasts/toasts.slice";

const useRegister = () => {
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const {
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  } = useCheckEmailAvailability();

  const { loading, error, accessToken } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const emailCheker = async (event: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && enteredEmail !== event.target.value) {
      checkEmailAvailability(event.target.value);
    }

    if (isDirty && invalid && enteredEmail) {
      resetCheckEmailAvailability();
    }
  };

  const submitHandler: SubmitHandler<TRegisterSchema> = (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(registerUser({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => {
        dispatch(
          addToast({
            type: "success",
            message: "your account successfully created please login",
          })
        );
        navigate("/login");
      });
    // toast.promise(promise, {
    //   pending: "Promise is pending, please wait...",
    //   success: "Your account successfully created.\nPlease login",
    //   error: "error",
    // });
  };

  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);

  return {
    emailAvailabilityStatus,
    submitHandler,
    handleSubmit,
    accessToken,
    emailCheker,
    register,
    loading,
    errors,
    error,
  };
};

export default useRegister;
