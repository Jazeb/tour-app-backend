const mongoose = require('mongoose').set('debug', true);
const Schema = mongoose.Schema;

const Company = Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    tours: [
        {
            tour_name: {
                type: String,
                required: true
            },
            price_min: {
                type: Number,
                required: true
            },
            price_max: {
                type: Number,
                required: true
            },
            places_to_stay: [
                {
                    type: String,
                }
            ],
            places_for_food: [
                {
                    type: String,
                }
            ],
            routes: {
                type: String,
            }
        }
    ],

}, { collection: 'company' }, { __v: false });

module.exports = mongoose.model('company', Company);