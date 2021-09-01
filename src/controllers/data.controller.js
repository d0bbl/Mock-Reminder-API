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

        return res.status(201).json({ plugin_id, organization_id, collection_name,result });

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
    const { object_id, bulk_write, payload } = req.body;

    const validateError = validate(req.body);
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
    const { object_id, filter } = req.body;

    const validateError = validate(req.body, 'delete');
    if (validateError) {
        const error = new Error(validateError);
        error.status = 422;

        return next(error);
    }

    if (object_id) {
        try {
            await DataPoint.deleteOne({ _id: object_id });

            return res.status(201).json({
                status: "success",
                message: "data deleted"
            });

        } catch (error) {
            next(error);
        }
    } else {
        try {
            await DataPoint.deleteMany({
                filter
            });

            return res.status(201).json({
                status: "success",
                message: "data deleted"
            });

        } catch (error) {
            return {
                status: "failed",
                error: error.message
            }
        }
    }

};

// exports.search = async (req, res, next) => {

// };612fa7721112f088962c76ad

// Helpers
const validate = (data, action = 'create') => {
    const { plugin_id, organization_id, collection_name, bulk_write, object_id, payload, filter } = data;

    if (!plugin_id) return "Plugin Id is required";
    if (!organization_id) return "Organization Id is required";
    if (!collection_name) return "Collection Name is required";

    if (action === 'create') {
        if (bulk_write && !Array.isArray(payload)) return "Invalid Payload Format. Expected an Array";
        if (!bulk_write && Array.isArray(payload)) return "Invalid Payload Format. Expected an Object";
        if (typeof payload !== 'object') return "Invalid Payload Format. Expected an Object or Array";

    }

    if (action === 'update' && (!object_id || !filter)) return "Invalid Update Request. object_id or filter is needed.";

    if (action === 'delete') { 
        if (bulk_write && !filter) return "Invalid Delete Request. Filter is needed.";
        if (!bulk_write && !object_id) return "Invalid Delete Request. object_id is needed.";
    }
};

const getQueryFrom = (data) => {
    const { plugin_id, organization_id, collection_name } = data;

    let query = { plugin_id, organization_id, collection_name };

    Object.keys(data.filter).forEach(field => {
        query[`payload.${field}`] = data.filter[field];
    });

    return query;
};

// const validateDelete = data => {
//     const { plugin_id, organization_id, collection_name, bulk_write} = data;

//     if (!plugin_id) return "Plugin Id is required";
//     if (!organization_id) return "Organization Id is required";
//     if (!collection_name) return "Collection Name is required";
//     if ( typeof bulk_write !== 'boolean') return "Invalid bulk_write Format. Expected true or false";
// };