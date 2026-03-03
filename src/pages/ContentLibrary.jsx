import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Library,
  Copy,
  Check,
  Search,
  Filter,
  Eye,
  Download,
  ExternalLink,
  Hash,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import {
  PLATFORMS,
  CONTENT_PILLARS,
  SOCIAL_POSTS,
  HASHTAG_SETS
} from '../data/socialMediaContent';
import toast from 'react-hot-toast';

export default function ContentLibrary() {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedPillar, setSelectedPillar] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPost, setExpandedPost] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid | list

  // Filter posts
  const filteredPosts = useMemo(() => {
    let posts = [];

    Object.entries(SOCIAL_POSTS).forEach(([platform, platformPosts]) => {
      if (selectedPlatform !== 'all' && platform !== selectedPlatform) return;

      platformPosts.forEach(post => {
        if (selectedPillar !== 'all' && post.pillar !== selectedPillar) return;

        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const matchesTitle = post.title?.toLowerCase().includes(query);
          const matchesContent = post.content?.toLowerCase().includes(query);
          const matchesHashtags = post.hashtags?.some(h => h.toLowerCase().includes(query));
          if (!matchesTitle && !matchesContent && !matchesHashtags) return;
        }

        posts.push({ ...post, platform });
      });
    });

    return posts;
  }, [selectedPlatform, selectedPillar, searchQuery]);

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

  // Copy full post with hashtags
  const copyFullPost = async (post) => {
    const fullContent = `${post.content}\n\n${post.hashtags?.join(' ') || ''}`;
    await copyContent(fullContent, `full-${post.id}`);
  };

  // Copy hashtags only
  const copyHashtags = async (post) => {
    await copyContent(post.hashtags?.join(' ') || '', `tags-${post.id}`);
  };

  // Download as text file
  const downloadPost = (post) => {
    const content = `${post.title}\n\nPlatform: ${PLATFORMS[post.platform]?.name}\nPillar: ${CONTENT_PILLARS[post.pillar]?.name}\n\n${post.content}\n\nHashtags:\n${post.hashtags?.join(' ') || ''}\n\nCTA: ${post.cta || 'N/A'}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${post.platform}-${post.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Library className="w-7 h-7 text-accent-primary" />
            Content Library
          </h1>
          <p className="text-gray-400 mt-1">
            {filteredPosts.length} posts ready to copy and publish
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-dark-input border border-dark-border rounded-xl text-sm focus:outline-none focus:border-accent-primary w-[200px]"
            />
          </div>

          {/* Platform Filter */}
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-4 py-2 bg-dark-input border border-dark-border rounded-xl text-sm focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Platforms</option>
            {Object.entries(PLATFORMS).map(([key, platform]) => (
              <option key={key} value={key}>
                {platform.icon} {platform.name}
              </option>
            ))}
          </select>

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
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        {Object.entries(CONTENT_PILLARS).map(([key, pillar]) => {
          const count = Object.values(SOCIAL_POSTS).flat().filter(p => p.pillar === key).length;
          return (
            <motion.button
              key={key}
              onClick={() => setSelectedPillar(selectedPillar === key ? 'all' : key)}
              className={`p-3 rounded-xl border transition-all ${
                selectedPillar === key
                  ? 'border-accent-primary bg-accent-primary/10'
                  : 'border-dark-border bg-dark-card hover:border-white/30'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                  style={{ backgroundColor: `${pillar.color}20` }}
                >
                  {pillar.emoji}
                </span>
                <div className="text-left">
                  <p className="text-xs text-gray-400">{pillar.name}</p>
                  <p className="font-bold">{count}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Posts Grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id || index}
            className="bg-dark-card border border-dark-border rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            layout
          >
            {/* Post Header */}
            <div className="p-4 border-b border-dark-border">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{ backgroundColor: `${PLATFORMS[post.platform]?.color}20` }}
                  >
                    {PLATFORMS[post.platform]?.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{post.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {PLATFORMS[post.platform]?.name}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${CONTENT_PILLARS[post.pillar]?.color}20`,
                          color: CONTENT_PILLARS[post.pillar]?.color
                        }}
                      >
                        {CONTENT_PILLARS[post.pillar]?.name}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {expandedPost === post.id ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Post Content */}
            <div className="p-4">
              <div className={`text-sm text-gray-300 whitespace-pre-wrap ${
                expandedPost !== post.id ? 'line-clamp-4' : ''
              }`}>
                {post.content}
              </div>

              {/* Thread Content (for Twitter) */}
              {post.thread && expandedPost === post.id && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-gray-500 uppercase font-medium">Thread:</p>
                  {post.thread.map((tweet, i) => (
                    <div key={i} className="pl-4 border-l-2 border-dark-border py-2">
                      <span className="text-xs text-gray-500 mb-1 block">{i + 1}/{post.thread.length}</span>
                      <p className="text-sm text-gray-400">{tweet}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Carousel Content (for Instagram) */}
              {post.carousel && expandedPost === post.id && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-gray-500 uppercase font-medium">Carousel Slides:</p>
                  {post.carousel.map((slide, i) => (
                    <div key={i} className="p-3 bg-dark-secondary rounded-lg">
                      <span className="text-xs text-accent-primary font-medium">Slide {i + 1}</span>
                      <p className="text-sm text-gray-400 mt-1">{slide}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Hashtags */}
              {post.hashtags && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.hashtags.slice(0, expandedPost === post.id ? undefined : 5).map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 bg-dark-input rounded-full text-accent-info cursor-pointer hover:bg-accent-info/20 transition-colors"
                      onClick={() => copyContent(tag, `tag-${post.id}-${i}`)}
                    >
                      {tag}
                    </span>
                  ))}
                  {!expandedPost && post.hashtags?.length > 5 && (
                    <span className="text-xs text-gray-500">
                      +{post.hashtags.length - 5} more
                    </span>
                  )}
                </div>
              )}

              {/* CTA */}
              {post.cta && expandedPost === post.id && (
                <div className="mt-3 p-2 bg-accent-primary/10 rounded-lg border border-accent-primary/30">
                  <span className="text-xs text-accent-primary font-medium">CTA: </span>
                  <span className="text-sm">{post.cta}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="px-4 py-3 bg-dark-secondary border-t border-dark-border flex items-center gap-2">
              <button
                onClick={() => copyFullPost(post)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                  copiedId === `full-${post.id}`
                    ? 'bg-accent-success text-white'
                    : 'bg-accent-primary hover:bg-accent-primary/80 text-white'
                }`}
              >
                {copiedId === `full-${post.id}` ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Post
                  </>
                )}
              </button>

              <button
                onClick={() => copyHashtags(post)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Copy hashtags only"
              >
                <Hash className="w-4 h-4" />
              </button>

              <button
                onClick={() => downloadPost(post)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Download as text file"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <Library className="w-16 h-16 mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-medium mb-2">No content found</h3>
          <p className="text-gray-500">Try adjusting your filters or search query</p>
        </div>
      )}

      {/* Hashtag Sets Quick Reference */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Hash className="w-5 h-5 text-accent-primary" />
          Hashtag Sets by Pillar
        </h3>
        <div className="grid lg:grid-cols-3 gap-4">
          {Object.entries(HASHTAG_SETS).map(([pillar, tags]) => (
            <div key={pillar} className="p-4 bg-dark-secondary rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-xs"
                    style={{ backgroundColor: `${CONTENT_PILLARS[pillar]?.color}20` }}
                  >
                    {CONTENT_PILLARS[pillar]?.emoji}
                  </span>
                  <span className="text-sm font-medium">
                    {CONTENT_PILLARS[pillar]?.name}
                  </span>
                </div>
                <button
                  onClick={() => copyContent(tags.join(' '), `set-${pillar}`)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  title="Copy all"
                >
                  {copiedId === `set-${pillar}` ? (
                    <Check className="w-3 h-3 text-accent-success" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
              <div className="flex flex-wrap gap-1">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 bg-dark-input rounded-full text-accent-info cursor-pointer hover:bg-accent-info/20 transition-colors"
                    onClick={() => copyContent(tag, `hashtag-${pillar}-${i}`)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
