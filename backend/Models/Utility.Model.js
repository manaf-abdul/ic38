import mongoose from "mongoose";

const schema = mongoose.Schema({
  examFees: {
    type: String,
  },
  hallTicket: {
    type: String,
  },
  scoreCard: {
    type: String,
  },
  instruction: {
    type: String,
  },
});
const Utility = mongoose.model("Utility", schema);
export default Utility;
