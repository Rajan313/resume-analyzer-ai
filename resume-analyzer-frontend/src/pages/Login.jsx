import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box
} from "@mui/material";
import toast from "react-hot-toast";
import { login } from "../services/authService";

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

            localStorage.setItem("email", response.data.email);
            toast.success("Login Successful");

            navigate("/dashboard");

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Invalid email or password"
            );

        }

    };

    return (

        <Container
            maxWidth="sm"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh"
            }}
        >

            <Paper
                elevation={6}
                sx={{
                    padding: 5,
                    width: "100%",
                    borderRadius: 3
                }}
            >

                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                >
                    Resume Analyzer
                </Typography>

                <Typography
                    align="center"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    AI Powered ATS Resume Analyzer
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        type="password"
                        label="Password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mt: 3 }}
                        type="submit"
                    >
                        Login
                    </Button>

                </Box>

                <Typography
                    align="center"
                    sx={{ mt: 3 }}
                >

                    Don't have an account?

                    <Link
                        to="/register"
                        style={{
                            marginLeft: 5,
                            textDecoration: "none"
                        }}
                    >
                        Register
                    </Link>

                </Typography>

            </Paper>

        </Container>

    );

}

export default Login;