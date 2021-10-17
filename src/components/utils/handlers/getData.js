// eslint-disable-next-line no-undef
const axios = require('axios');

function seconds_to_time(seconds){
    seconds = Number(seconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 3600 % 60);

    const hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    const mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    const sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
}

const blockData = async function getblockData() {
    const url = `http://localhost:5000/block`;
    try {
        console.log('using initial url->', url);
        const response = await axios.get(url);
        const { status, data } = response.data;
        for (const item of data){
            if (item.time){
                const {time} = item;
                item.time = seconds_to_time(time);
            }
        }
        console.dir(data);

        if (status === 1) return data;
        else if (status === -1) {
            console.error('Getting data from API failed');
            return [];
        }
    } catch (error) {
        console.log(error);
        return [];
    }
}

// eslint-disable-next-line no-unused-vars
const hashData = async function get_block_details(blockId = '0000000000000000000982121fea9d9f85fa0b98cddda4b858663d4eda73719a')
{
    const url = `http://localhost:5000/block/${blockId}`;
    try{
        console.log('using secondary url->', url);
        const response = await axios.get(url);
        // console.dir(response);
        const { status, data } = response.data;
        if (status === 1){
            // console.log(data);
            if (Array.isArray(data)) {
                console.log(`Data is an array`);
                const dataObj = Object.assign({}, ...data);
                const { prev_block, block_index, size} = dataObj;
                console.log(`VALUES AFTER CONVERT: Previous hash -> ${prev_block}\nBlock Index -> ${block_index}\nSize -> ${size}`);
                console.log(dataObj);
                return dataObj;
            }
            const { prev_block, block_index, size} = data;
            console.log(`Previous hash -> ${prev_block}\nBlock Index -> ${block_index}\nSize -> ${size}`);
            console.dir(data);
            return data;
        }
        else {
            console.error('Getting data from API failed');
            return [];
        }
    }
    catch (error) {
        console.log(error);
        return [];
    }
}


async function main(){
    // return await blockData();
    // return await hashData();
}

main();

export { blockData, hashData };