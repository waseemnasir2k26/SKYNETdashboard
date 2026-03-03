import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video,
  Copy,
  Check,
  Search,
  Filter,
  Download,
  Play,
  Clock,
  Hash,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Star,
  Flame,
  Target,
  Eye,
  FileText
} from 'lucide-react';
import {
  PLATFORMS,
  CONTENT_PILLARS,
  VIDEO_SCRIPTS
} from '../data/socialMediaContent';
import toast from 'react-hot-toast';

export default function VideoScripts() {
  const [selectedPillar, setSelectedPillar] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedScript, setExpandedScript] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [sortBy, setSortBy] = useState('priority'); // priority | virality | title

  // Filter and sort scripts
  const filteredScripts = useMemo(() => {
    let scripts = [...VIDEO_SCRIPTS];

    // Filter by pillar
    if (selectedPillar !== 'all') {
      scripts = scripts.filter(s => s.pillar === selectedPillar);
    }

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      scripts = scripts.filter(s =>
        s.title.toLowerCase().includes(query) ||
        s.hook.toLowerCase().includes(query) ||
        s.script.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortBy === 'priority') {
      scripts.sort((a, b) => a.priority - b.priority);
    } else if (sortBy === 'virality') {
      scripts.sort((a, b) => b.viralityScore - a.viralityScore);
    } else if (sortBy === 'title') {
      scripts.sort((a, b) => a.title.localeCompare(b.title));
    }

    return scripts;
  }, [selectedPillar, searchQuery, sortBy]);

  // Copy content
  const copyContent = async (content, id) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  // Download script as text file
  const downloadScript = (script) => {
    const content = `VIDEO SCRIPT: ${script.title}
=====================================

PILLAR: ${CONTENT_PILLARS[script.pillar]?.name}
PLATFORMS: ${script.platform.map(p => PLATFORMS[p]?.name).join(', ')}
DURATION: ${script.duration}
FORMAT: ${script.format}
VIRALITY SCORE: ${'🔥'.repeat(script.viralityScore)}

HOOK:
${script.hook}

FULL SCRIPT:
${script.script}

CTA:
${script.cta}

HASHTAGS:
${script.hashtags?.join(' ') || 'N/A'}

THUMBNAIL IDEA:
${script.thumbnail || 'N/A'}
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `video-script-${script.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Script downloaded!');
  };

  // Get priority label
  const getPriorityLabel = (priority) => {
    if (priority <= 4) return { label: 'Film First', color: 'text-accent-danger bg-accent-danger/20' };
    if (priority <= 8) return { label: 'High Priority', color: 'text-accent-warning bg-accent-warning/20' };
    if (priority <= 12) return { label: 'Week 3', color: 'text-accent-info bg-accent-info/20' };
    return { label: 'Week 4+', color: 'text-gray-400 bg-gray-400/20' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Video className="w-7 h-7 text-accent-primary" />
            Video Scripts
          </h1>
          <p className="text-gray-400 mt-1">
            25 viral-ready video scripts with hooks, full scripts, and CTAs
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search scripts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-dark-input border border-dark-border rounded-xl text-sm focus:outline-none focus:border-accent-primary w-[200px]"
            />
          </div>

          {/* Pillar Filter */}
          <select
            value={selectedPillar}
            onChange={(e) => setSelectedPillar(e.target.value)}
            className="px-4 py-2 bg-dark-input border border-dark-border rounded-xl text-sm focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Pillars</option>
            {Object.entries(CONTENT_PILLARS).map(([key, pillar]) => (
              <option key={key} value={key}>
                {pillar.emoji} {pillar.name}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-dark-input border border-dark-border rounded-xl text-sm focus:outline-none focus:border-accent-primary"
          >
            <option value="priority">Sort by Priority</option>
            <option value="virality">Sort by Virality</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          className="bg-dark-card border border-dark-border rounded-xl p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-accent-danger/20 flex items-center justify-center">
              <Star className="w-6 h-6 text-accent-danger" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Film First</p>
              <p className="text-2xl font-bold">
                {VIDEO_SCRIPTS.filter(s => s.priority <= 4).length}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-dark-card border border-dark-border rounded-xl p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-accent-warning/20 flex items-center justify-center">
              <Flame className="w-6 h-6 text-accent-warning" />
            </div>
            <div>
              <p className="text-sm text-gray-400">5-Star Virality</p>
              <p className="text-2xl font-bold">
                {VIDEO_SCRIPTS.filter(s => s.viralityScore === 5).length}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-dark-card border border-dark-border rounded-xl p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-accent-success/20 flex items-center justify-center">
              <Video className="w-6 h-6 text-accent-success" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Scripts</p>
              <p className="text-2xl font-bold">{VIDEO_SCRIPTS.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-dark-card border border-dark-border rounded-xl p-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-accent-primary/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-accent-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Content Pillars</p>
              <p className="text-2xl font-bold">6</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Pillar Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedPillar('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            selectedPillar === 'all'
              ? 'bg-accent-primary text-white'
              : 'bg-dark-card border border-dark-border hover:border-white/30'
          }`}
        >
          All ({VIDEO_SCRIPTS.length})
        </button>
        {Object.entries(CONTENT_PILLARS).map(([key, pillar]) => {
          const count = VIDEO_SCRIPTS.filter(s => s.pillar === key).length;
          return (
            <button
              key={key}
              onClick={() => setSelectedPillar(selectedPillar === key ? 'all' : key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                selectedPillar === key
                  ? 'text-white'
                  : 'bg-dark-card border border-dark-border hover:border-white/30'
              }`}
              style={{
                backgroundColor: selectedPillar === key ? pillar.color : undefined
              }}
            >
              {pillar.emoji} {pillar.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Scripts List */}
      <div className="space-y-4">
        {filteredScripts.map((script, index) => {
          const priorityInfo = getPriorityLabel(script.priority);
          const isExpanded = expandedScript === script.id;

          return (
            <motion.div
              key={script.id}
              className="bg-dark-card border border-dark-border rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              layout
            >
              {/* Script Header */}
              <div className="p-4 border-b border-dark-border">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Priority Number */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                      script.priority <= 4 ? 'bg-accent-danger/20 text-accent-danger' :
                      script.priority <= 8 ? 'bg-accent-warning/20 text-accent-warning' :
                      'bg-dark-input text-gray-400'
                    }`}>
                      {script.priority}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{script.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        {/* Priority Label */}
                        <span className={`text-xs px-2 py-0.5 rounded-full ${priorityInfo.color}`}>
                          {priorityInfo.label}
                        </span>

                        {/* Pillar */}
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${CONTENT_PILLARS[script.pillar]?.color}20`,
                            color: CONTENT_PILLARS[script.pillar]?.color
                          }}
                        >
                          {CONTENT_PILLARS[script.pillar]?.emoji} {CONTENT_PILLARS[script.pillar]?.name}
                        </span>

                        {/* Duration */}
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {script.duration}
                        </span>

                        {/* Virality */}
                        <span className="text-xs text-accent-warning">
                          {'🔥'.repeat(script.viralityScore)}
                        </span>
                      </div>

                      {/* Platforms */}
                      <div className="flex gap-2 mt-2">
                        {script.platform.map(p => (
                          <span
                            key={p}
                            className="text-sm px-2 py-0.5 rounded-lg"
                            style={{ backgroundColor: `${PLATFORMS[p]?.color}20` }}
                          >
                            {PLATFORMS[p]?.icon}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedScript(isExpanded ? null : script.id)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Hook Preview (always visible) */}
              <div className="p-4 bg-dark-secondary border-b border-dark-border">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-accent-warning flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-medium mb-1">Hook</p>
                    <p className="text-sm font-medium">{script.hook}</p>
                  </div>
                  <button
                    onClick={() => copyContent(script.hook, `hook-${script.id}`)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                  >
                    {copiedId === `hook-${script.id}` ? (
                      <Check className="w-4 h-4 text-accent-success" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {/* Format */}
                    <div className="p-4 border-b border-dark-border">
                      <p className="text-xs text-gray-500 uppercase font-medium mb-2">Format</p>
                      <p className="text-sm text-gray-300">{script.format}</p>
                    </div>

                    {/* Full Script */}
                    <div className="p-4 border-b border-dark-border">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs text-gray-500 uppercase font-medium flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Full Script
                        </p>
                        <button
                          onClick={() => copyContent(script.script, `script-${script.id}`)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors ${
                            copiedId === `script-${script.id}`
                              ? 'bg-accent-success text-white'
                              : 'bg-dark-input hover:bg-white/10'
                          }`}
                        >
                          {copiedId === `script-${script.id}` ? (
                            <>
                              <Check className="w-3 h-3" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copy Script
                            </>
                          )}
                        </button>
                      </div>
                      <div className="bg-dark-input rounded-xl p-4 max-h-[400px] overflow-y-auto">
                        <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans">
                          {script.script}
                        </pre>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="p-4 border-b border-dark-border bg-accent-primary/5">
                      <div className="flex items-start gap-3">
                        <Target className="w-5 h-5 text-accent-primary flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 uppercase font-medium mb-1">Call to Action</p>
                          <p className="text-sm font-medium">{script.cta}</p>
                        </div>
                        <button
                          onClick={() => copyContent(script.cta, `cta-${script.id}`)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          {copiedId === `cta-${script.id}` ? (
                            <Check className="w-4 h-4 text-accent-success" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Hashtags */}
                    {script.hashtags && (
                      <div className="p-4 border-b border-dark-border">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs text-gray-500 uppercase font-medium flex items-center gap-2">
                            <Hash className="w-4 h-4" />
                            Hashtags
                          </p>
                          <button
                            onClick={() => copyContent(script.hashtags.join(' '), `tags-${script.id}`)}
                            className="text-xs text-accent-primary hover:underline"
                          >
                            Copy all
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {script.hashtags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 bg-dark-input rounded-full text-accent-info cursor-pointer hover:bg-accent-info/20 transition-colors"
                              onClick={() => copyContent(tag, `tag-${script.id}-${i}`)}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Thumbnail Idea */}
                    {script.thumbnail && (
                      <div className="p-4 border-b border-dark-border">
                        <p className="text-xs text-gray-500 uppercase font-medium mb-2 flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          Thumbnail Idea
                        </p>
                        <p className="text-sm text-gray-300">{script.thumbnail}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="p-4 bg-dark-secondary flex items-center gap-3">
                      <button
                        onClick={() => downloadScript(script)}
                        className="flex-1 py-2.5 bg-accent-primary hover:bg-accent-primary/80 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download Full Script
                      </button>
                      <button
                        onClick={() => copyContent(
                          `${script.hook}\n\n${script.script}\n\n${script.cta}\n\n${script.hashtags?.join(' ')}`,
                          `full-${script.id}`
                        )}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                          copiedId === `full-${script.id}`
                            ? 'bg-accent-success text-white'
                            : 'bg-dark-input hover:bg-white/10'
                        }`}
                      >
                        {copiedId === `full-${script.id}` ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy Everything
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredScripts.length === 0 && (
        <div className="text-center py-16">
          <Video className="w-16 h-16 mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-medium mb-2">No scripts found</h3>
          <p className="text-gray-500">Try adjusting your filters or search query</p>
        </div>
      )}

      {/* Filming Schedule */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Play className="w-5 h-5 text-accent-primary" />
          Recommended Filming Order
        </h3>
        <div className="grid lg:grid-cols-4 gap-4">
          {['Week 1', 'Week 2', 'Week 3', 'Week 4+'].map((week, weekIndex) => (
            <div key={week} className="p-4 bg-dark-secondary rounded-xl">
              <h4 className={`font-medium mb-3 ${
                weekIndex === 0 ? 'text-accent-danger' :
                weekIndex === 1 ? 'text-accent-warning' :
                'text-gray-400'
              }`}>
                {week} {weekIndex === 0 && '🔥'}
              </h4>
              <div className="space-y-2">
                {VIDEO_SCRIPTS
                  .filter(s => {
                    if (weekIndex === 0) return s.priority <= 4;
                    if (weekIndex === 1) return s.priority > 4 && s.priority <= 8;
                    if (weekIndex === 2) return s.priority > 8 && s.priority <= 12;
                    return s.priority > 12;
                  })
                  .slice(0, 4)
                  .map(script => (
                    <div
                      key={script.id}
                      className="text-xs p-2 bg-dark-input rounded-lg flex items-center gap-2 cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => setExpandedScript(script.id)}
                    >
                      <span className="font-bold text-gray-500">#{script.priority}</span>
                      <span className="truncate">{script.title.slice(0, 40)}...</span>
                    </div>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
