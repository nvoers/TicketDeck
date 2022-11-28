import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Username is required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }
  return errors;
};

export default function LoginForm() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="container mx-auto flex grow justify-center">
      <form
        className="my-auto w-[75%] md:w-[30%]"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col justify-center">
          <input
            type="text"
            id="username"
            placeholder="USERNAME"
            className="border-light-gray mb-3 rounded-md border-2 p-1 text-center"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="mb-3">{formik.errors.username}</div>
          ) : null}
          <input
            type="password"
            id="password"
            placeholder="PASSWORD"
            className="border-light-gray mb-3 rounded-md border-2 p-1 text-center"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="mb-3">{formik.errors.password}</div>
          ) : null}
          <button
            type="submit"
            className="mx-auto w-[50%] rounded-full border-2 py-1 text-center"
          >
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
}
