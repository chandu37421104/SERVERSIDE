import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalPoints: { type: Number, default: 0 },
  rank: { type: Number },
}, { timestamps: true });

export default mongoose.model('Leaderboard', leaderboardSchema);
