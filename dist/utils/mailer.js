"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = exports.formatWeatherDataAsTable = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});
const formatWeatherDataAsTable = (weatherDataArray) => {
    let rows = weatherDataArray.map(data => `
        
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
exports.formatWeatherDataAsTable = formatWeatherDataAsTable;
const sendMail = (to, subject, htmlContent) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: htmlContent,
    };
    yield transporter.sendMail(mailOptions);
});
exports.sendMail = sendMail;
