import mongoose from "mongoose";
import TransactionModel from "../models/transaction.js";
import UserModel from "../models/User.js";

const getAdmins = async (req, res) => {
  try {
    const admins = await UserModel.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    const userWithStat = await UserModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliatestats",
        },
      },
      { $unwind: "$affiliatestats" },
    ]);

    const TransitionSales = await Promise.all(
      userWithStat[0].affiliatestats.affiliateSales.map(({ _id }) => {
        return TransactionModel.findById(_id);
      })
    );

    const filterSalesTransition = TransitionSales.filter(
      (transition) => transition !== null
    );

    res
      .status(200)
      .json({ user: userWithStat[0], sales: filterSalesTransition });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { getAdmins, getUserPerformance };
