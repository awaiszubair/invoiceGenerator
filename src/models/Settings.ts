import mongoose, { Schema, model, models } from 'mongoose';

const SettingsSchema = new Schema({
  siteName: { type: String, default: 'Invoice Generator' },
  siteDescription: { type: String, default: 'Professional Invoice and Quote Generator' },
  defaultMetaTitle: { type: String, default: 'Invoice Generator | Create Professional Invoices' },
  defaultMetaDescription: { type: String, default: 'Generate professional invoices and quotes easily with our AI-powered tool.' },
  googleAnalyticsId: { type: String },
  footerText: { type: String, default: '© 2024 Invoice Generator. All rights reserved.' },
}, { timestamps: true });

const Settings = models.Settings || model('Settings', SettingsSchema);

export default Settings;
