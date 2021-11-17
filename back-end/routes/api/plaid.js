/* eslint-disable camelcase */
// eslint-disable-next-line new-cap
const router = require('express').Router()
const auth = require('../auth')
const plaid = require('plaid')
require('dotenv').config({ silent: true })

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID
const PLAID_SECRET = process.env.PLAID_SECRET

const configuration = new plaid.Configuration({
    basePath: plaid.PlaidEnvironments['sandbox'],
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
            'PLAID-SECRET': PLAID_SECRET,
        },
    },
})

const client = new plaid.PlaidApi(configuration);

router.get("/create_link_token", auth.required, async (req, res) => {
    const {
        payload: {username}
    } = req;

    const request = {
        user: {
            client_user_id: username
        },
        client_name: "Subtrakt",
        products: [plaid.Products.Auth, plaid.Products.Transactions],
        language: "en",
        country_codes: [plaid.CountryCode.Us]
    };

    try {
        const response = await client.linkTokenCreate(request);
        return res.json(response.data);
    } catch (error) {
        console.log("create_link_token err: ", error.message);
        return res.status(400).json({err: error.response.data});
    }
})

router.post("/get_access_token", auth.required, async (req, res) => {
    const {
        body: {public_token}
    } = req;

    try {
        const response = await client.itemPublicTokenExchange({public_token: public_token});
        const item_id = response.data.item_id;
        return res.json({access_token: response.data.access_token, item_id: item_id});
    } catch (error) {
        return res.status(400).json({err: error.message});
    }
})

router.get("/transaction", auth.required, async (req,res) => {
    const {
        headers: {access_token}
    } = req;

    const end_date = new Date();
    const start_date = new Date(today);
    start_date.setFullYear(date.getFullYear() - 1);

    const start_date_string = `${start_date.getFullYear()}-${start_date.getMonth()}-${start_date.getDate()}`;
    const end_date_string = `${end_date.getFullYear()}-${end_date.getMonth()}-${end_date.getDate()}`

    const request = {
        access_token: access_token,
        start_date: start_date_string,
        end_date: end_date_string
    }

    try {
        const response = await client.transactionsGet(request);
        let transactions = response.data.transactions;
        const total_transactions = response.data.total_transactions;
        while(transactions.length < total_transactions) {
            const paginated_request = {
                access_token: access_token,
                start_date: start_date_string,
                end_date: end_date_string,
                options: {
                    offset: transactions.length
                }
            }

            const paginated_response = await client.transactionsGet(paginated_request);
            transactions = transactions.concat(paginated_response.data.transactions);
        }

        return res.json(transactions);
    } catch (error) {
        console.log(error);
        return res.status(400).json({err: error.message});
    }

})

module.exports = router