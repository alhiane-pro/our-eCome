import { loginSchema, type TLoginSchema } from "@/validations";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import { loginUser, resetUI } from "@/store/auth/auth.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useLogin = () => {
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const submitHandler: SubmitHandler<TLoginSchema> = (data) => {
    dispatch(loginUser(data))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);

  return {
    submitHandler,
    handleSubmit,
    accessToken,
    register,
    loading,
    errors,
    error,
  };
};

export default useLogin;
