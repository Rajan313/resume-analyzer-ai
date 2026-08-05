import { useState } from "react";
import { uploadResume } from "../services/resumeService";
import { analyzeResume } from "../services/analysisService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
    Container,
    Paper,
    Typography,
    Button,
    TextField,
    Grid,
    Card,
    CardContent,
    Chip,
    LinearProgress,
    Stack,
    Divider
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LogoutIcon from "@mui/icons-material/Logout";
import HistoryIcon from "@mui/icons-material/History";


function Dashboard() {

    const [file, setFile] = useState(null);

    const [jobDescription, setJobDescription] = useState("");

    const [resumeId, setResumeId] = useState(null);

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const [uploadedResume, setUploadedResume] = useState("");

    const navigate = useNavigate();

    const handleUpload = async () => {

        if (!file) {
            toast.error("Select a PDF first");
            return;
        }

        const formData = new FormData();

        formData.append("file", file);

        try {

            const response = await uploadResume(formData);
            setResumeId(response.data.resumeId);
            setUploadedResume(response.data.fileName);


            toast.success("Resume uploaded successfully");

        } catch (err) {

            console.error(err);

            toast.error(
                err.response?.data?.message ||
                "Something went wrong."
            );

        }

    };

    const handleAnalyze = async () => {

        if (!resumeId) {

            toast.error("Upload resume first");

            return;

        }

        if (!jobDescription.trim()) {

            toast.error("Enter Job Description");

            return;

        }

        try {

            setLoading(true);

            const response = await analyzeResume({

                resumeId,

                jobDescription

            });

            setResult(response.data);

            toast.success("Analysis Complete");

        } catch (err) {

            console.log(err);

            toast.error(
                err.response?.data?.message ||
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <Container maxWidth="lg" sx={{ py: 4 }}>

            {/* Header */}

            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    mb: 4,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                <Typography variant="h4" fontWeight="bold">

                    Resume Analyzer

                </Typography>

                <Stack direction="row" spacing={2}>

                    <Button
                        variant="outlined"
                        startIcon={<HistoryIcon />}
                        onClick={() => navigate("/history")}
                    >
                        History
                    </Button>

                    <Button
                        color="error"
                        variant="contained"
                        startIcon={<LogoutIcon />}
                        onClick={() => {

                            localStorage.removeItem("token");

                            window.location.href = "/";

                        }}
                    >
                        Logout
                    </Button>

                </Stack>

            </Paper>
            <Typography variant="h5" sx={{ mb: 3 }}>
                Welcome 👋 {localStorage.getItem("email")?.split("@")[0]}
            </Typography>
            <Grid container spacing={3}>

                {/* Upload */}

                <Grid item xs={12} md={6}>

                    <Card>

                        <CardContent>

                            <Typography variant="h6">

                                Upload Resume

                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                            />

                            <br /><br />

                            <Button
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                                onClick={handleUpload}
                            >

                                Upload Resume

                            </Button>

                            {uploadedResume && (

                                <Typography
                                    sx={{ mt: 2 }}
                                    color="success.main"
                                >

                                    ✅ {uploadedResume}

                                </Typography>

                            )}

                        </CardContent>

                    </Card>

                </Grid>

                {/* Job Description */}

                <Grid item xs={12} md={6}>

                    <Card>

                        <CardContent>

                            <Typography variant="h6">

                                Job Description

                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            <TextField
                                fullWidth
                                multiline
                                rows={8}
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />

                            <Button
                                sx={{ mt: 2 }}
                                fullWidth
                                variant="contained"
                                startIcon={<AutoAwesomeIcon />}
                                onClick={handleAnalyze}
                            >

                                Analyze Resume

                            </Button>

                        </CardContent>

                    </Card>

                </Grid>

                {/* Result */}

                {result && (

                    <Grid item xs={12}>

                        <Card>

                            <CardContent>

                                <Typography variant="h5">

                                    ATS Score

                                </Typography>

                                <Typography
                                    variant="h2"
                                    color={
                                        result.matchScore >= 80
                                            ? "success.main"
                                            : result.matchScore >= 60
                                                ? "warning.main"
                                                : "error.main"
                                    }
                                >

                                    {result.matchScore}%

                                </Typography>

                                <LinearProgress
                                    variant="determinate"
                                    value={result.matchScore}
                                    color={
                                        result.matchScore >= 80
                                            ? "success"
                                            : result.matchScore >= 60
                                                ? "warning"
                                                : "error"
                                    }
                                />

                                <Grid container spacing={3} sx={{ mt: 2 }}>

                                    <Grid item xs={12} md={4}>

                                        <Typography variant="h6">

                                            Strengths

                                        </Typography>

                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            flexWrap="wrap"
                                        >

                                            {result.strengths.map(skill => (

                                                <Chip
                                                    key={skill}
                                                    label={skill}
                                                    color="success"
                                                    sx={{ mb: 1 }}
                                                />

                                            ))}

                                        </Stack>

                                    </Grid>

                                    <Grid item xs={12} md={4}>

                                        <Typography variant="h6">

                                            Missing Skills

                                        </Typography>

                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            flexWrap="wrap"
                                        >

                                            {result.missingSkills.map(skill => (

                                                <Chip
                                                    key={skill}
                                                    label={skill}
                                                    color="error"
                                                    sx={{ mb: 1 }}
                                                />

                                            ))}

                                        </Stack>

                                    </Grid>

                                    <Grid item xs={12} md={4}>

                                        <Typography variant="h6">

                                            Suggestions

                                        </Typography>

                                        <ul>

                                            {result.suggestions.map((item, i) => (

                                                <li key={i}>{item}</li>

                                            ))}

                                        </ul>

                                    </Grid>

                                </Grid>

                            </CardContent>

                        </Card>

                    </Grid>

                )}

            </Grid>

        </Container>

    );

}

export default Dashboard;