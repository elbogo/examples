/**
 *   on 2016-10-10.
 */

import moment from 'moment'

import globalConfig from '../globalConfig';

export default function applicationBody (application) {

    const { vacancy, viewer } = application;

    const now = moment();

    return `
        <table class="j-table jiveBorder" style="border: 1px solid #c6c6c6;" width="100%">
            <tbody>
                <tr>
                    <td style="width: 32%;"><strong>Vacancy</strong></td>
                    <td><a href="${globalConfig.clientBaseUrl}/vacancy/${vacancy.vacancyId}">${vacancy.title}</a></td>
                </tr>
                <tr>
                    <td><strong>Applicant</strong></td>
                    <td><a href="${viewer.href}">${viewer.name.formatted}</a></td>
                </tr>
                <tr>
                    <td><strong>CV</strong></td>
                    <td><a href="${application.cvURL}">${application.cvURL}</a></td>
                </tr>
                <tr>
                    <td><strong>Date of application</strong></td>
                    <td>${now.format('DD.MM.YYYY')}</td>
                </tr>
                <tr>
                <td colspan="2">
                    <p><strong>Accompanying letter:</strong></p>
                    <p>${application.comment}</p>
                </td>
                </tr>
            </tbody>
        </table>
    `
}