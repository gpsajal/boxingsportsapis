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
exports.channelVideos = async (req, res) => {
    console.log("inside channelVideos....");

    const sortField = req.query.sort || '-starts_at'
    const limit = req.query.limit || '50'
    const page = req.query.page || '0'
    const search = req.query.search || ''

    var responseFormat = {
        "success": false,
        "status_code":'',
        "message": "",
        "data": {}
      };
    try {
        const channelType = typeof req.params.type != 'undefined' ? parseInt(req.params.type) : 1;
        let channelId = '';
        if(channelType == 1){ // Live
            channelId = 'x4hskyp019znhujikckx';
        }
        else{
            channelId = 'qcttyqg1w3rqumbdxojb';
        }
        console.log("channelType....", channelType);
        const token = await getAuthToken()
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        https://api.boxcast.com/channels/x4hskyp019znhujikckx/broadcasts?q=timeframe%3Arelevant%20timeframe%3Anext&s=-starts_at&l=5&p=0

        var channelAllVideos = await r2(`https://api.boxcast.com/account/channels/${channelId}/broadcasts`, { headers }).json;
        //var channelAllVideos = await r2(`https://api.boxcast.com/account/channels/${channelId}/broadcasts?l=${limit}&p=${page}&s=${sortField}`,{ headers }).json;

        var responseFormat = {
            "success": true,
            "status_code":200,
            "message": "Channel detail fetched successfully.",
            "data": channelAllVideos
        };
        return res.status(200).json(responseFormat);
    } catch (error) {
        logger.error(error);
        responseFormat.status_code = 400;
        responseFormat.message = utils.serverErrorMsg(error);
        return res.status(500).json(responseFormat);
    }
};
