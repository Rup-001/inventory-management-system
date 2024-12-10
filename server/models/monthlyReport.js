const mongoose = require("mongoose");

const monthlyReportsSchema = mongoose.Schema({
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  reportMonth: {
    type: Date,
    required: true,
  },
  totalAssigned: {
    type: Number,
    required: true,
    default: 0,
  },
  totalReturned: {
    type: Number,
    required: true,
    default: 0,
  },
  totalHandoff: {
    type: Number,
    required: true,
    default: 0,
  },
  totalReceivedHandoff: {
    type: Number,
    required: true,
    default: 0,
  },
});

monthlyReportsSchema.pre("save", async function (next) {
  const reportMonth = this.reportMonth.getMonth();
  const reportYear = this.reportMonth.getFullYear();
  const existingReport = await MonthlyReports.findOne({
    locationId: this.locationId,
    reportMonth: { $month: reportMonth, $year: reportYear },
  });

  if (!existingReport) {
    // Create a new report for the month if it doesn't exist
    return next();
  }

  // Update existing report if it already exists for the month
  existingReport.totalAssigned += this.totalAssigned;
  existingReport.totalReturned += this.totalReturned;
  existingReport.totalHandoff += this.totalHandoff;
  existingReport.totalReceivedHandoff += this.totalReceivedHandoff;
  await existingReport.save();
  return next();
});

const MonthlyReports = mongoose.model("MonthlyReports", monthlyReportsSchema);

module.exports = MonthlyReports;
