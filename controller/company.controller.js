
const Company = require('../schema/companies');
const resp = require('../resp');


const addTour = async (req, res) => {
    try {
        const tour = req.body;
        if (!tour.company_id) return resp.error(res, 'Provide company id');

        const data = await Company.updateOne({ _id: tour.company_id }, { $push: { tours: tour } }, { new: true });
        return resp.success(res, data);

    } catch (error) {
        console.error(error);
        return resp.error(res, error);
    }
}

const createCompany = async (req, res) => {
    try {
        const company = req.body;

        const data = await Company.create(company);
        return resp.success(res, data);

    } catch (error) {
        console.error(error);
        return resp.error(res, error);
    }
}

module.exports = { addTour, createCompany }