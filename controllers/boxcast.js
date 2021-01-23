const r2 = require('r2');

const https = require('https');

var moment = require('moment'); // require

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
    console.log("inside channelVideos....", moment().subtract(24, 'hours').format(), moment().add(3, 'hours').add(5, 'minutes').format());
    const sortField = req.body.sort || '-starts_at'
    const limit = req.body.limit || 50
    const page = req.body.page || 0
    const search = req.body.search || ''

    var responseFormat = {
        "success": false,
        "status_code":'',
        "message": "",
        "total_records":0,
        "data": {}
    };

    try {
        const channelType = typeof req.params.type != 'undefined' ? parseInt(req.params.type) : 1;
        let channelId = '';
        if(channelType == 1){ // Live channel videos
            channelId = process.env.CHANNEL_LIVE;
            responseFormat.total_records = 1000;
        }
        else if(channelType == 2){ // instant channel videos
            channelId = process.env.INSTANT_VIDEOS;
        }
        else if(channelType == 3){ // Live plus channel videos
            channelId = process.env.CHANNEL_LIVE_PLUS;
            responseFormat.total_records = 1000;
        }
        else if(channelType == 4){ // Recent videos filtered from Live
            channelId = process.env.CHANNEL_LIVE;
            responseFormat.total_records = 0;
        }
        else if(channelType == 5){ // Recent videos filtered from LivePlus
            channelId = process.env.CHANNEL_LIVE_PLUS;
            responseFormat.total_records = 0;
        }        
        const token = await getAuthToken()
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        let BoxCastAPiUrl = `https://api.boxcast.com/channels/${channelId}/broadcasts?s=${sortField}&p=${page}&l=${limit}`;
        https.get(BoxCastAPiUrl, (boxCastResp)=>{
            let data = '';
            boxCastResp.on('data', (chunk) => {
                data += chunk;
            });
            boxCastResp.on('end', () => {
                responseFormat.success = true;
                responseFormat.status_code = 200;
                let TotalRecords = JSON.parse(data).length;
                let allVideoResults = JSON.parse(data);
                if((channelType == 4 || channelType == 5) && TotalRecords > 0){ // Filter Recent Videos
                    let recentVideos = [];
                    let prevDate = moment().subtract(24, 'hours').format();
                    allVideoResults.forEach(element => { 
                        if(prevDate < element.starts_at){
                            recentVideos.push(element);
                        }
                    });
                    responseFormat.total_records = recentVideos.length;
                    responseFormat.data = recentVideos;
                    responseFormat.message =  recentVideos.length > 0 ? "Record(s) found." : 'No record(s) found';
                    return res.status(200).json(responseFormat);
                }
                else{
                    responseFormat.message =  TotalRecords > 0 ? "Record(s) found." : 'No record(s) found';
                    responseFormat.data = allVideoResults;
                    return res.status(200).json(responseFormat);
                }
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
