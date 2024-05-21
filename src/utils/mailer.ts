import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER as string,
        pass: process.env.EMAIL_PASS as string
    },
});

export const formatWeatherDataAsTable = (weatherDataArray: any[]): string => {
    let rows = weatherDataArray.map(data => 
        `
        
        <tr>
            <td>${data.id}</td>
            <td>${data.city}</td>
            <td>${data.country}</td>
            <td>${data.time} </td>
            <td>${data.weather}</td>
            
        </tr>
    `).join('');
    
    return `
        <table border="1">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Date</th>
                    <th>Weather</th>
                   
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    `;
};


export const sendMail = async (to: string, subject: string, htmlContent: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USER as string,
        to,
        subject,
        html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
};
