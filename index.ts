import * as web3 from "@solana/web3.js";
import { TulipProtocol } from "./tulip";
import { ReserveLayout } from "./models";

const ACCOUNT_DISCRIMINATOR_SIZE = 8;
const CLUSTER_URL = web3.clusterApiUrl("mainnet-beta");

const connection = new web3.Connection(CLUSTER_URL);

const runAction = async (address: string) => {
    const pubKey = new web3.PublicKey(address);
    const value = await connection.getAccountInfo(pubKey);

    if(!value) {
        throw new Error(`account ${address} does not exist`)
    }

    // decode account
    const data = value.data.slice(ACCOUNT_DISCRIMINATOR_SIZE);
    const decodedValue = ReserveLayout.decode(data);

    // calculate utilization + apy from the account
    const utilizationRatio = TulipProtocol.calculateUtilizationRatio(decodedValue);
    const apy = TulipProtocol.calculateAPY(utilizationRatio.toNumber());

    console.log("==== ACCOUNT DATA ====");

    console.log("Config: ", decodedValue.config);
    console.log("Liquidity: ", decodedValue.liquidity);
    console.log("Utilization Ratio: ", utilizationRatio.toString());
    console.log("APY: ", apy.toString());
};

runAction("FTkSmGsJ3ZqDSHdcnY7ejN1pWV3Ej7i88MYpZyyaqgGt");