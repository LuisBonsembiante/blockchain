import web3 from './web3';
import CampaignFactory from  './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x2EeC1B70F63c72A00Be515d853393f4B658a0f4c'
);

export default instance;