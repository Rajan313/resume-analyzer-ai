import { useEffect, useState } from "react";
import { getHistory } from "../services/analysisService";

function History() {

    const [history, setHistory] = useState([]);

    useEffect(() => {
        loadHistory();
    }, []);

    async function loadHistory() {

        try {

            const response = await getHistory();

            setHistory(response.data);

        } catch (e) {

            console.log(e);

        }

    }

    return (

        <div style={{ width: "900px", margin: "30px auto" }}>

            <h1>Analysis History</h1>

            <table border="1" cellPadding="10">

                <thead>

                    <tr>

                        <th>Resume</th>

                        <th>Score</th>

                        <th>Date</th>

                    </tr>

                </thead>

                <tbody>

                    {history.map(item => (

                        <tr key={item.id}>

                            <td>{item.resumeName}</td>

                            <td>{item.matchScore}%</td>

                            <td>{item.createdAt}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default History;