const axios = require('axios');
const moment = require('moment');

const DEBUG = parseInt(process.env.DEBUG) === 1;

async function getCurutCombo() {
    try {
        const response = await axios.get('https://api21.datavibe.top/api/GetCombo');
        const { combo, date, expires } = response.data;

        const expiresFormatted = moment.unix(expires).format('DD-MM-YYYY HH:mm:ss');

        const formattedCombo = combo.map(item => `- \`${item.replace(/_/g, ' ')}\``).join('\n');

        return `*Combo Curut* 🐀\n\n*Card:*\n${formattedCombo}\n\n*Date:*\n${date}\n\n*Expires:*\n${expiresFormatted}`;
    } catch (error) {
        if (DEBUG) {
            console.error(`  - [curutService] Error fetching curut-combo: ${error.message}`);
        }
        return 'Failed to fetch curut-combo.';
    }
}

module.exports = getCurutCombo;