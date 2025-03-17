import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AssignmentSubmission() {
    const [file, setFile] = useState(null);
    const [link, setLink] = useState("");
    const [submissions, setSubmissions] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = () => {
        if (!file && !link) return alert("Please upload a file or provide a link");
        const newSubmission = file ? { type: "file", name: file.name } : { type: "link", url: link };
        setSubmissions([...submissions, newSubmission]);
        setFile(null);
        setLink("");
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <Card>
                <CardContent className="p-4">
                    <h2 className="text-xl font-bold mb-4">Submit Assignment</h2>
                    <Input type="file" onChange={handleFileChange} className="mb-2" />
                    <p className="text-center text-gray-500 my-2">OR</p>
                    <Input type="url" placeholder="Enter link" value={link} onChange={(e) => setLink(e.target.value)} className="mb-4" />
                    <Button onClick={handleSubmit} className="w-full">Submit</Button>
                </CardContent>
            </Card>
            <div className="mt-6">
                <h3 className="text-lg font-semibold">Submissions</h3>
                {submissions.length === 0 ? <p className="text-gray-500">No submissions yet</p> : (
                    <ul className="mt-2 space-y-2">
                        {submissions.map((submission, index) => (
                            <li key={index} className="p-2 border rounded">
                                {submission.type === "file" ? <span>📄 {submission.name}</span> : <a href={submission.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">🔗 {submission.url}</a>}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}