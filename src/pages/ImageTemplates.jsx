import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Image,
  Download,
  Palette,
  Type,
  Layers,
  Eye,
  RefreshCw,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';
import {
  PLATFORMS,
  CONTENT_PILLARS,
  IMAGE_TEMPLATES
} from '../data/socialMediaContent';
import toast from 'react-hot-toast';

// Brand colors
const BRAND_COLORS = {
  primary: '#00F0FF',
  secondary: '#7B61FF',
  tertiary: '#00FF6A',
  dark: '#0A0E27',
  darker: '#030208',
};

// Pre-designed templates
const PRESET_TEMPLATES = [
  {
    id: 'vibe-coding-1',
    name: 'Vibe Coding Announcement',
    headline: 'I Built a $10K SaaS',
    subheadline: 'in 3 Days Using Claude Code',
    style: 'gradient-cyan',
    platforms: ['linkedin', 'instagram', 'twitter']
  },
  {
    id: 'automation-1',
    name: 'Automation Results',
    headline: '$5,000/month',
    subheadline: 'Employee Replaced with n8n',
    style: 'gradient-purple',
    platforms: ['linkedin', 'tiktok', 'instagram']
  },
  {
    id: 'controversy-1',
    name: 'Hot Take',
    headline: 'Zapier is a SCAM',
    subheadline: "Here's Why I Use n8n Instead",
    style: 'gradient-red',
    platforms: ['twitter', 'tiktok']
  },
  {
    id: 'ghl-1',
    name: 'GHL Savings',
    headline: '10 Tools → 1',
    subheadline: 'Save $487/month with GoHighLevel',
    style: 'gradient-green',
    platforms: ['linkedin', 'facebook']
  },
  {
    id: 'results-1',
    name: 'Client Results',
    headline: '3X More Leads',
    subheadline: 'Same Ad Spend. 30 Days.',
    style: 'gradient-gold',
    platforms: ['instagram', 'linkedin']
  },
  {
    id: 'free-stack-1',
    name: 'Free Stack',
    headline: 'FREE Tools That Replace',
    subheadline: '$2,000/month in Software',
    style: 'gradient-cyan',
    platforms: ['tiktok', 'instagram', 'twitter']
  }
];

export default function ImageTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState(PRESET_TEMPLATES[0]);
  const [selectedSize, setSelectedSize] = useState(IMAGE_TEMPLATES[2]); // Instagram post
  const [customText, setCustomText] = useState({
    headline: '',
    subheadline: '',
    cta: 'Link in Bio'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef(null);

  // Generate and download image
  const generateImage = async (template, size) => {
    setIsGenerating(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = size.width;
      canvas.height = size.height;
      const ctx = canvas.getContext('2d');

      // Background gradient based on style
      let gradient;
      switch (template.style) {
        case 'gradient-cyan':
          gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, '#0A0E27');
          gradient.addColorStop(0.5, '#0D1B2A');
          gradient.addColorStop(1, '#1B1B3A');
          break;
        case 'gradient-purple':
          gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, '#1a0a2e');
          gradient.addColorStop(0.5, '#16213e');
          gradient.addColorStop(1, '#0f0f23');
          break;
        case 'gradient-red':
          gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, '#1a0a0a');
          gradient.addColorStop(0.5, '#2e1a1a');
          gradient.addColorStop(1, '#0f0f0f');
          break;
        case 'gradient-green':
          gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, '#0a1a0a');
          gradient.addColorStop(0.5, '#0d2818');
          gradient.addColorStop(1, '#0f1a0f');
          break;
        case 'gradient-gold':
          gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, '#1a150a');
          gradient.addColorStop(0.5, '#2e2010');
          gradient.addColorStop(1, '#1a1005');
          break;
        default:
          gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, '#0A0E27');
          gradient.addColorStop(1, '#030208');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add glow effect
      const glowGradient = ctx.createRadialGradient(
        canvas.width * 0.7, canvas.height * 0.3,
        0,
        canvas.width * 0.7, canvas.height * 0.3,
        canvas.width * 0.5
      );
      glowGradient.addColorStop(0, 'rgba(0, 240, 255, 0.15)');
      glowGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add second glow
      const glow2 = ctx.createRadialGradient(
        canvas.width * 0.2, canvas.height * 0.8,
        0,
        canvas.width * 0.2, canvas.height * 0.8,
        canvas.width * 0.4
      );
      glow2.addColorStop(0, 'rgba(123, 97, 255, 0.1)');
      glow2.addColorStop(1, 'transparent');
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate font sizes based on canvas size
      const headlineSize = Math.min(canvas.width * 0.08, 120);
      const subheadlineSize = Math.min(canvas.width * 0.035, 48);
      const ctaSize = Math.min(canvas.width * 0.025, 32);

      // Draw headline
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `bold ${headlineSize}px Inter, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const headline = customText.headline || template.headline;
      const subheadline = customText.subheadline || template.subheadline;

      // Add text shadow
      ctx.shadowColor = '#00F0FF';
      ctx.shadowBlur = 20;
      ctx.fillText(headline, canvas.width / 2, canvas.height * 0.4);

      // Reset shadow for subheadline
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#00F0FF';
      ctx.font = `600 ${subheadlineSize}px Inter, system-ui, sans-serif`;
      ctx.fillText(subheadline, canvas.width / 2, canvas.height * 0.55);

      // Draw CTA
      const cta = customText.cta || 'Link in Bio';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = `500 ${ctaSize}px Inter, system-ui, sans-serif`;
      ctx.fillText(cta, canvas.width / 2, canvas.height * 0.85);

      // Draw brand name
      ctx.fillStyle = '#00F0FF';
      ctx.font = `bold ${ctaSize}px Inter, system-ui, sans-serif`;
      ctx.fillText('SKYNETLABS', canvas.width / 2, canvas.height * 0.92);

      // Add border glow
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

      // Download
      const link = document.createElement('a');
      link.download = `skynetlabs-${template.id}-${size.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast.success('Image downloaded!');
    } catch (error) {
      toast.error('Failed to generate image');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate all sizes for a template
  const generateAllSizes = async (template) => {
    setIsGenerating(true);
    for (const size of IMAGE_TEMPLATES) {
      await generateImage(template, size);
      await new Promise(resolve => setTimeout(resolve, 500)); // Small delay between downloads
    }
    setIsGenerating(false);
    toast.success('All sizes downloaded!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Image className="w-7 h-7 text-accent-primary" />
            Image Templates
          </h1>
          <p className="text-gray-400 mt-1">
            Generate branded PNG images for all social media platforms
          </p>
        </div>
      </div>

      {/* Size Options */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-accent-primary" />
          Choose Size
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          {IMAGE_TEMPLATES.map((size) => (
            <motion.button
              key={size.id}
              onClick={() => setSelectedSize(size)}
              className={`p-4 rounded-xl border transition-all text-left ${
                selectedSize.id === size.id
                  ? 'border-accent-primary bg-accent-primary/10'
                  : 'border-dark-border hover:border-white/30'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{PLATFORMS[size.platform]?.icon}</span>
                <span className="text-sm font-medium">{size.name}</span>
              </div>
              <p className="text-xs text-gray-500">{size.width} x {size.height}</p>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Template Selection */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5 text-accent-primary" />
            Choose Template
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {PRESET_TEMPLATES.map((template) => (
              <motion.button
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                className={`p-4 rounded-xl border transition-all text-left ${
                  selectedTemplate.id === template.id
                    ? 'border-accent-primary bg-accent-primary/10'
                    : 'border-dark-border hover:border-white/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <p className="font-medium text-sm mb-1">{template.name}</p>
                <p className="text-xs text-accent-primary">{template.headline}</p>
                <p className="text-xs text-gray-500 mt-1">{template.subheadline}</p>
                <div className="flex gap-1 mt-2">
                  {template.platforms.map(p => (
                    <span key={p} className="text-xs">{PLATFORMS[p]?.icon}</span>
                  ))}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Customization */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Type className="w-5 h-5 text-accent-primary" />
            Customize Text
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Headline</label>
              <input
                type="text"
                value={customText.headline}
                onChange={(e) => setCustomText(prev => ({ ...prev, headline: e.target.value }))}
                placeholder={selectedTemplate.headline}
                className="w-full px-4 py-3 bg-dark-input border border-dark-border rounded-xl text-sm focus:outline-none focus:border-accent-primary"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Subheadline</label>
              <input
                type="text"
                value={customText.subheadline}
                onChange={(e) => setCustomText(prev => ({ ...prev, subheadline: e.target.value }))}
                placeholder={selectedTemplate.subheadline}
                className="w-full px-4 py-3 bg-dark-input border border-dark-border rounded-xl text-sm focus:outline-none focus:border-accent-primary"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Call to Action</label>
              <input
                type="text"
                value={customText.cta}
                onChange={(e) => setCustomText(prev => ({ ...prev, cta: e.target.value }))}
                placeholder="Link in Bio"
                className="w-full px-4 py-3 bg-dark-input border border-dark-border rounded-xl text-sm focus:outline-none focus:border-accent-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Eye className="w-5 h-5 text-accent-primary" />
            Preview
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setCustomText({ headline: '', subheadline: '', cta: 'Link in Bio' })}
              className="px-4 py-2 bg-dark-input hover:bg-white/10 rounded-xl text-sm flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        {/* Preview Canvas */}
        <div className="flex justify-center">
          <div
            className="relative rounded-xl overflow-hidden"
            style={{
              width: Math.min(selectedSize.width / 2, 600),
              height: Math.min(selectedSize.height / 2, 400),
              aspectRatio: `${selectedSize.width} / ${selectedSize.height}`,
              background: 'linear-gradient(135deg, #0A0E27 0%, #030208 100%)'
            }}
          >
            {/* Preview content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              {/* Glow effects */}
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#00F0FF] opacity-10 blur-[100px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#7B61FF] opacity-10 blur-[100px] rounded-full" />

              {/* Text */}
              <h2
                className="text-white font-bold text-center mb-2"
                style={{
                  fontSize: Math.min(selectedSize.width / 15, 48),
                  textShadow: '0 0 20px rgba(0, 240, 255, 0.5)'
                }}
              >
                {customText.headline || selectedTemplate.headline}
              </h2>
              <p
                className="text-[#00F0FF] font-semibold text-center"
                style={{ fontSize: Math.min(selectedSize.width / 30, 24) }}
              >
                {customText.subheadline || selectedTemplate.subheadline}
              </p>

              {/* CTA */}
              <p
                className="absolute bottom-8 text-white/70"
                style={{ fontSize: Math.min(selectedSize.width / 50, 16) }}
              >
                {customText.cta || 'Link in Bio'}
              </p>

              {/* Brand */}
              <p
                className="absolute bottom-4 text-[#00F0FF] font-bold"
                style={{ fontSize: Math.min(selectedSize.width / 50, 16) }}
              >
                SKYNETLABS
              </p>
            </div>

            {/* Border */}
            <div className="absolute inset-2 border border-[#00F0FF]/30 rounded-lg pointer-events-none" />
          </div>
        </div>

        {/* Size info */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            {selectedSize.name} - {selectedSize.width} x {selectedSize.height}px
          </p>
        </div>
      </div>

      {/* Download Actions */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Download className="w-5 h-5 text-accent-primary" />
          Download
        </h3>
        <div className="grid lg:grid-cols-3 gap-4">
          <motion.button
            onClick={() => generateImage(selectedTemplate, selectedSize)}
            disabled={isGenerating}
            className="py-4 bg-accent-primary hover:bg-accent-primary/80 disabled:opacity-50 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download Selected Size
              </>
            )}
          </motion.button>

          <motion.button
            onClick={() => generateAllSizes(selectedTemplate)}
            disabled={isGenerating}
            className="py-4 bg-dark-input hover:bg-white/10 disabled:opacity-50 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Layers className="w-5 h-5" />
            Download All Sizes
          </motion.button>

          <motion.button
            onClick={async () => {
              setIsGenerating(true);
              for (const template of PRESET_TEMPLATES) {
                await generateImage(template, selectedSize);
                await new Promise(resolve => setTimeout(resolve, 300));
              }
              setIsGenerating(false);
              toast.success('All templates downloaded!');
            }}
            disabled={isGenerating}
            className="py-4 bg-dark-input hover:bg-white/10 disabled:opacity-50 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles className="w-5 h-5" />
            Download All Templates
          </motion.button>
        </div>
      </div>

      {/* Brand Colors Reference */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-accent-primary" />
          Brand Colors
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {Object.entries(BRAND_COLORS).map(([name, color]) => (
            <motion.button
              key={name}
              onClick={async () => {
                await navigator.clipboard.writeText(color);
                toast.success(`Copied ${color}`);
              }}
              className="p-4 rounded-xl border border-dark-border hover:border-white/30 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="w-full h-12 rounded-lg mb-2"
                style={{ backgroundColor: color }}
              />
              <p className="text-sm font-medium capitalize">{name}</p>
              <p className="text-xs text-gray-500">{color}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quick Export All */}
      <div className="bg-gradient-to-r from-accent-primary/20 to-purple-600/20 border border-accent-primary/30 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent-primary" />
              Batch Export
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Generate all {PRESET_TEMPLATES.length} templates in all {IMAGE_TEMPLATES.length} sizes
              ({PRESET_TEMPLATES.length * IMAGE_TEMPLATES.length} images total)
            </p>
          </div>
          <motion.button
            onClick={async () => {
              setIsGenerating(true);
              let count = 0;
              for (const template of PRESET_TEMPLATES) {
                for (const size of IMAGE_TEMPLATES) {
                  await generateImage(template, size);
                  count++;
                  await new Promise(resolve => setTimeout(resolve, 200));
                }
              }
              setIsGenerating(false);
              toast.success(`Downloaded ${count} images!`);
            }}
            disabled={isGenerating}
            className="px-6 py-3 bg-accent-primary hover:bg-accent-primary/80 disabled:opacity-50 rounded-xl font-medium flex items-center gap-2 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Export All ({PRESET_TEMPLATES.length * IMAGE_TEMPLATES.length} images)
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
