import sendMail from "../services/sendMail";
import React, { useState } from "react";
import './sendMail.css';
import { getBlockPresent, getBlockAbsent } from '../services/attendance'; 
import { toast } from "react-toastify";
function SendMail() {
    const [formData, setFormData] = useState({
        to: "abs@gmail.com",
        subject: "Daily Attendance Report",
        text: "",
    });
    const [status, setStatus] = useState("");

    const generateReport = async () => {
        const blocks = ["a", "b", "c", "d"];
        let report = `
            <h2>Daily Attendance Report</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background-color: #f2f2f2;">
                        <th style="border: 1px solid #ddd; padding: 8px;">Block</th>
                        <th style="border: 1px solid #ddd; padding: 8px;">Present Students</th>
                        <th style="border: 1px solid #ddd; padding: 8px;">Absent Students</th>
                    </tr>
                </thead>
                <tbody>
        `;
    
        for (const block of blocks) {
            try {
                const presentData = await getBlockPresent(block);
                const absentData = await getBlockAbsent(block);
                report += `
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 8px;">Block ${block.toUpperCase()}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${presentData.presentStudents.length}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${absentData.nonPresentStudents.length}</td>
                    </tr>
                `;
            } catch (error) {
                report += `
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 8px;">Block ${block.toUpperCase()}</td>
                        <td colspan="2" style="border: 1px solid #ddd; padding: 8px; color: red;">Error fetching data</td>
                    </tr>
                `;
            }
        }
    
        report += `
                </tbody>
            </table>
            <p style="margin-top: 20px;">Regards,<br><strong>Attendance Monitoring System</strong></p>
        `;
    
        return report;
    };
    

    const handleSendMail = async (e) => {
        e.preventDefault();
        try {
            const text = await generateReport();
            const response = await sendMail({ ...formData, text });

            if (response.success) {
                setStatus("Email sent successfully!");
                toast.success("Email sent successfully!");
            } else {
                setStatus("Failed to send email.");
            }
        } catch (error) {
            setStatus("An error occurred while sending the email.");
        }
    };

    return (
        <div className="send-mail-container">
            <h1>Send Mail</h1>
            <form onSubmit={handleSendMail} className="send-mail-form">
                <div className="form-group">
                    <label htmlFor="to">To:</label>
                    <input
                        type="email"
                        id="to"
                        name="to"
                        value={formData.to}
                        onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject:</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="send-mail-button">
                    Send Mail
                </button>
            </form>
            {status && <p className="status-message">{status}</p>}
        </div>
    );
}

export default SendMail;
