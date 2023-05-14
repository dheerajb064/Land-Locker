import axios from 'axios';
const pinataApiKey = process.env.NEXT_PUBLIC_API_Key;
const pinataSecretApiKey = process.env.NEXT_PUBLIC_API_Secret;
//const axios = require("axios");
const FormData = require("form-data");

export const pinFileToIPFS = async (file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    let data = new FormData();

    data.append("file", file);
    // data.append("pinataMetadata", metadata);
    console.log("Inside : ",data);

    const res = await axios.post(url, data, {
        maxContentLength: "Infinity",
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            'pinata_api_key': '11b6504c2b517b46eaa6',
            'pinata_secret_api_key': 'b5e506112b31f20ccdc289d1565ee6eba2a9783eb4432ba8a4fe64c879b21a36'
        },
    });

    //console.log(pinataApiKey);

    /*const res = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: data,
        headers: {
            'pinata_api_key': '11b6504c2b517b46eaa6',
            'pinata_secret_api_key': 'b5e506112b31f20ccdc289d1565ee6eba2a9783eb4432ba8a4fe64c879b21a36',
            "Content-Type": "multipart/form-data"
        },
    });*/

    const fileURL = "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash;
    console.log(fileURL);

    return fileURL
};
