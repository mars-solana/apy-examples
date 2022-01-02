import { Reserve } from "./models";
import BigNumber from "bignumber.js";

// utilization => percentage from 0-100
// 0%-50% -> 0%-15%
// 50%-90% -> 15%-25%
// 90%-100% -> 25%-100%
const getDailyAPR = (x: number): number => {
    if (0 <= x && x < 50) {
        return 0.3 * x;
    }

    if (50 <= x && x < 90) {
        return 0.25 * x + 2.5;
    }

    return 7.5 * x - 650;
};

const calculateAPY = (utilizationRate: number): number => {
    const dailyApr = getDailyAPR(utilizationRate);
    const periodicRate = dailyApr / 24;
    const numberOfPeriods = 8760;

    return ((1 + periodicRate / 100) ^ numberOfPeriods) - 1 * 100;
};

const calculateUtilizationRatio = (reserve: Reserve) => {
    const borrowedAmount = reserve.liquidity.borrowedAmountWads;

    const availableAmount = new BigNumber(
        reserve.liquidity.availableAmount.toString()
    );

    const currentUtilization = borrowedAmount.div(
        availableAmount.plus(borrowedAmount)
    );

    return currentUtilization;
};

export const TulipProtocol = {
    calculateUtilizationRatio,
    calculateAPY,
};
