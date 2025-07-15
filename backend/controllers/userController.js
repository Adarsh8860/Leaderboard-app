import User from '../models/User.js';
import ClaimHistory from '../models/ClaimHistory.js';

// Get all users with ranks
export const getUsers = async (req, res) => {
  const users = await User.find({});
  const sorted = users.sort((a, b) => b.totalPoints - a.totalPoints);
  const ranked = sorted.map((u, i) => ({ ...u._doc, rank: i + 1 }));
  res.json(ranked);
};

// Add new user
export const addUser = async (req, res) => {
  const user = new User({ name: req.body.name });
  await user.save();
  res.json(user);
};

// Claim points
export const claimPoints = async (req, res) => {
  const { userId } = req.body;
  const randomPoints = Math.floor(Math.random() * 10) + 1;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.totalPoints += randomPoints;
  await user.save();

  const history = new ClaimHistory({ userId, pointsClaimed: randomPoints });
  await history.save();

  res.json({ user, pointsClaimed: randomPoints });
};

// Get claim history
export const getClaimHistory = async (req, res) => {
  const history = await ClaimHistory.find().populate('userId').sort({ claimedAt: -1 });
  res.json(history);
};
