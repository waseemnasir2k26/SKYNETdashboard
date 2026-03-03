"""
SKYNETLABS - Real-Time News to Social Media Posts Generator
============================================================
Fetches trending tech/AI news and generates branded social media posts.

Features:
- Fetches news from multiple sources (NewsAPI, RSS feeds, Reddit)
- Filters for AI, automation, coding, SaaS topics
- Generates platform-specific posts (LinkedIn, Twitter, Instagram, TikTok)
- Outputs to JSON file for dashboard integration
- Can use OpenAI or Anthropic Claude for post generation

Setup:
1. pip install -r requirements.txt
2. Set your API keys in .env file
3. Run: python news_to_posts.py

Author: SkynetLabs
"""

import os
import json
import re
import random
from datetime import datetime, timedelta
from pathlib import Path
import feedparser
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# ============================================
# CONFIGURATION
# ============================================

CONFIG = {
    "news_api_key": os.getenv("NEWS_API_KEY", ""),
    "openai_api_key": os.getenv("OPENAI_API_KEY", ""),
    "anthropic_api_key": os.getenv("ANTHROPIC_API_KEY", ""),
    "ai_provider": os.getenv("AI_PROVIDER", "openai"),  # "openai" or "anthropic"
    "output_dir": Path(__file__).parent.parent / "src" / "data" / "generated",
    "topics": [
        "artificial intelligence",
        "AI automation",
        "Claude AI",
        "ChatGPT",
        "n8n automation",
        "no-code",
        "vibe coding",
        "SaaS",
        "GoHighLevel",
        "Zapier",
        "Make.com",
        "AI coding",
        "Cursor AI",
        "machine learning",
        "AI agents",
        "workflow automation"
    ],
    "rss_feeds": [
        "https://news.ycombinator.com/rss",
        "https://www.reddit.com/r/artificial/.rss",
        "https://www.reddit.com/r/automation/.rss",
        "https://techcrunch.com/category/artificial-intelligence/feed/",
        "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
        "https://feeds.feedburner.com/venturebeat/SZYF",
    ],
}

# Brand voice templates
BRAND_VOICE = {
    "tone": "confident, direct, results-focused, slightly provocative",
    "style": "short sentences, data-driven, controversial takes welcome",
    "cta_options": [
        "DM me 'AI' for details",
        "Link in bio for free consultation",
        "Book a free strategy call - link in bio",
        "Follow for more AI automation content",
        "Save this for later",
        "Comment below if you agree",
        "Share this with someone who needs to see it",
    ],
    "hashtag_sets": {
        "ai": ["#AI", "#ArtificialIntelligence", "#MachineLearning", "#Tech", "#Future"],
        "automation": ["#Automation", "#n8n", "#Workflow", "#Productivity", "#NoCode"],
        "coding": ["#VibeCoding", "#ClaudeCode", "#Coding", "#Developer", "#Programming"],
        "business": ["#Business", "#Entrepreneur", "#Startup", "#SaaS", "#Growth"],
    }
}

# ============================================
# NEWS FETCHERS
# ============================================

def fetch_news_api(query: str, days_back: int = 1) -> list:
    """Fetch news from NewsAPI.org"""
    if not CONFIG["news_api_key"]:
        print("⚠️  NewsAPI key not set, skipping NewsAPI...")
        return []

    url = "https://newsapi.org/v2/everything"
    from_date = (datetime.now() - timedelta(days=days_back)).strftime("%Y-%m-%d")

    params = {
        "q": query,
        "from": from_date,
        "sortBy": "relevancy",
        "language": "en",
        "pageSize": 10,
        "apiKey": CONFIG["news_api_key"]
    }

    try:
        response = requests.get(url, params=params, timeout=10)
        data = response.json()

        if data.get("status") == "ok":
            articles = []
            for article in data.get("articles", []):
                articles.append({
                    "title": article.get("title", ""),
                    "description": article.get("description", ""),
                    "url": article.get("url", ""),
                    "source": article.get("source", {}).get("name", "Unknown"),
                    "published_at": article.get("publishedAt", ""),
                    "type": "news"
                })
            return articles
    except Exception as e:
        print(f"❌ NewsAPI error: {e}")

    return []


def fetch_rss_feeds() -> list:
    """Fetch news from RSS feeds"""
    articles = []

    for feed_url in CONFIG["rss_feeds"]:
        try:
            feed = feedparser.parse(feed_url)
            for entry in feed.entries[:5]:  # Get top 5 from each feed
                # Filter for relevant topics
                title = entry.get("title", "").lower()
                summary = entry.get("summary", "").lower()
                content = title + " " + summary

                # Check if relevant to our topics
                is_relevant = any(
                    topic.lower() in content
                    for topic in CONFIG["topics"]
                )

                if is_relevant:
                    articles.append({
                        "title": entry.get("title", ""),
                        "description": entry.get("summary", "")[:500],
                        "url": entry.get("link", ""),
                        "source": feed.feed.get("title", "RSS Feed"),
                        "published_at": entry.get("published", ""),
                        "type": "rss"
                    })
        except Exception as e:
            print(f"⚠️  RSS feed error ({feed_url}): {e}")

    return articles


def fetch_hacker_news_top() -> list:
    """Fetch top stories from Hacker News API"""
    articles = []

    try:
        # Get top story IDs
        response = requests.get(
            "https://hacker-news.firebaseio.com/v0/topstories.json",
            timeout=10
        )
        story_ids = response.json()[:30]  # Top 30

        for story_id in story_ids:
            try:
                story_response = requests.get(
                    f"https://hacker-news.firebaseio.com/v0/item/{story_id}.json",
                    timeout=5
                )
                story = story_response.json()

                if story and story.get("title"):
                    title = story.get("title", "").lower()

                    # Check relevance
                    is_relevant = any(
                        topic.lower() in title
                        for topic in CONFIG["topics"]
                    )

                    if is_relevant:
                        articles.append({
                            "title": story.get("title", ""),
                            "description": f"Score: {story.get('score', 0)} | Comments: {story.get('descendants', 0)}",
                            "url": story.get("url", f"https://news.ycombinator.com/item?id={story_id}"),
                            "source": "Hacker News",
                            "published_at": datetime.fromtimestamp(story.get("time", 0)).isoformat(),
                            "type": "hackernews",
                            "score": story.get("score", 0)
                        })
            except:
                continue

    except Exception as e:
        print(f"❌ Hacker News error: {e}")

    # Sort by score
    articles.sort(key=lambda x: x.get("score", 0), reverse=True)
    return articles[:10]


def fetch_all_news() -> list:
    """Fetch news from all sources"""
    print("📰 Fetching news from multiple sources...")

    all_articles = []

    # NewsAPI (if key available)
    for topic in ["AI automation", "Claude AI", "no-code tools", "SaaS"]:
        articles = fetch_news_api(topic)
        all_articles.extend(articles)
        print(f"  ✓ NewsAPI '{topic}': {len(articles)} articles")

    # RSS Feeds
    rss_articles = fetch_rss_feeds()
    all_articles.extend(rss_articles)
    print(f"  ✓ RSS Feeds: {len(rss_articles)} articles")

    # Hacker News
    hn_articles = fetch_hacker_news_top()
    all_articles.extend(hn_articles)
    print(f"  ✓ Hacker News: {len(hn_articles)} articles")

    # Remove duplicates by title
    seen_titles = set()
    unique_articles = []
    for article in all_articles:
        title_key = article["title"].lower()[:50]
        if title_key not in seen_titles:
            seen_titles.add(title_key)
            unique_articles.append(article)

    print(f"\n📊 Total unique articles: {len(unique_articles)}")
    return unique_articles


# ============================================
# AI POST GENERATORS
# ============================================

def generate_post_with_openai(article: dict, platform: str) -> dict:
    """Generate social media post using OpenAI"""
    if not CONFIG["openai_api_key"]:
        return generate_post_fallback(article, platform)

    try:
        import openai
        client = openai.OpenAI(api_key=CONFIG["openai_api_key"])

        platform_specs = {
            "linkedin": "Professional tone, 1500 chars max, include relevant insights and a CTA",
            "twitter": "Punchy and provocative, 280 chars max, controversial angle welcome",
            "instagram": "Engaging and visual, include emoji, 2200 chars max, end with CTA",
            "tiktok": "Trendy and attention-grabbing, hook in first line, 2200 chars max"
        }

        prompt = f"""You are a social media content creator for SKYNETLABS, an AI automation agency.

Brand Voice: {BRAND_VOICE['tone']}
Style: {BRAND_VOICE['style']}

News Article:
Title: {article['title']}
Description: {article['description']}
Source: {article['source']}

Create a {platform.upper()} post about this news.
Platform requirements: {platform_specs.get(platform, 'General social media post')}

IMPORTANT:
- Add YOUR unique take/opinion on this news
- Connect it to AI automation, n8n, Claude Code, or business automation
- Make it valuable for entrepreneurs and business owners
- Include a call-to-action from this list: {BRAND_VOICE['cta_options']}
- Add relevant hashtags

Return ONLY the post content, nothing else."""

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=500,
            temperature=0.8
        )

        content = response.choices[0].message.content.strip()

        return {
            "platform": platform,
            "content": content,
            "source_article": article["title"],
            "source_url": article["url"],
            "generated_at": datetime.now().isoformat(),
            "ai_provider": "openai"
        }

    except Exception as e:
        print(f"❌ OpenAI error: {e}")
        return generate_post_fallback(article, platform)


def generate_post_with_anthropic(article: dict, platform: str) -> dict:
    """Generate social media post using Anthropic Claude"""
    if not CONFIG["anthropic_api_key"]:
        return generate_post_fallback(article, platform)

    try:
        import anthropic
        client = anthropic.Anthropic(api_key=CONFIG["anthropic_api_key"])

        platform_specs = {
            "linkedin": "Professional tone, 1500 chars max, include relevant insights and a CTA",
            "twitter": "Punchy and provocative, 280 chars max, controversial angle welcome",
            "instagram": "Engaging and visual, include emoji, 2200 chars max, end with CTA",
            "tiktok": "Trendy and attention-grabbing, hook in first line, 2200 chars max"
        }

        prompt = f"""You are a social media content creator for SKYNETLABS, an AI automation agency.

Brand Voice: {BRAND_VOICE['tone']}
Style: {BRAND_VOICE['style']}

News Article:
Title: {article['title']}
Description: {article['description']}
Source: {article['source']}

Create a {platform.upper()} post about this news.
Platform requirements: {platform_specs.get(platform, 'General social media post')}

IMPORTANT:
- Add YOUR unique take/opinion on this news
- Connect it to AI automation, n8n, Claude Code, or business automation
- Make it valuable for entrepreneurs and business owners
- Include a call-to-action from this list: {BRAND_VOICE['cta_options']}
- Add relevant hashtags

Return ONLY the post content, nothing else."""

        response = client.messages.create(
            model="claude-3-haiku-20240307",
            max_tokens=500,
            messages=[{"role": "user", "content": prompt}]
        )

        content = response.content[0].text.strip()

        return {
            "platform": platform,
            "content": content,
            "source_article": article["title"],
            "source_url": article["url"],
            "generated_at": datetime.now().isoformat(),
            "ai_provider": "anthropic"
        }

    except Exception as e:
        print(f"❌ Anthropic error: {e}")
        return generate_post_fallback(article, platform)


def generate_post_fallback(article: dict, platform: str) -> dict:
    """Generate post without AI (template-based fallback)"""

    templates = {
        "linkedin": [
            f"🚀 Big news in AI: {article['title']}\n\nHere's why this matters for your business:\n\nAI automation isn't slowing down. If you're not adapting, you're falling behind.\n\nAt SkynetLabs, we help businesses leverage these exact technologies to:\n→ Automate repetitive tasks\n→ Scale operations\n→ Increase revenue\n\nWhat's your take on this development?\n\n#AI #Automation #Business #Tech #Future",
            f"📢 {article['title']}\n\nThis is exactly what we've been talking about.\n\nThe businesses that win in 2026 are the ones using AI automation NOW.\n\nNot thinking about it. USING it.\n\nI help businesses implement these systems daily.\n\nDM me 'AI' if you want to see what's possible.\n\n#AIAutomation #Business #Growth"
        ],
        "twitter": [
            f"🔥 {article['title'][:150]}...\n\nThis changes everything for automation.\n\nThe future is here. Are you ready?\n\n#AI #Automation",
            f"Just saw this: {article['title'][:120]}...\n\nHot take: This is why I use n8n + Claude Code.\n\nThe game is changing FAST.\n\n#AI #Tech"
        ],
        "instagram": [
            f"🚀 {article['title']}\n\nThis is HUGE for anyone in business.\n\nHere's what this means for you:\n\n✅ AI is getting smarter\n✅ Automation is getting easier\n✅ Those who adapt will WIN\n\nI help businesses implement AI automation daily.\n\n💬 Comment 'AI' and I'll share how to get started.\n\n#AI #Automation #Business #Entrepreneur #Tech #Future #SkynetLabs",
            f"⚡ Breaking: {article['title']}\n\nEvery day I see more proof that AI automation is THE skill to have in 2026.\n\nAre you learning it or getting left behind?\n\n🔗 Link in bio for free resources\n\n#AIAutomation #Business #Growth #Tech"
        ],
        "tiktok": [
            f"POV: You just read this headline and realized AI is taking over 👀\n\n\"{article['title']}\"\n\nThis is why I've been saying:\n→ Learn AI automation NOW\n→ n8n + Claude Code = unlimited power\n→ The game is changing\n\nFollow for more AI content 🤖\n\n#AI #Automation #Tech #Business",
            f"BREAKING: {article['title']}\n\nIf you're not paying attention to AI right now, you're going to regret it.\n\nI've been helping businesses automate for years.\n\nThis? This is different.\n\nSave this. You'll need it.\n\n#AI #Business #Automation"
        ]
    }

    platform_templates = templates.get(platform, templates["linkedin"])
    content = random.choice(platform_templates)

    return {
        "platform": platform,
        "content": content,
        "source_article": article["title"],
        "source_url": article["url"],
        "generated_at": datetime.now().isoformat(),
        "ai_provider": "template"
    }


def generate_post(article: dict, platform: str) -> dict:
    """Generate post using configured AI provider"""
    if CONFIG["ai_provider"] == "anthropic" and CONFIG["anthropic_api_key"]:
        return generate_post_with_anthropic(article, platform)
    elif CONFIG["ai_provider"] == "openai" and CONFIG["openai_api_key"]:
        return generate_post_with_openai(article, platform)
    else:
        return generate_post_fallback(article, platform)


# ============================================
# MAIN WORKFLOW
# ============================================

def generate_daily_posts(num_posts: int = 7) -> dict:
    """Generate daily social media posts from news"""

    print("\n" + "="*60)
    print("🤖 SKYNETLABS - News to Social Media Generator")
    print("="*60 + "\n")

    # Fetch news
    articles = fetch_all_news()

    if not articles:
        print("❌ No articles found. Check your internet connection or API keys.")
        return {}

    # Select top articles
    top_articles = articles[:num_posts]

    print(f"\n📝 Generating posts for {len(top_articles)} articles...")

    # Generate posts for each platform
    all_posts = {
        "generated_at": datetime.now().isoformat(),
        "date": datetime.now().strftime("%Y-%m-%d"),
        "articles_processed": len(top_articles),
        "posts": {
            "linkedin": [],
            "twitter": [],
            "instagram": [],
            "tiktok": []
        }
    }

    platforms = ["linkedin", "twitter", "instagram", "tiktok"]

    for i, article in enumerate(top_articles):
        print(f"\n  [{i+1}/{len(top_articles)}] Processing: {article['title'][:50]}...")

        for platform in platforms:
            post = generate_post(article, platform)
            all_posts["posts"][platform].append(post)
            print(f"    ✓ {platform.capitalize()} post generated")

    # Save to file
    output_dir = CONFIG["output_dir"]
    output_dir.mkdir(parents=True, exist_ok=True)

    # Save daily posts
    daily_file = output_dir / f"posts_{datetime.now().strftime('%Y-%m-%d')}.json"
    with open(daily_file, "w", encoding="utf-8") as f:
        json.dump(all_posts, f, indent=2, ensure_ascii=False)

    # Save latest posts (for dashboard integration)
    latest_file = output_dir / "latest_posts.json"
    with open(latest_file, "w", encoding="utf-8") as f:
        json.dump(all_posts, f, indent=2, ensure_ascii=False)

    print(f"\n✅ Posts saved to: {daily_file}")
    print(f"✅ Latest posts updated: {latest_file}")

    # Print summary
    print("\n" + "="*60)
    print("📊 GENERATION SUMMARY")
    print("="*60)
    print(f"  Date: {all_posts['date']}")
    print(f"  Articles processed: {all_posts['articles_processed']}")
    for platform, posts in all_posts["posts"].items():
        print(f"  {platform.capitalize()}: {len(posts)} posts")
    print("="*60 + "\n")

    return all_posts


def print_sample_posts(posts: dict, num_samples: int = 2):
    """Print sample posts for preview"""
    print("\n" + "="*60)
    print("📱 SAMPLE POSTS PREVIEW")
    print("="*60)

    for platform, platform_posts in posts.get("posts", {}).items():
        print(f"\n{'─'*40}")
        print(f"📌 {platform.upper()}")
        print(f"{'─'*40}")

        for post in platform_posts[:num_samples]:
            print(f"\n📰 Source: {post.get('source_article', 'N/A')[:50]}...")
            print(f"🤖 AI: {post.get('ai_provider', 'unknown')}")
            print(f"\n{post.get('content', '')}\n")
            print("─" * 30)


# ============================================
# CLI INTERFACE
# ============================================

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Generate social media posts from real-time news"
    )
    parser.add_argument(
        "-n", "--num-posts",
        type=int,
        default=7,
        help="Number of news articles to process (default: 7)"
    )
    parser.add_argument(
        "-p", "--preview",
        action="store_true",
        help="Show preview of generated posts"
    )
    parser.add_argument(
        "--provider",
        choices=["openai", "anthropic", "template"],
        default=None,
        help="Override AI provider"
    )

    args = parser.parse_args()

    # Override provider if specified
    if args.provider:
        if args.provider == "template":
            CONFIG["openai_api_key"] = ""
            CONFIG["anthropic_api_key"] = ""
        else:
            CONFIG["ai_provider"] = args.provider

    # Generate posts
    posts = generate_daily_posts(num_posts=args.num_posts)

    # Show preview if requested
    if args.preview and posts:
        print_sample_posts(posts)

    print("\n🎉 Done! Check the output files for your social media content.")
    print("📂 Output directory:", CONFIG["output_dir"])
