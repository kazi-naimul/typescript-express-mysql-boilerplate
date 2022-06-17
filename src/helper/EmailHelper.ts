/* eslint-disable class-methods-use-this */

import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { config } from '../config/config';
import { logger } from '../config/logger';

export default class EmailHelper {
    async sendEmail(
        from: string,
        to: string,
        subject: string,
        body: string,
        auth: null | { apiKey: string; domain: string } = null,
        attachments: string | Array<string> = []
    ) {
        try {
            const apiKey = auth === null ? config.mailgun.apiKey : auth.apiKey;
            const domain = auth === null ? config.mailgun.domain : auth.domain;
            const sender = from === null ? config.systemEmail : from;
            const mailgun = new Mailgun(formData);
            const client = mailgun.client({
                username: 'api',
                key: apiKey,
            });
            let postData: {
                from: string;
                to: string;
                subject: string;
                html: string;
                attachments?: Array<string>;
            } = {
                from: sender,
                to,
                subject,
                html: body,
            };
            if (attachments.length > 0 || attachments !== '') {
                let attachmentArr: Array<string> = [];
                if (typeof attachments === 'string') attachmentArr.push(attachments);
                else {
                    attachmentArr = attachments;
                }
                postData = {
                    ...postData,
                    attachments: attachmentArr,
                };
            }
            return !!(await client.messages.create(domain, postData));
        } catch (err) {
            logger.error(err);
            return false;
        }
    }
}
