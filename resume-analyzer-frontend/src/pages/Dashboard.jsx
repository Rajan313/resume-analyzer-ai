import { useState } from "react";
import { uploadResume } from "../services/resumeService";
import { analyzeResume } from "../services/analysisService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const [uploadedResume, setUploadedResume] = useState("");

function Dashboard() {

    const [file, setFile] = useState(null);

    const [jobDescription, setJobDescription] = useState("");

    const [resumeId, setResumeId] = useState(null);

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);
    
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

        <div style={{ width: "900px", margin: "40px auto" }}>

            <h1>Resume Analyzer</h1>

            <hr />

            <h3>Upload Resume</h3>

            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <br /><br />

            <button onClick={handleUpload}>
                Upload Resume
            </button>

            <br /><br />

            {uploadedResume && (
                <div
                    style={{
                        padding: "10px",
                        backgroundColor: "#e8f5e9",
                        border: "1px solid green",
                        borderRadius: "5px"
                    }}
                >
                    ✅ Uploaded Resume: <strong>{uploadedResume}</strong>
                </div>
            )}

            <hr />

            <h3>Job Description</h3>

            <textarea
                rows="8"
                cols="90"
                value={jobDescription}
                onChange={(e) =>
                    setJobDescription(e.target.value)
                }
            />

            <br /><br />

            <button onClick={handleAnalyze}>
                Analyze Resume
            </button>

            <hr />

            <h3>Analysis Result</h3>
            {result && (
                <>
                    <h2 style={{ color: "green" }}>
                        ATS Score : {result.matchScore}%
                    </h2>

                    <h3>Strengths</h3>
                    {result.strengths.map(skill => (
                        <span
                            key={skill}
                            style={{
                                padding: "6px",
                                margin: "4px",
                                border: "1px solid green",
                                display: "inline-block"
                            }}
                        >
                            {skill}
                        </span>
                    ))}

                    <h3>Missing Skills</h3>
                    <ul>
                        {result.missingSkills.map((skill, i) => (
                            <li key={i}>{skill}</li>
                        ))}
                    </ul>

                    <h3>Suggestions</h3>
                    <ul>
                        {result.suggestions.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </>
            )}

            {
                result && (

                    <div>

                        <h2 style={{ color: "green" }}>
                            ATS Score : {result.matchScore}%
                        </h2>

                        <h3>Strengths</h3>

                        {result.strengths.map(skill => (
                            <span
                                key={skill}
                                style={{
                                    padding: "6px",
                                    margin: "4px",
                                    border: "1px solid green",
                                    display: "inline-block"
                                }}
                            >
                                {skill}
                            </span>
                        ))}

                        <h3>Missing Skills</h3>

                        <ul>

                            {result.missingSkills.map((item, index) => (

                                <li key={index}>{item}</li>

                            ))}

                        </ul>

                        <h3>Suggestions</h3>

                        <ul>

                            {result.suggestions.map((item, index) => (

                                <li key={index}>{item}</li>

                            ))}

                        </ul>

                    </div>

                )
            }

            <button
                onClick={() => {

                    localStorage.removeItem("token");

                    window.location.href = "/";

                }}
            >
                Logout
            </button>

            <button onClick={() => navigate("/history")}>
                View History
            </button>

        </div>

    );

}

export default Dashboard;