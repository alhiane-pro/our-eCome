import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { type TRegisterSchema } from "@/validations";
import { Heading } from "@/components/common";
import { Navigate } from "react-router-dom";
import { Input } from "@/components/forms";
import useRegister from "./useRegister";

// type Inputs = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// };

const Register = () => {
  const {
    emailAvailabilityStatus,
    submitHandler,
    handleSubmit,
    accessToken,
    emailCheker,
    register,
    loading,
    errors,
    error,
  } = useRegister();

  if (accessToken) return <Navigate to={"/"} />;

  return (
    <>
      <Heading title="User Registeration" />
      {error && (
        <Row>
          <Col lg={{ span: "6", offset: "3" }}>
            <Alert variant={"danger"} className="text-center">
              {error}
            </Alert>
          </Col>
        </Row>
      )}
      {/* <Row> */}
      {/* <Col md={{ span: 6, offset: 3 }}> */}
      <Form noValidate className="pb-5" onSubmit={handleSubmit(submitHandler)}>
        <Row>
          <Col lg={{ span: 6 }}>
            {/* <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                {...register("firstName")}
                // name="firstName"
                // value={firstName}
                // onChange={() => {
                //   setFirstName(event?.target.value);
                // }}
                // onBlur((e) => {})
                isInvalid={errors.firstName?.message ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName?.message}
              </Form.Control.Feedback>
            </Form.Group> */}
            <Input<TRegisterSchema>
              controlId="firstName"
              label="First Name"
              placeholder="Enter your first name"
              name="firstName"
              register={register}
              validationError={errors.firstName?.message}
            />
          </Col>

          <Col lg={{ span: 6 }}>
            <Input<TRegisterSchema>
              controlId="lastName"
              label="Last Name"
              placeholder="Enter your last name"
              name="lastName"
              register={register}
              validationError={errors.lastName?.message}
            />
          </Col>

          <Col lg={{ span: 6 }}>
            <Input<TRegisterSchema>
              controlId="email"
              label="Email Address"
              placeholder="Enter your email address"
              name="email"
              register={register}
              onBlur={emailCheker}
              validationError={errors.email?.message}
              emailAvailabilityStatus={emailAvailabilityStatus}
            />
          </Col>

          <Col lg={{ span: 6 }}>
            <Input<TRegisterSchema>
              controlId="password"
              label="Password"
              type="password"
              placeholder="Enter your Password"
              name="password"
              register={register}
              validationError={errors.password?.message}
            />
          </Col>

          <Col lg={{ span: 6 }}>
            <Input<TRegisterSchema>
              controlId="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your Password"
              name="confirmPassword"
              register={register}
              validationError={errors.confirmPassword?.message}
            />
          </Col>

          <Col lg={{ span: 6 }}>
            <Form.Label>Register User</Form.Label>
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={
                emailAvailabilityStatus === "checking" ||
                emailAvailabilityStatus === "notAvailable" ||
                loading === "pending"
              }
            >
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm" /> Loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </Col>
        </Row>
      </Form>
      {/* </Col> */}
      {/* </Row> */}
    </>
  );
};

export default Register;
