import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { type TLoginSchema } from "@/validations";
import { Navigate } from "react-router-dom";
import { Heading } from "@/components/common";
import { Input } from "@/components/forms";
import useLogin from "./useLogin";

const Login = () => {
  const {
    submitHandler,
    handleSubmit,
    accessToken,
    register,
    loading,
    errors,
    error,
  } = useLogin();

  if (accessToken) return <Navigate to={"/"} />;

  return (
    <>
      <Heading title="User Login" />
      {error && (
        <Row>
          <Col lg={{ span: "6", offset: "3" }}>
            <Alert variant={"danger"} className="text-center">
              {error}
            </Alert>
          </Col>
        </Row>
      )}
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Form
            noValidate
            className="pb-5"
            onSubmit={handleSubmit(submitHandler)}
          >
            <Input<TLoginSchema>
              controlId="email"
              label="Email Address"
              placeholder="Enter your email address"
              name="email"
              register={register}
              validationError={errors.email?.message}
            />

            <Input
              controlId="password"
              label="Password"
              type="password"
              placeholder="Enter your Password"
              name="password"
              register={register}
              validationError={errors.password?.message}
            />

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={loading === "pending"}
            >
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm" /> Loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
