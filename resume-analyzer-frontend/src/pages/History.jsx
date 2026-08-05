import { useEffect, useState } from "react";
import { getHistory } from "../services/analysisService";
import { useNavigate } from "react-router-dom";

import {
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    Stack,
    Chip,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout";

function History() {

    const navigate = useNavigate();

    const [history, setHistory] = useState([]);

    useEffect(() => {
        loadHistory();
    }, []);

    async function loadHistory() {

        try {

            const response = await getHistory();

            setHistory(response.data);

        } catch (err) {

            console.log(err);

        }

    }

    return (

        <Container maxWidth="lg" sx={{ mt: 4 }}>

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >

                <Typography variant="h4">

                    Analysis History

                </Typography>

                <Stack direction="row" spacing={2}>

                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate("/dashboard")}
                    >

                        Dashboard

                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<LogoutIcon />}
                        onClick={() => {

                            localStorage.removeItem("token");

                            navigate("/");

                        }}
                    >

                        Logout

                    </Button>

                </Stack>

            </Stack>

            <Card>

                <CardContent>

                    <TableContainer component={Paper}>

                        <Table>

                            <TableHead>

                                <TableRow>

                                    <TableCell>
                                        Resume
                                    </TableCell>

                                    <TableCell>
                                        ATS Score
                                    </TableCell>

                                    <TableCell>
                                        Date
                                    </TableCell>

                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {history.map((item) => (

                                    <TableRow key={item.id}>

                                        <TableCell>

                                            {item.resumeName}

                                        </TableCell>

                                        <TableCell>

                                            <Chip
                                                label={`${item.matchScore}%`}
                                                color={
                                                    item.matchScore >= 70
                                                        ? "success"
                                                        : "warning"
                                                }
                                            />

                                        </TableCell>

                                        <TableCell>

                                            {new Date(
                                                item.createdAt
                                            ).toLocaleString()}

                                        </TableCell>

                                    </TableRow>

                                ))}

                            </TableBody>

                        </Table>

                    </TableContainer>

                </CardContent>

            </Card>

        </Container>

    );

}

export default History;