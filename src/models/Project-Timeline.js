const mongoose = require('mongoose');

const projectTimelineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true, enum: ["milestone", "meeting", "update", "task", "other"] },
  state: { type: String, required: true, enum: ["planned", "in progress", "completed", "delayed"] },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
  files: [{ type: String, required: false }],
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }],
  lastUpdated: { type: Date, default: Date.now },
});

const ProjectTimeline = mongoose.models['project-timeline'] || mongoose.model('project-timeline', projectTimelineSchema);

module.exports = ProjectTimeline;
