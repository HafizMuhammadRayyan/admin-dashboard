import UserModel from "../models/User.js";
import TransactionModel from "../models/transaction.js";
import OverallStatsModel from "../models/OverallStat.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    // Hardcoded Values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = 2021-11-15;

    // Recent Transaction
    const transactions = await TransactionModel.find()
      .limit(50)
      .sort({ createdOn: -1 });

    //OverallStat
    const overallState = await OverallStatsModel.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallState[0];

    const thisMonthStats = overallState[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallState[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
