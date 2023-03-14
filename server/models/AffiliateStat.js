import mongoose from "mongoose";

const AffiliateStatScheme = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "Users" },
    affiliateSales: {
      type: [mongoose.Types.ObjectId],
      ref: "Transactions",
    },
  },
  { timestamps: true }
);

const AffiliateStatModel = mongoose.model("AffiliateStat", AffiliateStatScheme);

export default AffiliateStatModel;
