const r2 = require('r2');

const https = require('https');

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
        console.log("channelVideos Err", error);
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
        console.log("getAuthToken Err", error);
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
        return res.status(200).json(responseFormat);

        // return res.json({
        //     data: channels,
        //     code: 200,
        //     status: 'SUCCESS',
        //     message: 'All channels fetched successfully.'
        // })
    } catch (error) {
        console.log("channelsList Err", error);
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
        return res.status(200).json(responseFormat);
    } catch (error) {
        console.log("broadcastsList Err", error);
        responseFormat.status_code = 400;
        responseFormat.message = utils.serverErrorMsg(error);
        return res.status(500).json(responseFormat);
    }
};

/**
 * API to get channel detail
 */
exports.channelVideos = async (req, res) => {
    console.log("inside channelVideos....", req.body, req.query);

    const sortField = req.body.sort || '-starts_at'
    const limit = req.body.limit || 50
    const page = req.body.page || 0
    const search = req.body.search || ''

    var responseFormat = {
        "success": false,
        "status_code":'',
        "message": "",
        "data": {}
      };
    try {
        const channelType = typeof req.params.type != 'undefined' ? parseInt(req.params.type) : 1;
        console.log("channelType...........", channelType);
        let channelId = '';
        if(channelType == 1){ // Live
            channelId = 'x4hskyp019znhujikckx';
        }
        else if(channelType == 2){ // instant channel
            channelId = 'qcttyqg1w3rqumbdxojb';
        }
        else{
            channelId = 'x4hskyp019znhujikckx';
        }
        
        const token = await getAuthToken()
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        let BoxCastAPiUrl = `https://api.boxcast.com/channels/${channelId}/broadcasts?s=${sortField}&p=${page}&l=${limit}`;
        console.log("BoxCastAPiUrl...........", BoxCastAPiUrl);
        https.get(BoxCastAPiUrl, (boxCastResp)=>{
            let data = '';
            // A chunk of data has been received.
            boxCastResp.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            boxCastResp.on('end', () => {
                let TotalRecords = JSON.parse(data).length;
                responseFormat = {
                    "success": true,
                    "status_code":200,
                    "message": TotalRecords > 0 ? "Record(s) found." : 'No record(s) found',
                    "data": JSON.parse(data)
                };
                return res.status(200).json(responseFormat);
            });
        })
        .on("error", (err) => {
            console.log("BoxCast Error: ", err.message);
            responseFormat.status_code = 400;
            responseFormat.message = utils.serverErrorMsg(err);
            return res.status(500).json(responseFormat);
        });       
    } catch (error) {
        console.log("channelVideos Err", error);
        responseFormat.status_code = 400;
        responseFormat.message = utils.serverErrorMsg(error);
        return res.status(500).json(responseFormat);
    }
};
