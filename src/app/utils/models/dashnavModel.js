const mongoose = require('mongoose');

// Define the schema for the dashboard navigation links
const dashNavSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  type_menu: { 
    type: String, 
    enum: ['main', 'sub'], 
    required: true 
  },
  parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'DashNav', default: null },  // References parent item for submenus
  icon: { type: String, default: null },  // Optional: icon for the menu
  is_active: { type: Boolean, default: true },  // Optional: mark as active or inactive
  order: { type: Number, default: 0 }  // Optional: order of display
});

// Create and export the model
const DashNav = mongoose.model('DashNav', dashNavSchema);

module.exports = DashNav;