import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
  Calendar,
  Clock,
  Newspaper,
  Filter,
  Download,
  Zap,
  AlertCircle
} from 'lucide-react';
import { PLATFORMS } from '../data/socialMediaContent';
import toast from 'react-hot-toast';

// Sample data structure (will be replaced by real data from Python script)
const SAMPLE_POSTS = {
  generated_at: new Date().toISOString(),
  date: new Date().toISOString().split('T')[0],
  articles_processed: 5,
  posts: {
    linkedin: [
      {
        platform: "linkedin",
        content: "🚀 Big news: Claude 3.5 just got even better at coding tasks.\n\nHere's why this matters for your business:\n\nAI automation isn't slowing down. If you're not adapting, you're falling behind.\n\nAt SkynetLabs, we help businesses leverage these exact technologies to:\n→ Automate repetitive tasks\n→ Scale operations without hiring\n→ Increase revenue with AI agents\n\nWhat's your take on this development?\n\nDM me 'AI' for a free consultation.\n\n#AI #Automation #Business #ClaudeAI #Future",
        source_article: "Anthropic Releases Major Claude Update",
        source_url: "https://example.com/article1",
        generated_at: new Date().toISOString(),
        ai_provider: "openai"
      },
      {
        platform: "linkedin",
        content: "📢 n8n just hit 50K GitHub stars.\n\nThis is exactly what we've been talking about.\n\nThe businesses that win in 2026 are the ones using workflow automation NOW.\n\nNot thinking about it. USING it.\n\nI've helped 50+ businesses implement n8n workflows that:\n✅ Save 20+ hours per week\n✅ Eliminate manual data entry\n✅ Scale without hiring\n\nBook a free automation audit - link in bio.\n\n#n8n #Automation #NoCode #Business",
        source_article: "n8n Reaches 50K GitHub Stars",
        source_url: "https://example.com/article2",
        generated_at: new Date().toISOString(),
        ai_provider: "anthropic"
      }
    ],
    twitter: [
      {
        platform: "twitter",
        content: "🔥 Claude 3.5 is now the best coding AI.\n\nI've tested it against GPT-4, Gemini, and Copilot.\n\nNot even close.\n\nThis is why I use Claude Code for all client projects.\n\n#AI #ClaudeAI #Coding",
        source_article: "Anthropic Releases Major Claude Update",
        source_url: "https://example.com/article1",
        generated_at: new Date().toISOString(),
        ai_provider: "openai"
      }
    ],
    instagram: [
      {
        platform: "instagram",
        content: "🚀 The AI landscape just shifted AGAIN.\n\nClaude 3.5 dropped and it's a game-changer for:\n\n✅ Vibe Coding - Build apps 10x faster\n✅ Content Creation - Write better, faster\n✅ Automation - Connect everything with AI\n\nI've been using it for client projects all week.\n\nThe results? Insane. 🤯\n\nWant to see what's possible?\n\n💬 Comment 'AI' and I'll share my exact workflow.\n\n📲 Link in bio for free resources.\n\n#AI #ClaudeAI #VibeCoding #Automation #Tech #Entrepreneur #Business #SkynetLabs #Future #Innovation",
        source_article: "Anthropic Releases Major Claude Update",
        source_url: "https://example.com/article1",
        generated_at: new Date().toISOString(),
        ai_provider: "template"
      }
    ],
    tiktok: [
      {
        platform: "tiktok",
        content: "POV: You just saw the new Claude 3.5 update and your mind is BLOWN 🤯\n\nThis AI can now:\n→ Write entire apps in minutes\n→ Understand your full codebase\n→ Fix bugs automatically\n\nI've been building with it all week.\n\nThe game has officially changed.\n\nFollow for more AI content 🤖\n\n#AI #ClaudeAI #Coding #Tech #Viral #Business",
        source_article: "Anthropic Releases Major Claude Update",
        source_url: "https://example.com/article1",
        generated_at: new Date().toISOString(),
        ai_provider: "openai"
      }
    ]
  }
};

export default function AIGeneratedPosts() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const [error, setError] = useState(null);

  // Load posts from generated file
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      // Try to load from generated file
      const response = await fetch('/src/data/generated/latest_posts.json');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        // Use sample data if file doesn't exist
        setPosts(SAMPLE_POSTS);
        setError('Using sample data. Run the Python script to generate real posts.');
      }
    } catch (err) {
      // Use sample data on error
      setPosts(SAMPLE_POSTS);
      setError('Using sample data. Run the Python script to generate real posts from news.');
    } finally {
      setLoading(false);
    }
  };

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

  // Get filtered posts
  const getFilteredPosts = () => {
    if (!posts?.posts) return [];

    let allPosts = [];
    Object.entries(posts.posts).forEach(([platform, platformPosts]) => {
      if (selectedPlatform !== 'all' && platform !== selectedPlatform) return;
      platformPosts.forEach((post, idx) => {
        allPosts.push({ ...post, id: `${platform}-${idx}` });
      });
    });

    return allPosts;
  };

  // Download all posts
  const downloadAllPosts = () => {
    const content = JSON.stringify(posts, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-posts-${posts?.date || 'latest'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-accent-primary" />
      </div>
    );
  }

  const filteredPosts = getFilteredPosts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Sparkles className="w-7 h-7 text-accent-primary" />
            AI-Generated Posts
          </h1>
          <p className="text-gray-400 mt-1">
            Real-time news transformed into social media content
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Platform Filter */}
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-4 py-2 bg-dark-input border border-dark-border rounded-xl text-sm focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All Platforms</option>
            {Object.entries(PLATFORMS).slice(0, 4).map(([key, platform]) => (
              <option key={key} value={key}>
                {platform.icon} {platform.name}
              </option>
            ))}
          </select>

          <button
            onClick={loadPosts}
            className="px-4 py-2 bg-dark-input hover:bg-white/10 rounded-xl text-sm flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>

          <button
            onClick={downloadAllPosts}
            className="px-4 py-2 bg-accent-primary hover:bg-accent-primary/80 rounded-xl text-sm flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download All
          </button>
        </div>
      </div>

      {/* Error/Info Banner */}
      {error && (
        <div className="bg-accent-warning/10 border border-accent-warning/30 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-accent-warning flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-accent-warning font-medium">Sample Data Mode</p>
            <p className="text-xs text-gray-400 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Stats */}
      {posts && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            className="bg-dark-card border border-dark-border rounded-xl p-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-primary/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Generated</p>
                <p className="font-bold">{posts.date}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-dark-card border border-dark-border rounded-xl p-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-info/20 flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-accent-info" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Articles Processed</p>
                <p className="font-bold">{posts.articles_processed}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-dark-card border border-dark-border rounded-xl p-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-success/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-accent-success" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Total Posts</p>
                <p className="font-bold">
                  {Object.values(posts.posts).flat().length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-dark-card border border-dark-border rounded-xl p-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-warning/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent-warning" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Last Updated</p>
                <p className="font-bold text-sm">
                  {new Date(posts.generated_at).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* How to Generate */}
      <div className="bg-gradient-to-r from-accent-primary/10 to-purple-600/10 border border-accent-primary/30 rounded-xl p-6">
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent-primary" />
          Generate Fresh Posts from Real-Time News
        </h3>
        <div className="grid lg:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 mb-2">Run these commands in the scripts folder:</p>
            <div className="bg-dark-primary rounded-lg p-3 font-mono text-xs space-y-1">
              <p className="text-gray-500"># Install dependencies</p>
              <p className="text-accent-info">pip install -r requirements.txt</p>
              <p className="text-gray-500 mt-2"># Run once</p>
              <p className="text-accent-info">python news_to_posts.py --preview</p>
              <p className="text-gray-500 mt-2"># Auto-schedule daily at 6 AM</p>
              <p className="text-accent-info">python auto_scheduler.py --daily 06:00</p>
            </div>
          </div>
          <div>
            <p className="text-gray-400 mb-2">Set up your API keys in .env:</p>
            <div className="bg-dark-primary rounded-lg p-3 font-mono text-xs space-y-1">
              <p className="text-accent-warning">NEWS_API_KEY=your_key</p>
              <p className="text-accent-warning">OPENAI_API_KEY=your_key</p>
              <p className="text-gray-500"># OR</p>
              <p className="text-accent-warning">ANTHROPIC_API_KEY=your_key</p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            className="bg-dark-card border border-dark-border rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-dark-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ backgroundColor: `${PLATFORMS[post.platform]?.color}20` }}
                >
                  {PLATFORMS[post.platform]?.icon}
                </div>
                <div>
                  <p className="font-medium">{PLATFORMS[post.platform]?.name}</p>
                  <p className="text-xs text-gray-500">
                    via {post.ai_provider}
                  </p>
                </div>
              </div>
              <span className="text-xs px-2 py-1 bg-accent-primary/20 text-accent-primary rounded-full">
                AI Generated
              </span>
            </div>

            {/* Source */}
            <div className="px-4 py-2 bg-dark-secondary border-b border-dark-border">
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <Newspaper className="w-3 h-3" />
                Source: {post.source_article}
                {post.source_url && (
                  <a
                    href={post.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-info hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </p>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-sm text-gray-300 whitespace-pre-wrap">
                {post.content}
              </p>
            </div>

            {/* Actions */}
            <div className="px-4 py-3 bg-dark-secondary border-t border-dark-border">
              <button
                onClick={() => copyContent(post.content, post.id)}
                className={`w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                  copiedId === post.id
                    ? 'bg-accent-success text-white'
                    : 'bg-accent-primary hover:bg-accent-primary/80 text-white'
                }`}
              >
                {copiedId === post.id ? (
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
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <Sparkles className="w-16 h-16 mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-medium mb-2">No posts found</h3>
          <p className="text-gray-500">Run the Python script to generate posts from real-time news</p>
        </div>
      )}
    </div>
  );
}
