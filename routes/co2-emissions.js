const express = require('express')
const Datastore = require('nedb')

const router = express.Router()

const CO2_EMISSIONS_DB_PATH = 'co2_emissions.db'

const db = new Datastore({
    filename: CO2_EMISSIONS_DB_PATH,
    autoload: true
})

router.get('/', (req, res) => {
    const { country, year } = req.query
    const query = {
        ...(country ? {
            $or: [{
                countryName: country,
            }, {
                countryKey: country,
            }]
        } : {}),
        ...(year ? {
            year,
        } : {})
    }
    db.find(query, (err, result) => {
        res.json(result)
    })
})

module.exports = router
