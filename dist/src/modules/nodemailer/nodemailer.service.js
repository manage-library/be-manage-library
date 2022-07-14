"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMailerService = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const nodemailer = require("nodemailer");
let NodeMailerService = class NodeMailerService {
    constructor(configService) {
        this.configService = configService;
        this.oAuth2Client = new googleapis_1.google.auth.OAuth2(this.configService.get('CLIENT_ID'), this.configService.get('CLIENT_SECRET'));
        this.oAuth2Client.setCredentials({
            refresh_token: this.configService.get('REFRESH_TOKEN'),
        });
    }
    async sendMail({ email, code }) {
        const accessToken = await this.oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: this.configService.get('SENDER_EMAIL'),
                clientId: this.configService.get('CLIENT_ID'),
                clientSecret: this.configService.get('CLIENT_SECRET'),
                refreshToken: this.configService.get('REFRESH_TOKEN'),
                accessToken: accessToken,
            },
        });
        const mailOptions = {
            from: this.configService.get('SENDER_EMAIL'),
            to: email,
            subject: 'Gmail API NodeJS',
            text: `Verify forgot password code: ${code}`,
        };
        await transport.sendMail(mailOptions);
    }
};
NodeMailerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NodeMailerService);
exports.NodeMailerService = NodeMailerService;
//# sourceMappingURL=nodemailer.service.js.map