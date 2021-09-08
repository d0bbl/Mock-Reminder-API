const DataPoint = require('../models');

exports.create = async (req, res, next) => {

    const { plugin_id, organization_id, collection_name, bulk_write, payload } = req.body;

    const validateError = validate(req.body);
    if (validateError) {
        const error = new Error(validateError);
        error.status = 422;

        return next(error);
    }
    if (bulk_write) {

        let result = [];

        for (let i = 0; i < payload.length; i++) {
            let row = payload[i];
            let document = {};
            try {
                const savedRecord = await DataPoint.create({ plugin_id, organization_id, collection_name, payload: row });

                document = {
                    object_id: savedRecord._id,
                    payload: savedRecord.payload
                }
                result.push({ status: "success", document });

            } catch (error) {
                result.push({
                    status: "failed",
                    error: error.message
                });
            }

        }

        return res.status(201).json({ plugin_id, organization_id, collection_name, result });

    } else {
        try {
            const savedRecord = await DataPoint.create({ plugin_id, organization_id, collection_name, bulk_write, payload });

            return res.status(201).json({
                plugin_id: savedRecord.plugin_id,
                organization_id: savedRecord.organization_id,
                collection_name: savedRecord.collection_name,
                bulk_write: savedRecord.bulk_write,
                object_id: savedRecord._id,
                payload: savedRecord.payload
            });

        } catch (error) {
            next(error);
        }

    }
};

exports.update = async (req, res, next) => {
    
    const { object_id, bulk_write, payload, filter } = req.body;

    const validateError = validate(req.body, 'update');

    if (validateError) {
        const error = new Error(validateError);
        error.status = 422;

        return next(error);
    }

    try {
        const query = object_id ? { _id: object_id } : getQueryFrom(req.body);

        const savedRecord = await DataPoint.update(
            query,
            { payload },
            { new: true, multi: bulk_write ? true : false }
        );

        return res.status(200).json({
            success: true,
            message: `${savedRecord.matchedCount} document(s) found and ${savedRecord.modifiedCount} document(s) modified.`
        });

    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    const { object_id } = req.body;
    const validateError = validate(req.body, 'delete');
    if (validateError) {
        const error = new Error(validateError);
        error.status = 422;

        return next(error);
    }
    const query = { _id: object_id };
        try {
            await DataPoint.deleteOne(query);
            return res.status(201).json({
                status: "success",
                message: "data deleted",
            });
        } catch (error) {
            next(error);
        }
};

exports.find = async (req, res, next) => {
    const query = req.query && req.query.object_id ? { _id: req.query.object_id } : req.params;
    if(!query) {
        const error = new Error('Invalid Request. request query is required');
        error.status = 422;
        return next(error);
    }
    try {
        const allRecords = await DataPoint.find(query, "-__v");

        return res.status(200).json( allRecords );

    } catch (error) {
        next(error);
    }

};

exports.search = async (req, res, next) => {
    const { filter } = req.body;

    if (!filter || Object.keys(filter).length == 0) return await this.find(req, res, next);

    let query = getQueryFrom({ plugin_id, organization_id, collection_name, filter });

    try {
        const allRecords = await DataPoint.find(query, "-__v");

        return res.status(200).json({ result: allRecords });

    } catch (error) {
        next(error);
    }

};

// Helpers
const validate = (data, action = 'create') => {
    const { plugin_id, organization_id, collection_name, bulk_write, filter, object_id, payload } = data;

    if (!plugin_id) return "Plugin Id is required";
    if (!organization_id) return "Organization Id is required";
    if (!collection_name) return "Collection Name is required";

    if (action === 'create') {
        if (bulk_write && !Array.isArray(payload)) return "Invalid Payload Format. Expected an Array";
        if (!bulk_write && Array.isArray(payload)) return "Invalid Payload Format. Expected an Object";
        if (typeof payload !== 'object') return "Invalid Payload Format. Expected an Object or Array";

    }

    if (action === 'update' && !(object_id || filter)) return "Invalid Update Request. object_id or filter is needed.";

    if (action === 'delete' && !object_id) return "Invalid Delete Request. object_id is needed.";
    
};

const getQueryFrom = (data) => {
    const { plugin_id, organization_id, collection_name } = data;

    let query = { plugin_id, organization_id, collection_name };

    Object.keys(data.filter).forEach(field => {
        query[`payload.${field}`] = data.filter[field];
    });
    console.log(query);
    return query;
};
