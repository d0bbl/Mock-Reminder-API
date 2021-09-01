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
        const result = payload.map(async row => {
            try {
                const savedRecord = await DataPoint.create({ plugin_id, organization_id, collection_name, bulk_write, payload: row });
                return {
                    status: "success",
                    document: {
                        plugin_id: savedRecord.plugin_id,
                        organization_id: savedRecord.organization_id,
                        collection_name: savedRecord.collection_name,
                        bulk_write: savedRecord.bulk_write,
                        object_id: savedRecord._id,
                        payload: savedRecord.payload
                    }
                }

            } catch (error) {
                return {
                    status: "failed",
                    error: error.message
                }
            }

        })

        return res.status(201).json({ result });

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


const validate = data => {
    const { plugin_id, organization_id, collection_name, bulk_write, object_id, payload } = data;

    if (!plugin_id) return "Plugin Id is required";
    if (!organization_id) return "Organization Id is required";
    if (!collection_name) return "Collection Name is required";
    if (bulk_write && !Array.isArray(payload)) return "Invalid Payload Format. Expected an Array";
    if (!bulk_write && Array.isArray(payload)) return "Invalid Payload Format. Expected an Object";
    if (typeof payload !== 'object') return "Invalid Payload Format. Expected an Object or Array";
};