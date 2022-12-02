import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

async function addUser(values, setError, formik) {
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

  const res = await userResponse.json();

  if (userResponse.status === 409) {
    if (res.message.includes("username")) {
      setError({ username: "An account with this username already exists" });
    }
    if (res.message.includes("email")) {
      setError({ email: "An account with this email already exists" });
    }
  }
  return res;
}

export default function RegisterForm() {
  let router = new useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      rpassword: "",
      email: "",
      name: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
      rpassword: Yup.string()
        .required("Required")
        .equals([Yup.ref("password")], "Passwords must match"),
      email: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
    }),
    onSubmit: (values, { setErrors }) => {
      addUser(values, setErrors, formik);
      router.push("/");
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
