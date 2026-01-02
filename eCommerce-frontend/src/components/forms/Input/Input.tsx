import type { Path, FieldValues, UseFormRegister } from "react-hook-form";
import type { TEmailStatus } from "@/types";
import { Form } from "react-bootstrap";
import { memo } from "react";

interface InputProps<TFieldValues extends FieldValues> {
  controlId: string;
  label: string;
  type?: string;
  placeholder: string;
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  validationError: string | undefined;
  emailAvailabilityStatus?: TEmailStatus;
}

const Input = <TFieldValues extends FieldValues>({
  controlId,
  label,
  type = "text",
  placeholder,
  name,
  register,
  onBlur,
  validationError,
  emailAvailabilityStatus,
}: InputProps<TFieldValues>) => {
  const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) onBlur(event);
    register(name).onBlur(event);
  };

  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        {...register(name)}
        isInvalid={validationError ? true : false}
        onBlur={onBlurHandler}
        disabled={emailAvailabilityStatus === "checking"}
      />

      <Form.Control.Feedback type="invalid" className="d-block">
        {validationError ||
          (emailAvailabilityStatus === "notAvailable" &&
            "This email is already in use!") ||
          (emailAvailabilityStatus === "failed" && " Error from the server!")}
      </Form.Control.Feedback>

      {emailAvailabilityStatus === "checking" && (
        <Form.Text muted>
          We're currently checking the availability of this email address.
          Please wait a moment.
        </Form.Text>
      )}

      {emailAvailabilityStatus === "available" && (
        <Form.Control.Feedback type="valid" className="d-block">
          This email is available for use.
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default memo(Input) as typeof Input;
