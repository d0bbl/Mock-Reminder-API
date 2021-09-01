const https = require('https');

exports.getData = catchAsync( async ( req, res, next ) => {

    try {

        const pageOptions = {
            limit: (req.query && parseInt(req.query.limit, 10)) || "100",
            sort: (req.query && req.query.sort) || '-createdAt'
        };

      

        if (ideas) {
          return dataParser(res, 200, "");
        }
          return res.json({message: ` `});

    } catch (e) {

        return catchResponse(res, e);

    }

})