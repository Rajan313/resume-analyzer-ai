import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import toast from "react-hot-toast";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await login(form);

            localStorage.setItem("token", response.data.token);

            toast.success("Login Successful!");

            navigate("/dashboard");

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Something went wrong."
            );
        }

    };

    return (

        <div style={{
            width: "400px",
            margin: "100px auto",
            textAlign: "center"
        }}>

            <h1>Resume Analyzer</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
                />

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        cursor: "pointer"
                    }}
                >
                    Login
                </button>

            </form>

            <br />

            <Link to="/register">
                Create Account
            </Link>

        </div>

    );

}

export default Login;