const r2 = require('r2');


const liveChannelId = process.env.CHANNEL_LIVE || 'x4hskyp019znhujikckx'

// Test API for Auth
exports.getAuth = async (req, res) => {
    try {
        const token = Buffer.from(`${process.env.BOXCAST_CLIENT_ID}:${process.env.BOXCAST_CLIENT_SECRET}`).toString('base64')
        const headers = {
            'Authorization': `Basic ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        const body = 'grant_type=client_credentials'
        const resp = await r2.post('https://auth.boxcast.com/oauth2/token', {headers, body}).json
        return res.json({
            data: resp,
            code: 200,
            status: 'SUCCESS',
            message: 'Auth info fetched successfully.'
        })
    } catch (error) {
        logger.error(error)
        return res.status(500).json(utils.serverErrorMsg(error))
    }
}

/**
 * Function to get authorization token for boxcast API
 */
const getAuthToken = async () => {
    try {
        const token = Buffer.from(`${process.env.BOXCAST_CLIENT_ID}:${process.env.BOXCAST_CLIENT_SECRET}`).toString('base64')
        const headers = {
            'Authorization': `Basic ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        const body = 'grant_type=client_credentials'
        const resp = await r2.post('https://auth.boxcast.com/oauth2/token', {headers, body}).json
        return resp.access_token
    } catch (error) {
        logger.error(error)
        throw new Error(error)
    }
};

/**
 * API to get all channel list
 */
exports.channelsList = async (req, res) => {
    console.log("Channel listing here....");
    var responseFormat = {
        "success": false,
        "status_code":'',
        "message": "",
        "data": {}
      };
    try {
        const token = await getAuthToken()
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const channels = await r2('https://api.boxcast.com/account/channels', { headers }).json;

        var responseFormat = {
            "success": true,
            "status_code":200,
            "message": "All channels fetched successfully.",
            "data": channels
        };
        return res.status(400).json(responseFormat);

        // return res.json({
        //     data: channels,
        //     code: 200,
        //     status: 'SUCCESS',
        //     message: 'All channels fetched successfully.'
        // })
    } catch (error) {
        logger.error(error);
        responseFormat.status_code = 400;
        responseFormat.message = utils.serverErrorMsg(error);
        return res.status(500).json(responseFormat);
        //return res.status(500).json(utils.serverErrorMsg(error))
    }
};

/**
 * API to get all broadcasts list
 */
exports.broadcastsList = async (req, res) => {
    console.log("inside broadcastsList....");
    var responseFormat = {
        "success": false,
        "status_code":'',
        "message": "",
        "data": {}
      };
    try {
        const token = await getAuthToken()
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const broadcasts = await r2('https://api.boxcast.com/account/broadcasts', { headers }).json;

        var responseFormat = {
            "success": true,
            "status_code":200,
            "message": "All broadcasts fetched successfully.",
            "data": broadcasts
        };
        return res.status(400).json(responseFormat);
    } catch (error) {
        logger.error(error);
        responseFormat.status_code = 400;
        responseFormat.message = utils.serverErrorMsg(error);
        return res.status(500).json(responseFormat);
    }
};

/**
 * API to get channel detail
 */
exports.channelDetails = async (req, res) => {
    console.log("inside channelDetails....");
    var responseFormat = {
        "success": false,
        "status_code":'',
        "message": "",
        "data": {}
      };
    try {
        const channelId = req.params.id;
        const token = await getAuthToken()
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const channelDetails = await r2(`https://api.boxcast.com/account/channels/${channelId}`, { headers }).json;
        var responseFormat = {
            "success": true,
            "status_code":200,
            "message": "Channel detail fetched successfully.",
            "data": channelDetails
        };
        return res.status(400).json(responseFormat);
    } catch (error) {
        logger.error(error);
        responseFormat.status_code = 400;
        responseFormat.message = utils.serverErrorMsg(error);
        return res.status(500).json(responseFormat);
    }
};
