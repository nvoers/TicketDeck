import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "This field is required";
  }
  if (!values.password) {
    errors.password = "This field is required";
  }
  if (!values.name) {
    errors.name = "This field is required";
  }
  if (!values.rpassword) {
    errors.rpassword = "This field is required";
  }
  if (!values.email) {
    errors.email = "This field is required";
  }
  if (values.password !== values.rpassword) {
    errors.rpassword = "Passwords do not match";
  }
  if (!values.email.includes("@")) {
    errors.email = "Invalid email";
  }
  return errors;
};

async function addUser(values) {
  let userData = {
    email: values.email,
    username: values.username,
    password: values.password,
    name: values.name,
  };

  const userResponse = await fetch("/api/user/add", {
    method: "POST",
    body: JSON.stringify(userData),
  });

  if (!userResponse.ok) {
    throw new Error(userResponse.statusText);
  }
  return await userResponse.json();
}

export default function RegisterForm() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      rpassword: "",
      email: "",
      name: "",
    },
    validate,
    onSubmit: (values) => {
      addUser(values);
    },
  });
  return (
    <div className="container mx-auto flex grow justify-center">
      <form
        className="my-auto w-[75%] md:w-[30%]"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="mb-8 text-center text-7xl font-bold">REGISTER</h1>
        <div className="flex flex-col justify-center">
          <input
            type="text"
            id="name"
            placeholder="NAME"
            className="border-light-gray mb-3 rounded-md border-2 p-1 text-center"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="mb-3">{formik.errors.name}</div>
          ) : null}
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
            type="text"
            id="email"
            placeholder="EMAIL"
            className="border-light-gray mb-3 rounded-md border-2 p-1 text-center"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="mb-3">{formik.errors.email}</div>
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
          <input
            type="password"
            id="rpassword"
            placeholder="REPEAT PASSWORD"
            className="border-light-gray mb-3 rounded-md border-2 p-1 text-center"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rpassword}
          />
          {formik.touched.rpassword && formik.errors.rpassword ? (
            <div className="mb-3">{formik.errors.rpassword}</div>
          ) : null}
          <button
            type="submit"
            className="mx-auto w-[50%] rounded-full border-2 py-1 text-center"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}
