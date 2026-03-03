// Social Media Content Library for SkynetLabs
// All content pre-written and ready to copy/schedule

export const PLATFORMS = {
  linkedin: { name: 'LinkedIn', icon: '💼', color: '#0A66C2', maxChars: 3000 },
  twitter: { name: 'Twitter/X', icon: '𝕏', color: '#000000', maxChars: 280 },
  instagram: { name: 'Instagram', icon: '📸', color: '#E4405F', maxChars: 2200 },
  tiktok: { name: 'TikTok', icon: '🎵', color: '#000000', maxChars: 2200 },
  youtube: { name: 'YouTube', icon: '▶️', color: '#FF0000', maxChars: 5000 },
  facebook: { name: 'Facebook', icon: '👤', color: '#1877F2', maxChars: 63206 },
};

export const CONTENT_PILLARS = {
  vibeCoding: { name: 'Vibe Coding', emoji: '⚡', color: '#8b5cf6' },
  n8nAutomation: { name: 'n8n Automation', emoji: '🤖', color: '#06b6d4' },
  ghlSaas: { name: 'GHL SaaS', emoji: '🎯', color: '#10b981' },
  controversy: { name: 'Hot Takes', emoji: '🔥', color: '#ef4444' },
  socialProof: { name: 'Results/Income', emoji: '💰', color: '#f59e0b' },
  hybrid: { name: 'Power Plays', emoji: '🚀', color: '#ec4899' },
};

// ============================================
// VIDEO SCRIPTS - All 25 from the strategy
// ============================================
export const VIDEO_SCRIPTS = [
  // PILLAR 1: VIBE CODING
  {
    id: 'v1',
    priority: 1,
    pillar: 'vibeCoding',
    title: 'I built a $10K SaaS app in 3 days using Claude Code',
    hook: "I built a $10K SaaS app in 3 days using Claude Code. No team. No framework knowledge. Just vibes.",
    platform: ['youtube', 'tiktok', 'instagram'],
    duration: '10-12 min (YouTube) / 60s cuts',
    format: 'Screen recording timelapse + face cam reaction',
    script: `[HOOK - 5 seconds]
"I built a $10K SaaS app in 3 days using Claude Code. No team. No framework knowledge. Just vibes."

[Show blank terminal]

[DAY 1 - Title Card]
"Alright, day one. I have an idea for a client management dashboard. Let's see what Claude Code can do."

[Timelapse of Claude Code generating code - 2 minutes]
Show: Terminal flying with code generation, multiple files being created

[DAY 2 - Title Card]
"Day two. The backend is DONE. Now let's build the frontend."

[Show React components being generated]
"Claude Code just built 15 React components in 20 minutes. This would've taken a week manually."

[DAY 3 - Title Card]
"Final day. Time to connect payments and deploy."

[Show Stripe integration]
"Watch this - I'm telling Claude Code to add Stripe subscriptions..."

[Show Stripe test payment going through]
"BOOM. Payment received. The app is LIVE."

[CONCLUSION]
"3 days. Zero employees. $0 in framework costs. The future of building is HERE."

[CTA]
"I build these for clients. Link in bio for a free strategy call."`,
    cta: "I build these for clients. Link in bio for a free strategy call.",
    viralityScore: 5,
    hashtags: ['#vibecoding', '#claudecode', '#saas', '#nocode', '#ai', '#entrepreneur', '#startup'],
    thumbnail: 'SaaS dashboard with "$10K" and "3 Days" overlay'
  },
  {
    id: 'v2',
    priority: 5,
    pillar: 'vibeCoding',
    title: 'Claude Code vs Cursor AI — 30 day honest comparison',
    hook: "Claude Code vs Cursor AI — I tested both for 30 days. Here's the HONEST truth no one will tell you.",
    platform: ['youtube', 'tiktok'],
    duration: '12-15 min (YouTube)',
    format: 'Talking head + split-screen comparisons',
    script: `[HOOK]
"Claude Code vs Cursor AI — I tested both for 30 days. Here's the HONEST truth no one will tell you."

[INTRO]
"I've been using BOTH of these tools daily for client projects. Not toy demos - REAL production code. Let me break down what I found."

[SECTION 1: SPEED]
"First, speed. Cursor feels faster because of the IDE integration. But Claude Code? Once it gets going, it DEMOLISHES multi-file tasks."

[Show side by side comparison]

[SECTION 2: TOKEN EFFICIENCY]
"Here's what blew my mind. Claude Code uses 5.5x FEWER tokens than Cursor for the same tasks. That's not a typo. 5.5 times less."

[Show stats on screen]

[SECTION 3: CODE QUALITY]
"Code quality - Claude Code produces 30% less rework. The code is cleaner, better documented, and follows best practices automatically."

[SECTION 4: THE CONTROVERSY]
"But here's what NOBODY is talking about..."
"Anthropic RESTRICTED the Opus model from third-party tools like Cursor. Developers are FURIOUS."
"This means if you want the BEST Claude model, you HAVE to use Claude Code."

[VERDICT]
"My verdict? For quick edits - Cursor. For building entire features? Claude Code wins. Every. Single. Time."

[CTA]
"Comment which one YOU'RE using. I'll review your setup for free."`,
    cta: "Comment which one YOU'RE using. I'll review your setup for free.",
    viralityScore: 5,
    hashtags: ['#claudecode', '#cursor', '#ai', '#coding', '#developer', '#comparison'],
    thumbnail: 'Claude Code logo vs Cursor logo with VS in middle'
  },
  {
    id: 'v3',
    priority: 11,
    pillar: 'vibeCoding',
    title: 'Google Antigravity just launched. Is Claude Code DEAD?',
    hook: "Google Antigravity just launched. Is Claude Code DEAD? Let me show you...",
    platform: ['youtube', 'tiktok'],
    duration: '8-10 min (YouTube)',
    format: 'Screen recording + face cam, documentary style',
    script: `[HOOK]
"Google Antigravity just launched. Is Claude Code DEAD? Let me show you..."

[INTRO]
"Google just dropped Antigravity — an AI-first IDE powered by Gemini 3. This is Claude Code's biggest competitor yet."

[FEATURE WALKTHROUGH]
"Let me walk you through what Antigravity can do..."
[Show features: agent-first design, multi-model support, cloud integration]

[BUILD TEST]
"Okay, here's the real test. I'm going to build the SAME mini-app in both Claude Code AND Antigravity."

[Side by side build - 3 minutes]

[COMPARISON]
"Speed: Antigravity was slightly faster in the IDE"
"Code quality: Claude Code produced cleaner output"
"Context understanding: Claude Code wins - it understood my entire codebase"

[VERDICT]
"Is Claude Code dead? Absolutely NOT. But Antigravity is a serious contender."
"Here's which one I'm using for CLIENT projects now..."

[CTA]
"Subscribe — I'm testing every new AI coding tool so you don't have to."`,
    cta: "Subscribe — I'm testing every new AI coding tool so you don't have to.",
    viralityScore: 5,
    hashtags: ['#antigravity', '#google', '#claudecode', '#ai', '#coding', '#gemini'],
    thumbnail: 'Antigravity vs Claude Code with "DEAD?" text'
  },
  {
    id: 'v4',
    priority: 15,
    pillar: 'vibeCoding',
    title: "I'm a web developer. AI just made me 10x faster",
    hook: "I'm a web developer. AI just made me 10x faster. Here's my exact stack.",
    platform: ['youtube'],
    duration: '10 min',
    format: 'Screen recording walkthrough, calm dev vlog energy',
    script: `[HOOK]
"I'm a web developer. AI just made me 10x faster. Here's my exact stack."

[INTRO]
"I used to spend 2 weeks on a client website. Now it takes 2 days. Here's exactly what changed."

[STACK BREAKDOWN]
"Tool 1: Claude Code for backend logic"
[Show Claude Code generating API routes]

"Tool 2: Antigravity for frontend components"
[Show Antigravity building React components]

"Tool 3: n8n for connecting everything"
[Show n8n workflow]

[REAL CLIENT PROJECT]
"Let me show you a real client project..."
[Show website, explain what was built]

[TIME TRACKING]
"Before AI: 80 hours average"
"After AI: 16 hours average"
"That's a 5x improvement. And the code quality is BETTER."

[CTA]
"Want me to build YOUR app with this stack? DM 'VIBE' on Instagram."`,
    cta: "Want me to build YOUR app with this stack? DM 'VIBE' on Instagram.",
    viralityScore: 4,
    hashtags: ['#webdev', '#ai', '#developer', '#productivity', '#claudecode', '#stack'],
    thumbnail: 'Developer desk with "10x FASTER" overlay'
  },
  {
    id: 'v5',
    priority: 2,
    pillar: 'vibeCoding',
    title: 'Stop paying developers $150/hour (Vibe Coding in 60 seconds)',
    hook: "Stop paying developers $150/hour. Here's what I use instead.",
    platform: ['tiktok', 'instagram', 'youtube'],
    duration: '60 seconds',
    format: 'Fast-paced, text overlay, vertical video',
    script: `[HOOK - 3 seconds]
"Stop paying developers $150/hour. Here's what I use instead."

[TEXT ON SCREEN]
"Traditional dev: $150/hr, 3 months, $50K"

[TRANSITION]
"Vibe Coding with Claude Code:"

[TEXT ON SCREEN]
"$3K, 3 days"

[SCREEN RECORDING - 20 seconds]
Quick cuts of an app being built in Claude Code

[SHOW WORKING APP - 10 seconds]
"This is the finished product. Built in 72 hours."

[CONCLUSION]
"This is the future and it's already here."

[CTA]
"Follow for more Vibe Coding content. Link in bio for free consultation."`,
    cta: "Follow for more Vibe Coding content. Link in bio for free consultation.",
    viralityScore: 5,
    hashtags: ['#vibecoding', '#nocode', '#ai', '#entrepreneur', '#startup', '#developer'],
    thumbnail: '$150/hr crossed out, $3K highlighted'
  },
  {
    id: 'v6',
    priority: 16,
    pillar: 'vibeCoding',
    title: '7 Claude Code Skills That Make You UNSTOPPABLE',
    hook: "7 Claude Code Skills That Make You UNSTOPPABLE (Plug-N-Play)",
    platform: ['youtube'],
    duration: '15 min',
    format: 'Listicle tutorial, screen recording',
    script: `[HOOK]
"7 Claude Code Skills That Make You UNSTOPPABLE"

[INTRO]
"These 7 skills let me charge $5K per project. Let me show you each one."

[SKILL 1: CLAUDE.md architecture files]
"First, CLAUDE.md files. This is how you give Claude Code context about your entire project..."

[SKILL 2: MCP server setup]
"MCP servers let Claude Code connect to external tools..."

[SKILL 3: Multi-file refactoring]
"Watch Claude Code refactor 10 files simultaneously..."

[SKILL 4: Automated testing]
"Claude Code writes tests automatically..."

[SKILL 5: Git integration]
"It commits, branches, and manages version control..."

[SKILL 6: Debugging loops]
"When something breaks, Claude Code fixes it in a loop..."

[SKILL 7: Deployment pipelines]
"From code to production in one command..."

[CONCLUSION]
"Master these 7 skills and you're unstoppable."

[CTA]
"Download my Claude Code cheat sheet — link in description."`,
    cta: "Download my Claude Code cheat sheet — link in description.",
    viralityScore: 4,
    hashtags: ['#claudecode', '#ai', '#coding', '#skills', '#tutorial', '#developer'],
    thumbnail: '7 Skills with Claude Code logo'
  },

  // PILLAR 2: N8N AUTOMATION
  {
    id: 'v7',
    priority: 3,
    pillar: 'n8nAutomation',
    title: 'This n8n workflow replaced a $5,000/month employee',
    hook: "This n8n workflow replaced a $5,000/month employee. I'll show you exactly how.",
    platform: ['youtube', 'tiktok'],
    duration: '12-15 min (YouTube)',
    format: 'Screen recording walkthrough with face cam',
    script: `[HOOK]
"This n8n workflow replaced a $5,000/month employee. I'll show you exactly how."

[PROBLEM]
"A client was paying $5K/month for someone to manually:
- Process leads from 3 different sources
- Send personalized follow-up emails
- Update spreadsheets
- Create weekly reports"

[SOLUTION INTRO]
"I built this n8n workflow in 4 hours. It does ALL of that. Automatically."

[BUILD WALKTHROUGH]
"Let me show you exactly how it works..."

[Node 1: Webhook Trigger]
"Leads come in from the website, Facebook, and Google Ads..."

[Node 2: GPT-4 Integration]
"GPT-4 analyzes the lead and writes a personalized email..."

[Node 3: CRM Update]
"Lead goes into the CRM with all the data..."

[Node 4: Automated Report]
"Every Friday, it generates a report and sends it to the client..."

[COST COMPARISON]
"Previous cost: $5,000/month"
"n8n self-hosted: $0/month"

[CTA]
"Book a free automation audit. I'll find YOUR $5K/month savings."`,
    cta: "Book a free automation audit. I'll find YOUR $5K/month savings.",
    viralityScore: 5,
    hashtags: ['#n8n', '#automation', '#workflow', '#business', '#productivity', '#ai'],
    thumbnail: '$5K/month employee vs n8n workflow'
  },
  {
    id: 'v8',
    priority: 17,
    pillar: 'n8nAutomation',
    title: 'n8n vs Zapier vs Make — The REAL truth in 2026',
    hook: "n8n vs Zapier vs Make — The REAL truth in 2026 (I've used all 3 for clients)",
    platform: ['youtube'],
    duration: '15-20 min',
    format: 'Comparison + live demo',
    script: `[HOOK]
"n8n vs Zapier vs Make — The REAL truth in 2026. I've used all 3 for paying clients. Here's what actually matters."

[SECTION 1: PRICING]
"Let's start with pricing because this is where Zapier gets UGLY."
[Show Zapier per-task fees - nightmare scenario]
"Client was paying $300/month for BASIC automations"
[Show n8n self-hosted: $0]

[SECTION 2: EASE OF USE]
"Make has the best visual builder"
"Zapier is the simplest to learn"
"n8n has the steepest learning curve BUT the most power"

[SECTION 3: LIVE DEMO]
"Let me build the SAME workflow in all 3..."
[Build lead capture -> email -> CRM in each]

[SECTION 4: AI CAPABILITIES]
"Here's where n8n DESTROYS the competition..."
[Show AI agent workflows in n8n]

[VERDICT]
"For beginners: Make"
"For simple stuff: Zapier (if money isn't an issue)"
"For serious business: n8n. Every time."

[CTA]
"Tell me in the comments which one you use. I'll reply with specific advice."`,
    cta: "Tell me in the comments which one you use. I'll reply with specific advice.",
    viralityScore: 5,
    hashtags: ['#n8n', '#zapier', '#make', '#automation', '#comparison', '#business'],
    thumbnail: 'n8n vs Zapier vs Make logos'
  },
  {
    id: 'v9',
    priority: 7,
    pillar: 'n8nAutomation',
    title: 'I built an AI agent that creates content automatically',
    hook: "I built an AI agent in n8n that finds viral content ideas, writes scripts, and schedules posts — AUTOMATICALLY.",
    platform: ['youtube', 'tiktok'],
    duration: '18-20 min (YouTube)',
    format: 'Full tutorial, screen recording',
    script: `[HOOK]
"I built an AI agent in n8n that finds viral content ideas, writes scripts, and schedules posts — AUTOMATICALLY."

[INTRO]
"This AI agent runs every morning at 6am. By the time I wake up, I have 7 social media posts ready."

[BUILD WALKTHROUGH]

[Node 1: Scheduled Trigger]
"Every day at 6am, this workflow kicks off..."

[Node 2: YouTube Trending API]
"It scrapes YouTube for trending topics in my niche..."

[Node 3: GPT-4 Analysis]
"GPT-4 analyzes the trends and picks the best content angles..."

[Node 4: Script Generation]
"It writes the actual post content for each platform..."

[Node 5: Image Generation]
"DALL-E creates the graphics..."

[Node 6: Scheduling]
"Buffer API schedules everything..."

[LIVE DEMO]
"Let me run it right now and show you the output..."

[CTA]
"I set this up for businesses. DM 'AGENT' or book a free call."`,
    cta: "I set this up for businesses. DM 'AGENT' or book a free call.",
    viralityScore: 5,
    hashtags: ['#n8n', '#aiagent', '#contentcreation', '#automation', '#socialmedia'],
    thumbnail: 'AI Agent with social media icons'
  },
  {
    id: 'v10',
    priority: 18,
    pillar: 'n8nAutomation',
    title: '5 n8n automations every business needs in 2026',
    hook: "5 n8n automations every business needs in 2026 (copy these for free)",
    platform: ['youtube', 'tiktok'],
    duration: '10 min (YouTube) / 5 separate shorts',
    format: 'Listicle, screen recording, fast-paced',
    script: `[HOOK]
"5 n8n automations every business needs in 2026. Copy these for free."

[AUTOMATION 1: Lead Capture]
"Lead capture → CRM → auto-email"
[Quick build - 2 min]

[AUTOMATION 2: Invoice Generation]
"Deal closes → Invoice generated → Sent automatically"
[Quick build - 2 min]

[AUTOMATION 3: Client Onboarding]
"New client → Welcome sequence → Task creation"
[Quick build - 2 min]

[AUTOMATION 4: Social Monitoring]
"Brand mention → AI analyzes sentiment → Auto-response"
[Quick build - 2 min]

[AUTOMATION 5: Weekly KPI Dashboard]
"Every Monday → Pull all data → Generate report → Send to team"
[Quick build - 2 min]

[CONCLUSION]
"All of these are FREE to run on self-hosted n8n."

[CTA]
"Which one do you want a full tutorial on? Comment below."`,
    cta: "Which one do you want a full tutorial on? Comment below.",
    viralityScore: 4,
    hashtags: ['#n8n', '#automation', '#business', '#free', '#tutorial', '#productivity'],
    thumbnail: '5 Automations with n8n logo'
  },
  {
    id: 'v11',
    priority: 19,
    pillar: 'n8nAutomation',
    title: "I automated a client's entire business in 48 hours",
    hook: "I automated a client's entire business in 48 hours. Here's the before and after.",
    platform: ['youtube', 'tiktok'],
    duration: '8-12 min (YouTube)',
    format: 'Documentary-style, before/after, client interview clip',
    script: `[HOOK]
"I automated a client's entire business in 48 hours. Here's the before and after."

[THE BEFORE]
"This is what their operation looked like..."
- Manual spreadsheets everywhere
- Leads slipping through cracks
- 4 hours a day on repetitive tasks
- Chaos

[THE CHALLENGE]
"I had 48 hours to fix everything."

[TIMELAPSE]
[Show building in n8n - 1 minute timelapse]

[THE BUILD]
"Node by node, I built:"
- Lead capture automation
- Email sequences
- CRM pipeline
- Invoice generation
- Reporting dashboard

[THE AFTER]
"Here's what it looks like now..."
- Automated dashboard
- Leads flowing in automatically
- Zero manual work
- Client has 4 extra hours per day

[CLIENT REACTION]
[Show WhatsApp voice note or video testimonial]

[CTA]
"Want the same transformation? We only take 5 clients per month. Link in bio."`,
    cta: "Want the same transformation? We only take 5 clients per month. Link in bio.",
    viralityScore: 5,
    hashtags: ['#automation', '#business', '#transformation', '#n8n', '#clientresults'],
    thumbnail: 'Before/After split with chaos vs organized'
  },

  // PILLAR 3: GHL SAAS
  {
    id: 'v12',
    priority: 6,
    pillar: 'ghlSaas',
    title: 'How I replaced 10 marketing tools with ONE platform',
    hook: "How I replaced 10 marketing tools with ONE platform (and saved my client $487/month)",
    platform: ['youtube', 'tiktok'],
    duration: '10 min (YouTube)',
    format: 'Talking head + screen recording',
    script: `[HOOK]
"How I replaced 10 marketing tools with ONE platform and saved my client $487/month."

[THE PROBLEM]
"Here are the 10 tools they were paying for..."
[Show logos with prices stacking up]
- Mailchimp: $50
- Calendly: $15
- ClickFunnels: $147
- Zendesk: $89
- ActiveCampaign: $79
- And 5 more...
"Total: $487/month"

[THE SOLUTION]
"All of this is GONE now."
[Cross out all logos]

[GHL WALKTHROUGH]
"Welcome to GoHighLevel."
- CRM: Check
- Email marketing: Check
- SMS: Check
- Funnels: Check
- Calendar booking: Check
- Reviews: Check
- Chat widget: Check
- And more...

[BONUS]
"And here's the kicker - GHL's AI Employee can handle customer support automatically."

[PRICING]
"GHL: $97/month. Everything included."

[CTA]
"I set up GHL for businesses. Book a free demo call — link in description."`,
    cta: "I set up GHL for businesses. Book a free demo call — link in description.",
    viralityScore: 5,
    hashtags: ['#gohighlevel', '#ghl', '#marketing', '#saas', '#business', '#automation'],
    thumbnail: '10 tools crossed out, GHL highlighted'
  },
  {
    id: 'v13',
    priority: 20,
    pillar: 'ghlSaas',
    title: "GoHighLevel's AI Employee just changed EVERYTHING",
    hook: "GoHighLevel's AI Employee just changed EVERYTHING. Here's what it can do.",
    platform: ['youtube', 'tiktok'],
    duration: '10 min (YouTube)',
    format: 'Demo + reaction style',
    script: `[HOOK]
"GoHighLevel's AI Employee just changed EVERYTHING. Here's what it can do."

[INTRO]
"GHL just released an AI that can handle your entire customer support, book appointments, and respond to reviews. Let me show you."

[DEMO 1: Customer Support]
"Watch this - a customer texts in with a question..."
[Show AI handling the conversation naturally]
"It answered, offered a solution, and asked if they need anything else. ALL automatically."

[DEMO 2: Appointment Booking]
"Now someone wants to book a call..."
[Show AI booking the appointment]
"It checked availability, booked the slot, sent confirmation."

[DEMO 3: Review Response]
"A new Google review comes in..."
[Show AI responding to the review]
"Professional, personalized, done in seconds."

[IMPACT]
"This is replacing $3K/month virtual assistants."

[SETUP]
"Let me show you how to set it up..."
[Quick setup walkthrough]

[CTA]
"Want me to set this up for your business? Comment 'AI' and I'll DM you."`,
    cta: "Want me to set this up for your business? Comment 'AI' and I'll DM you.",
    viralityScore: 5,
    hashtags: ['#gohighlevel', '#aiemployee', '#automation', '#business', '#ai', '#customerservice'],
    thumbnail: 'GHL AI Employee robot icon'
  },
  {
    id: 'v14',
    priority: 21,
    pillar: 'ghlSaas',
    title: 'The $10K/month GHL SaaS agency model explained',
    hook: "The $10K/month GHL SaaS agency model — explained in 8 minutes",
    platform: ['youtube'],
    duration: '8-10 min',
    format: 'Whiteboard/screen recording explainer',
    script: `[HOOK]
"What if I told you that you could charge 10 businesses $997/month each using software you didn't even build?"

[INTRO]
"This is the GHL SaaS agency model. Let me break it down."

[THE MODEL]
"GoHighLevel has a SaaS mode that lets you white-label the entire platform."

[STEP 1: WHITE LABELING]
"You put YOUR brand on it. Your logo, your domain, your name."

[STEP 2: SNAPSHOTS]
"You create industry-specific templates called 'snapshots'..."
- Real estate snapshot
- Dental practice snapshot
- Fitness studio snapshot

[STEP 3: PRICING]
"You charge clients $297-$997/month for access to YOUR platform."

[STEP 4: AUTOMATION BEHIND]
"Here's where I come in - I BUILD the automations that make the platform valuable."

[THE MATH]
"10 clients x $997 = $9,970/month"
"GHL cost: $497/month"
"Profit: $9,473/month"

[CTA]
"I build white-label GHL setups for agencies. DM 'SAAS' for details."`,
    cta: "I build white-label GHL setups for agencies. DM 'SAAS' for details.",
    viralityScore: 4,
    hashtags: ['#gohighlevel', '#saas', '#agency', '#business', '#entrepreneur', '#income'],
    thumbnail: '$10K/month with GHL logo'
  },
  {
    id: 'v15',
    priority: 10,
    pillar: 'ghlSaas',
    title: 'I connected GoHighLevel to n8n and created a MONSTER',
    hook: "I connected GoHighLevel to n8n and created a MONSTER lead machine. Here's how.",
    platform: ['youtube'],
    duration: '15-18 min',
    format: 'Full tutorial walkthrough',
    script: `[HOOK]
"I connected GoHighLevel to n8n and created a MONSTER lead machine. Here's how."

[INTRO]
"GHL handles CRM. n8n handles the AI brain. Together? Unstoppable."

[ARCHITECTURE]
[Show diagram]
"Here's how it all connects..."

[BUILD WALKTHROUGH]

[Step 1: GHL Form]
"Lead fills out GHL form..."

[Step 2: n8n Webhook]
"Webhook catches the submission..."

[Step 3: AI Scoring]
"GPT-4 analyzes and scores the lead 1-100..."

[Step 4: AI Follow-up]
"AI writes personalized follow-up email..."

[Step 5: Pipeline Update]
"Lead pushed to correct GHL pipeline stage..."

[Step 6: Assignment]
"Auto-assigned to sales rep based on lead score..."

[Step 7: SMS Trigger]
"GHL sends SMS to sales rep: 'Hot lead incoming!'"

[RESULT]
"From form fill to sales notification in under 60 seconds. All automated."

[CTA]
"This exact setup is available for my clients. Book a strategy call."`,
    cta: "This exact setup is available for my clients. Book a strategy call.",
    viralityScore: 5,
    hashtags: ['#gohighlevel', '#n8n', '#automation', '#leads', '#sales', '#crm'],
    thumbnail: 'GHL + n8n = Monster Lead Machine'
  },

  // PILLAR 4: CONTROVERSY
  {
    id: 'v16',
    priority: 8,
    pillar: 'controversy',
    title: 'Traditional web developers are DONE',
    hook: "Traditional web developers are DONE. (And they know it.)",
    platform: ['tiktok', 'instagram'],
    duration: '60-90 seconds',
    format: 'Talking head, passionate delivery, face-to-camera',
    script: `[HOOK - INTENSE]
"Traditional web developers are DONE. And they know it."

[THE PROOF]
"I just built what a dev team quoted me $50K and 3 months for..."
"In 3 days..."
"For $3K..."
"Using Vibe Coding with Claude Code."

[THE DATA]
"And before you say 'but the code quality'—"
"Claude Code produces 30% LESS rework than human developers."
[Point to stat on screen]

[THE REALITY]
"The question isn't IF AI replaces traditional devs."
"It's WHEN."

[THE NUANCE]
"Now look—smart devs are USING these tools."
"The ones who adapt will thrive."
"The ones who resist? They'll be left behind."

[CTA]
"Agree or disagree? Comment below. Follow for more AI reality checks."`,
    cta: "Agree or disagree? Comment below. Follow for more AI reality checks.",
    viralityScore: 5,
    hashtags: ['#webdeveloper', '#ai', '#coding', '#controversy', '#tech', '#future'],
    thumbnail: 'Developer with X over face, robot replacing'
  },
  {
    id: 'v17',
    priority: 4,
    pillar: 'controversy',
    title: 'Zapier is a SCAM and here is why',
    hook: "Zapier is a SCAM and here's why (from someone who used to recommend it)",
    platform: ['tiktok', 'youtube'],
    duration: '60s (TikTok) / 8 min (YouTube)',
    format: 'Talking head + screen recording proof',
    script: `[HOOK]
"Zapier is a SCAM and here's why."

[CREDIBILITY]
"I recommended Zapier to over 50 clients. I regret every single one."

[THE PROBLEM]
[Show Zapier pricing screen]
"Look at this - per-task fees that stack up FAST."

[REAL EXAMPLE]
"This client was paying $300/month for BASIC automations."
- Lead capture: 500 tasks
- Email sequences: 1000 tasks
- CRM updates: 500 tasks
"That's $300/month just to do what should be free."

[THE SOLUTION]
"Then I found n8n."

[COMPARISON]
"Same exact workflows."
"Self-hosted."
"$0/month."
"UNLIMITED executions. No per-task robbery."

[CTA]
"I migrate businesses from Zapier to n8n. Free audit — link in bio."`,
    cta: "I migrate businesses from Zapier to n8n. Free audit — link in bio.",
    viralityScore: 5,
    hashtags: ['#zapier', '#n8n', '#scam', '#automation', '#business', '#truth'],
    thumbnail: 'Zapier logo with SCAM stamp'
  },
  {
    id: 'v18',
    priority: 12,
    pillar: 'controversy',
    title: 'AI is NOT going to take your job',
    hook: "AI is NOT going to take your job. Here's what WILL.",
    platform: ['tiktok', 'linkedin', 'instagram'],
    duration: '90 seconds',
    format: 'Talking head, thoughtful tone',
    script: `[HOOK]
"AI is NOT going to take your job. Here's what WILL."

[THE TWIST]
"A PERSON using AI will take your job."

[THE BREAKDOWN]
"That person is using Claude Code to build apps 10x faster."

"Using n8n to automate their entire operation."

"Using GHL to run their marketing on autopilot."

"While you're still doing everything manually."

[THE INSIGHT]
"The gap isn't AI vs humans."
"It's AI-POWERED humans vs everyone else."

[CTA]
"Which side do you want to be on? I help businesses cross over. Link in bio."`,
    cta: "Which side do you want to be on? I help businesses cross over. Link in bio.",
    viralityScore: 5,
    hashtags: ['#ai', '#jobs', '#future', '#automation', '#business', '#mindset'],
    thumbnail: 'AI + Human vs Just Human'
  },

  // PILLAR 5: INCOME/SOCIAL PROOF
  {
    id: 'v19',
    priority: 22,
    pillar: 'socialProof',
    title: 'How I make money building apps I dont maintain',
    hook: "How I make money building apps I don't maintain (Vibe Coding business model)",
    platform: ['youtube', 'tiktok'],
    duration: '12 min (YouTube)',
    format: 'Talking head + whiteboard diagram',
    script: `[HOOK]
"How I make money building apps I don't maintain."

[THE MODEL]
"Here's my Vibe Coding business model..."

[STEP BY STEP]
"Step 1: Client has an idea"
"Step 2: I Vibe Code it in 3-5 days with Claude Code"
"Step 3: Charge $3K-$10K"
"Step 4: Deploy on Vercel/AWS"
"Step 5: Hand over with documentation"
"Step 6: Move to next client"

[THE KEY]
"No retainers. No maintenance. Pure build-and-ship."

[THE MATH]
[Show calendar]
"I do 4-6 of these per month."
"Average: $6K per project"
"That's $24K-$36K/month"

[WHY IT WORKS]
"Clients get a working app FAST."
"I don't get stuck maintaining old projects."
"Everyone wins."

[CTA]
"Want a Vibe Coded app? Or want to learn this model? Both links in bio."`,
    cta: "Want a Vibe Coded app? Or want to learn this model? Both links in bio.",
    viralityScore: 4,
    hashtags: ['#vibecoding', '#business', '#income', '#entrepreneur', '#apps', '#freelance'],
    thumbnail: 'Build -> Ship -> Repeat with money icons'
  },
  {
    id: 'v20',
    priority: 23,
    pillar: 'socialProof',
    title: '$0 to $8K/month with a faceless YouTube channel',
    hook: "$0 to $8K/month with a faceless YouTube channel — using n8n + AI (full breakdown)",
    platform: ['youtube', 'tiktok'],
    duration: '15 min (YouTube)',
    format: 'Revenue screenshot + system walkthrough',
    script: `[HOOK]
"$0 to $8K/month with a faceless YouTube channel. Using n8n and AI. Full breakdown."

[THE PROOF]
[Show YouTube analytics - blurred channel, real numbers]
"This channel has NEVER shown a face."
"$8,247 last month. All automated."

[THE SYSTEM]
"Let me show you exactly how it works..."

[Step 1: Trending Topic Scraper]
"n8n scrapes trending topics every day..."

[Step 2: AI Script Writer]
"GPT-4 writes the video script..."

[Step 3: AI Voiceover]
"ElevenLabs generates the voiceover..."

[Step 4: Video Assembly]
"Automated video creation with stock footage..."

[Step 5: Auto-Upload + SEO]
"Uploaded to YouTube with AI-optimized titles and descriptions..."

[LIVE DEMO]
"Let me run it right now..."
[Show workflow executing]

[CTA]
"I build automated YouTube channels. DM 'YOUTUBE' for pricing."`,
    cta: "I build automated YouTube channels. DM 'YOUTUBE' for pricing.",
    viralityScore: 5,
    hashtags: ['#youtube', '#faceless', '#automation', '#income', '#n8n', '#passiveincome'],
    thumbnail: '$8K analytics screenshot with AI icons'
  },
  {
    id: 'v21',
    priority: 24,
    pillar: 'socialProof',
    title: 'Client DM - Look what happened to their leads',
    hook: "A client DM'd me this morning. Look what happened to their leads in 30 days.",
    platform: ['tiktok', 'instagram'],
    duration: '30-45 seconds',
    format: 'Phone screen recording of DM + dashboard reveal',
    script: `[HOOK]
"A client DM'd me this morning. Look what happened to their leads."

[SHOW DM]
[Screen recording of phone]
Open DM: "Bro... look at this"
[Screenshot of GHL dashboard showing 300% increase]

[REACTION]
[Your face - genuine excitement]

[QUICK BREAKDOWN]
[Text overlay]
"What I built:"
- n8n lead gen automation
- GHL CRM setup
- AI chatbot integration

[THE RESULT]
"30 days. Same ad spend. 3x the leads."

[CTA]
"Want these results? Free strategy call — link in bio."`,
    cta: "Want these results? Free strategy call — link in bio.",
    viralityScore: 4,
    hashtags: ['#results', '#leads', '#automation', '#business', '#growth', '#testimonial'],
    thumbnail: 'DM screenshot with 300% overlay'
  },

  // PILLAR 6: HYBRID POWER PLAYS
  {
    id: 'v22',
    priority: 9,
    pillar: 'hybrid',
    title: 'SaaS + n8n + GHL in ONE WEEK',
    hook: "I Vibe Coded a SaaS app, automated it with n8n, and sold it through GHL — in ONE WEEK.",
    platform: ['youtube', 'tiktok'],
    duration: '15-20 min (YouTube)',
    format: 'Mini-documentary / vlog style, day-by-day',
    script: `[HOOK]
"I Vibe Coded a SaaS app, automated it with n8n, and sold it through GHL — in ONE WEEK."

[INTRO]
"This is my ULTIMATE showcase. All 3 pillars. One real project. Seven days."

[DAY 1]
"Day 1: Idea + architecture with Claude Code"
[Show planning, Claude Code generating structure]

[DAY 2-3]
"Days 2-3: Vibe Coding the full app"
[Timelapse of development]

[DAY 4]
"Day 4: n8n automation for onboarding + email + Stripe"
[Show n8n workflows being built]

[DAY 5]
"Day 5: GHL funnel + landing page + CRM pipeline"
[Show GHL setup]

[DAY 6]
"Day 6: Testing everything"
[Show bug fixes, final polish]

[DAY 7]
"Day 7: LAUNCH"
[Show live app, landing page, first sign-up]

[THE RESULT]
"Idea to revenue in 7 days."
[Show Stripe notification]

[CTA]
"Have a SaaS idea? I turn ideas into revenue in 7 days. Book a call."`,
    cta: "Have a SaaS idea? I turn ideas into revenue in 7 days. Book a call.",
    viralityScore: 5,
    hashtags: ['#saas', '#vibecoding', '#n8n', '#gohighlevel', '#startup', '#entrepreneur'],
    thumbnail: 'Day 1 -> Day 7 with SaaS launch'
  },
  {
    id: 'v23',
    priority: 25,
    pillar: 'hybrid',
    title: 'I gave Claude Code access to a client codebase',
    hook: "I gave Claude Code access to my client's codebase. What happened next was INSANE.",
    platform: ['youtube', 'tiktok'],
    duration: '10 min (YouTube)',
    format: 'Screen recording + face cam reaction',
    script: `[HOOK]
"I gave Claude Code access to my client's codebase. What happened next was INSANE."

[THE SETUP]
"My client had a 50,000 line codebase with bugs everywhere."
"Previous dev team had been working on it for 2 years."
"I pointed Claude Code at it."

[THE SCAN]
[Show Claude Code scanning the entire repo]
"Watch this..."
[Claude Code analyzing files]

[THE FINDINGS]
"It identified 23 bugs in the first 5 minutes."
"Suggested architecture improvements."
"Started refactoring 3 files simultaneously."

[THE INSANE PART]
[Face cam reaction - genuine amazement]
"Then it found a SECURITY VULNERABILITY the previous dev team missed for 8 MONTHS."

[THE FIX]
[Show Claude Code fixing the vulnerability]
"Fixed in 30 seconds."

[CTA]
"Need your codebase audited by AI? I do this as a service. Link in bio."`,
    cta: "Need your codebase audited by AI? I do this as a service. Link in bio.",
    viralityScore: 5,
    hashtags: ['#claudecode', '#codebase', '#bugs', '#security', '#ai', '#developer'],
    thumbnail: 'Claude Code scanning code with "INSANE" text'
  },
  {
    id: 'v24',
    priority: 13,
    pillar: 'hybrid',
    title: 'The FREE automation stack that replaces $2,000/month',
    hook: "The FREE automation stack that replaces $2,000/month in tools",
    platform: ['tiktok', 'instagram'],
    duration: '60 seconds',
    format: 'Fast listicle, text overlays, vertical',
    script: `[HOOK]
"The FREE automation stack that replaces $2,000/month in tools."

[TOOL 1]
"n8n (free, self-hosted)"
"Replaces Zapier: $300/month"

[TOOL 2]
"GHL ($97)"
"Replaces Mailchimp + Calendly + ClickFunnels: $400"

[TOOL 3]
"Claude Code ($20 API)"
"Replaces a $5K developer"

[TOOL 4]
"Ollama (free)"
"Replaces ChatGPT Pro: $200"

[THE MATH]
"Total saved: $2,000+/month"

[CTA]
"Save this. Follow for more free stacks. I set these up for businesses."`,
    cta: "Save this. Follow for more free stacks. I set these up for businesses.",
    viralityScore: 5,
    hashtags: ['#free', '#automation', '#tools', '#business', '#money', '#stack'],
    thumbnail: '$2K crossed out, FREE highlighted'
  },
  {
    id: 'v25',
    priority: 14,
    pillar: 'hybrid',
    title: 'POV: You hired a Vibe Coder',
    hook: "POV: You hired a Vibe Coder and your app went from idea to revenue in 5 days",
    platform: ['tiktok', 'instagram'],
    duration: '45-60 seconds',
    format: 'Cinematic POV, quick cuts, trending audio',
    script: `[CINEMATIC OPENING - Dramatic music]

[DAY 1]
Zoom call, you nodding
Text: "Day 1: Discovery Call"

[DAY 2]
Terminal flying with Claude Code
Text: "Day 2: Vibe Coding"

[DAY 3]
App taking shape, UI reveal
Text: "Day 3: Core Features"

[DAY 4]
n8n automations connecting
Text: "Day 4: Automation"

[DAY 5]
App LIVE
Stripe notification: "New payment received"
Text: "Day 5: Revenue"

[CLOSING]
Text: "This is what it looks like to hire SkynetLabs"

[CTA]
"Ready? Link in bio. Limited to 5 clients per month."`,
    cta: "Ready? Link in bio. Limited to 5 clients per month.",
    viralityScore: 5,
    hashtags: ['#pov', '#vibecoding', '#startup', '#entrepreneur', '#app', '#revenue'],
    thumbnail: 'POV Vibe Coder with app reveal'
  }
];

// ============================================
// SOCIAL MEDIA POSTS - Daily content
// ============================================
export const SOCIAL_POSTS = {
  linkedin: [
    {
      id: 'li1',
      pillar: 'vibeCoding',
      title: 'The Vibe Coding Revolution',
      content: `I built a $10K SaaS app in 3 days.

No team.
No framework expertise.
No $50K dev budget.

Just Claude Code and "vibes."

Here's what Vibe Coding actually means:

→ You describe WHAT you want
→ AI writes the HOW
→ You iterate until it's perfect

Traditional development:
❌ $150/hr developers
❌ 3-month timelines
❌ $50K+ budgets
❌ Endless meetings

Vibe Coding:
✅ $3K investment
✅ 3-day timeline
✅ Working product
✅ Ship and iterate

The gap between "idea" and "revenue" has never been smaller.

I'm building these for clients now.

DM me "VIBE" if you have an app idea that's been collecting dust.

Let's make it real.

#VibeCoding #ClaudeCode #AI #Startup #Entrepreneur`,
      hashtags: ['#VibeCoding', '#ClaudeCode', '#AI', '#Startup', '#Entrepreneur'],
      cta: 'DM me "VIBE" if you have an app idea',
      imagePrompt: 'Futuristic terminal with code, cyan glow, professional LinkedIn banner style'
    },
    {
      id: 'li2',
      pillar: 'n8nAutomation',
      title: 'The $5K Employee Replacement',
      content: `I just replaced a $5,000/month employee with an n8n workflow.

Before you @ me—here's the full story:

My client was paying $5K/month for someone to:
• Process leads from 3 sources
• Send personalized follow-ups
• Update spreadsheets
• Create weekly reports

I built an n8n workflow in 4 hours.

It now does ALL of that. Automatically. 24/7.

The breakdown:
→ Webhook catches leads from anywhere
→ GPT-4 writes personalized emails
→ CRM updates itself
→ Reports generate every Friday

Cost? $0/month (self-hosted n8n)

The person? Reassigned to high-value work that AI CAN'T do—building relationships and closing deals.

This isn't about replacing humans.
It's about removing robotic work FROM humans.

Want to find the $5K savings hiding in YOUR business?

Book a free automation audit. Link in comments.

#Automation #n8n #Business #Productivity #AI`,
      hashtags: ['#Automation', '#n8n', '#Business', '#Productivity', '#AI'],
      cta: 'Book a free automation audit',
      imagePrompt: 'n8n workflow diagram, clean professional style, automation nodes connected'
    },
    {
      id: 'li3',
      pillar: 'ghlSaas',
      title: '10 Tools → 1 Platform',
      content: `My client was paying $487/month for 10 different marketing tools.

Mailchimp: $50
Calendly: $15
ClickFunnels: $147
Zendesk: $89
ActiveCampaign: $79
+ 5 more...

Total: $487/month
Plus: 10 logins, 10 dashboards, 10 headaches

I migrated them to GoHighLevel.

Now they have:
✅ CRM
✅ Email marketing
✅ SMS
✅ Funnels
✅ Calendar booking
✅ Reviews
✅ Chat widget
✅ And more...

Cost: $97/month
Logins: 1
Dashboards: 1
Headaches: 0

Bonus? GHL's AI Employee handles customer support automatically.

The tool consolidation wave is HERE.

If you're still juggling 10+ subscriptions, we should talk.

#GoHighLevel #SaaS #Marketing #Business #Automation`,
      hashtags: ['#GoHighLevel', '#SaaS', '#Marketing', '#Business', '#Automation'],
      cta: 'Book a free GHL demo',
      imagePrompt: '10 marketing tool logos crossed out, GHL logo highlighted, professional style'
    },
    {
      id: 'li4',
      pillar: 'controversy',
      title: 'AI Won\'t Take Your Job',
      content: `AI is NOT going to take your job.

A person USING AI will.

Let me explain:

Right now, someone in your industry is:
→ Using Claude Code to build apps 10x faster
→ Using n8n to automate their entire operation
→ Using GHL to run marketing on autopilot

While you're still doing everything manually.

The gap isn't AI vs humans.
The gap is AI-POWERED humans vs everyone else.

Here's the uncomfortable truth:

The person who adapts to AI tools in 2026 will:
• Deliver 10x more value
• Command higher rates
• Work fewer hours
• Win more clients

The person who resists will wonder what happened.

Which side do you want to be on?

I help businesses cross over to the AI-powered side.

DM me "CROSS" to start.

#AI #Future #Business #Automation #Mindset`,
      hashtags: ['#AI', '#Future', '#Business', '#Automation', '#Mindset'],
      cta: 'DM me "CROSS" to start',
      imagePrompt: 'Human + AI collaboration, futuristic professional style, empowering visual'
    },
    {
      id: 'li5',
      pillar: 'socialProof',
      title: 'Client Results: 3x Leads',
      content: `A client DM'd me this morning with this screenshot.

30 days ago: 47 leads/month
Today: 156 leads/month

Same ad spend. 3x the results.

What changed?

I built them a complete automation system:

1. n8n Lead Scoring
Every lead gets scored 1-100 by AI instantly.
High scores? Instant SMS alert to sales.

2. GHL CRM Pipeline
Leads flow into the right stage automatically.
No manual data entry. Ever.

3. AI Chatbot
Answers questions 24/7.
Books appointments while the team sleeps.

4. Automated Follow-ups
Personalized sequences based on behavior.
No one falls through the cracks.

The result? 3x leads with ZERO additional work.

Want to see what's possible for your business?

Free strategy call. Link in comments.

#Results #Leads #Automation #Growth #Business`,
      hashtags: ['#Results', '#Leads', '#Automation', '#Growth', '#Business'],
      cta: 'Free strategy call',
      imagePrompt: 'Dashboard showing 300% growth, professional analytics style, green upward trend'
    }
  ],
  twitter: [
    {
      id: 'tw1',
      pillar: 'vibeCoding',
      title: 'Vibe Coding Thread',
      content: `I built a $10K SaaS app in 3 days using Claude Code.

No team. No framework knowledge.

Just vibes.

Here's exactly how 🧵`,
      hashtags: ['#VibeCoding', '#ClaudeCode', '#AI'],
      cta: 'Follow for more',
      thread: [
        'Traditional dev quote: $50K, 3 months.\n\nVibe Coding: $3K, 3 days.\n\nSame result. 1/10th the cost.',
        'Day 1:\n→ Open Claude Code\n→ Describe the app in plain English\n→ Watch it generate the entire backend\n\nTime: 4 hours',
        'Day 2:\n→ Frontend time\n→ "Build me a React dashboard with..."\n→ 15 components generated\n\nTime: 5 hours',
        'Day 3:\n→ Stripe integration\n→ Deployment\n→ First test payment\n\n$10K app. Live. Done.',
        'The future of building:\n\n❌ $150/hr developers\n❌ 3-month timelines\n❌ $50K budgets\n\n✅ Claude Code\n✅ 3 days\n✅ $3K',
        'I\'m building these for clients now.\n\nDM "VIBE" if you have an app idea.\n\nLet\'s make it real.'
      ]
    },
    {
      id: 'tw2',
      pillar: 'controversy',
      title: 'Zapier Hot Take',
      content: `Zapier is a scam.

I recommended it to 50+ clients.

I regret every single one.

Here's why n8n is better in every way 🧵`,
      hashtags: ['#Zapier', '#n8n', '#Automation'],
      cta: 'Free migration audit in bio',
      thread: [
        'Zapier pricing:\n\nPer-task fees that stack up FAST.\n\nClient was paying $300/month for BASIC automations.',
        'Same workflows in n8n:\n\n→ Self-hosted\n→ $0/month\n→ UNLIMITED executions\n\nNo per-task robbery.',
        'But it\'s not just price.\n\nn8n can do things Zapier literally cannot:\n\n→ AI agents\n→ Custom code nodes\n→ Self-hosting\n→ Full data control',
        'I migrate businesses from Zapier to n8n.\n\nFree audit to show you exactly how much you\'ll save.\n\nLink in bio.'
      ]
    },
    {
      id: 'tw3',
      pillar: 'n8nAutomation',
      title: 'n8n Quick Win',
      content: `This n8n workflow saves me 2 hours every day:

→ Scrapes trending topics
→ AI writes content ideas
→ Generates 7 posts
→ Schedules automatically

Total setup time: 30 minutes.

Want the template? Reply "SEND"`,
      hashtags: ['#n8n', '#Automation', '#ContentCreation'],
      cta: 'Reply "SEND" for template'
    },
    {
      id: 'tw4',
      pillar: 'ghlSaas',
      title: 'GHL Math',
      content: `The GHL SaaS model:

→ White-label the platform
→ Charge 10 clients $997/month each
→ GHL cost: $497/month
→ Profit: $9,473/month

I build the automations.
You sell the platform.

DM "SAAS" for details.`,
      hashtags: ['#GoHighLevel', '#SaaS', '#Income'],
      cta: 'DM "SAAS" for details'
    },
    {
      id: 'tw5',
      pillar: 'hybrid',
      title: 'Free Stack',
      content: `The FREE stack that replaces $2,000/month in tools:

n8n (free) → Zapier ($300)
GHL ($97) → 4 tools ($400)
Claude Code ($20) → $5K developer
Ollama (free) → ChatGPT ($200)

Save this. You're welcome.`,
      hashtags: ['#Free', '#Tools', '#Stack'],
      cta: 'Save this tweet'
    }
  ],
  instagram: [
    {
      id: 'ig1',
      pillar: 'vibeCoding',
      title: 'Vibe Coding Carousel',
      content: `Traditional dev: $50K, 3 months
Vibe Coding: $3K, 3 days

Swipe to see how I built a $10K SaaS app using just Claude Code →`,
      hashtags: ['#vibecoding', '#claudecode', '#ai', '#saas', '#entrepreneur', '#startup', '#tech', '#coding', '#nocode', '#business'],
      cta: 'Link in bio for free consultation',
      carousel: [
        'Slide 1: The Problem - Traditional Development\n$150/hr developers\n3+ month timelines\n$50K+ budgets\nEndless revisions',
        'Slide 2: The Solution - Vibe Coding\nDescribe what you want\nAI writes the code\nIterate until perfect\nShip in days',
        'Slide 3: Day 1 Results\nEntire backend generated\n15 API endpoints\nDatabase schema\nAuthentication system',
        'Slide 4: Day 2 Results\n15 React components\nFull dashboard UI\nResponsive design\nSmooth animations',
        'Slide 5: Day 3 Results\nStripe payments live\nDeployed to production\nFirst test payment received\nApp is LIVE',
        'Slide 6: The Math\nTraditional: $50K\nVibe Coding: $3K\nSavings: $47K\nTime saved: 85 days',
        'Slide 7: Ready to build?\nDM "VIBE" for a free consultation\nLet\'s turn your idea into reality'
      ]
    },
    {
      id: 'ig2',
      pillar: 'n8nAutomation',
      title: 'Automation Before/After',
      content: `BEFORE: 4 hours of manual work daily
AFTER: Fully automated with n8n

This workflow replaced a $5K/month employee. Here's how →`,
      hashtags: ['#automation', '#n8n', '#business', '#productivity', '#workflow', '#ai', '#efficiency', '#entrepreneur', '#tech', '#growth'],
      cta: 'Free automation audit - link in bio',
      carousel: [
        'Slide 1: The Before\n❌ Manual lead processing\n❌ Copy-paste emails\n❌ Spreadsheet updates\n❌ 4 hours/day wasted',
        'Slide 2: The Workflow\n✅ Webhook catches leads\n✅ AI writes emails\n✅ CRM auto-updates\n✅ Reports generate automatically',
        'Slide 3: The Savings\nPrevious cost: $5,000/month\nn8n cost: $0/month (self-hosted)\nYearly savings: $60,000',
        'Slide 4: Want to automate?\nFree automation audit\nLink in bio'
      ]
    },
    {
      id: 'ig3',
      pillar: 'ghlSaas',
      title: '10 Tools to 1',
      content: `My client was paying $487/month for 10 marketing tools.

I migrated them to ONE platform.

New cost: $97/month 💰

Swipe to see the breakdown →`,
      hashtags: ['#gohighlevel', '#marketing', '#saas', '#business', '#tools', '#automation', '#entrepreneur', '#savings', '#crm', '#growth'],
      cta: 'Book a free GHL demo - link in bio',
      carousel: [
        'Slide 1: The Tool Stack\nMailchimp: $50\nCalendly: $15\nClickFunnels: $147\nZendesk: $89\nActiveCampaign: $79\n+ 5 more = $487/month',
        'Slide 2: The Problem\n10 different logins\n10 different dashboards\n10 monthly invoices\nNothing talks to each other',
        'Slide 3: The Solution\nGoHighLevel: $97/month\nCRM ✓\nEmail ✓\nSMS ✓\nFunnels ✓\nCalendar ✓\nReviews ✓\nChat ✓',
        'Slide 4: The Savings\nOld cost: $487/month\nNew cost: $97/month\nYearly savings: $4,680',
        'Slide 5: Bonus\nGHL AI Employee handles customer support automatically 🤖',
        'Slide 6: Ready to consolidate?\nBook a free GHL demo\nLink in bio'
      ]
    }
  ],
  tiktok: [
    {
      id: 'tt1',
      pillar: 'vibeCoding',
      title: 'Stop Paying Devs $150/hr',
      content: `Stop paying developers $150/hour. Here's what I use instead. #vibecoding #claudecode #ai #nocode #entrepreneur #startup #coding #tech`,
      hashtags: ['#vibecoding', '#claudecode', '#ai', '#nocode', '#entrepreneur', '#startup', '#coding', '#tech'],
      cta: 'Link in bio for free consultation',
      duration: '60 seconds',
      script: 'Stop paying developers $150/hour. Traditional dev: $150/hr, 3 months, $50K. Vibe Coding with Claude Code: $3K, 3 days. [Show app being built] This is the future and it\'s already here. Follow for more Vibe Coding content.'
    },
    {
      id: 'tt2',
      pillar: 'controversy',
      title: 'Traditional Devs Are DONE',
      content: `Traditional web developers are DONE. (And they know it.) #developer #ai #coding #tech #controversy #future #webdev`,
      hashtags: ['#developer', '#ai', '#coding', '#tech', '#controversy', '#future', '#webdev'],
      cta: 'Follow for more AI reality checks',
      duration: '60-90 seconds',
      script: 'Traditional web developers are DONE. And they know it. I just built what a dev team quoted me $50K and 3 months for... in 3 days... for $3K... using Vibe Coding with Claude Code. Claude Code produces 30% LESS rework than human developers. The question isn\'t IF AI replaces traditional devs. It\'s WHEN.'
    },
    {
      id: 'tt3',
      pillar: 'n8nAutomation',
      title: '$5K Employee Replaced',
      content: `This n8n workflow replaced a $5,000/month employee 🤯 #n8n #automation #business #workflow #ai #productivity`,
      hashtags: ['#n8n', '#automation', '#business', '#workflow', '#ai', '#productivity'],
      cta: 'Free automation audit - link in bio',
      duration: '60 seconds',
      script: 'This n8n workflow replaced a $5,000/month employee. They were manually processing leads, sending follow-ups, updating spreadsheets, creating reports. I built this in 4 hours. It does ALL of that automatically. Cost? $0/month on self-hosted n8n. Book a free automation audit.'
    },
    {
      id: 'tt4',
      pillar: 'controversy',
      title: 'Zapier is a SCAM',
      content: `Zapier is a SCAM and here's why 💀 #zapier #n8n #automation #scam #business #truth`,
      hashtags: ['#zapier', '#n8n', '#automation', '#scam', '#business', '#truth'],
      cta: 'Free migration audit - link in bio',
      duration: '60 seconds',
      script: 'Zapier is a SCAM. I recommended it to 50+ clients. I regret every single one. Look at this - per-task fees that stack up FAST. Client was paying $300/month for BASIC automations. Same workflows in n8n? Self-hosted. $0/month. UNLIMITED executions.'
    },
    {
      id: 'tt5',
      pillar: 'hybrid',
      title: 'FREE $2K Stack',
      content: `The FREE automation stack that replaces $2,000/month in tools 🔥 #free #automation #tools #business #money #stack`,
      hashtags: ['#free', '#automation', '#tools', '#business', '#money', '#stack'],
      cta: 'Save this and follow for more',
      duration: '60 seconds',
      script: 'The FREE automation stack that replaces $2,000/month in tools. n8n free replaces Zapier $300. GHL $97 replaces 4 tools $400. Claude Code $20 replaces a $5K developer. Ollama free replaces ChatGPT Pro $200. Total saved: $2,000 plus per month. Save this.'
    }
  ]
};

// ============================================
// CONTENT CALENDAR TEMPLATES
// ============================================
export const WEEKLY_SCHEDULE = {
  monday: {
    theme: 'Motivation Monday',
    platforms: ['linkedin', 'instagram'],
    contentType: 'Inspirational / Results',
    pillar: 'socialProof'
  },
  tuesday: {
    theme: 'Tutorial Tuesday',
    platforms: ['youtube', 'tiktok'],
    contentType: 'How-to / Tutorial',
    pillar: 'n8nAutomation'
  },
  wednesday: {
    theme: 'Wisdom Wednesday',
    platforms: ['linkedin', 'twitter'],
    contentType: 'Insights / Tips',
    pillar: 'vibeCoding'
  },
  thursday: {
    theme: 'Throwdown Thursday',
    platforms: ['tiktok', 'twitter'],
    contentType: 'Hot Takes / Controversy',
    pillar: 'controversy'
  },
  friday: {
    theme: 'Feature Friday',
    platforms: ['instagram', 'linkedin'],
    contentType: 'Product / Service Showcase',
    pillar: 'ghlSaas'
  },
  saturday: {
    theme: 'Story Saturday',
    platforms: ['instagram', 'tiktok'],
    contentType: 'Behind the Scenes',
    pillar: 'hybrid'
  },
  sunday: {
    theme: 'Strategy Sunday',
    platforms: ['linkedin', 'twitter'],
    contentType: 'Weekly Planning / Reflection',
    pillar: 'vibeCoding'
  }
};

// ============================================
// IMAGE TEMPLATES CONFIG
// ============================================
export const IMAGE_TEMPLATES = [
  {
    id: 'linkedin-banner',
    name: 'LinkedIn Banner',
    width: 1584,
    height: 396,
    platform: 'linkedin',
    description: 'Professional LinkedIn profile banner'
  },
  {
    id: 'twitter-header',
    name: 'Twitter/X Header',
    width: 1500,
    height: 500,
    platform: 'twitter',
    description: 'Twitter profile header image'
  },
  {
    id: 'instagram-post',
    name: 'Instagram Post',
    width: 1080,
    height: 1080,
    platform: 'instagram',
    description: 'Square Instagram feed post'
  },
  {
    id: 'instagram-story',
    name: 'Instagram/TikTok Story',
    width: 1080,
    height: 1920,
    platform: 'instagram',
    description: 'Vertical story format'
  },
  {
    id: 'youtube-thumbnail',
    name: 'YouTube Thumbnail',
    width: 1280,
    height: 720,
    platform: 'youtube',
    description: 'Video thumbnail'
  },
  {
    id: 'facebook-cover',
    name: 'Facebook Cover',
    width: 820,
    height: 312,
    platform: 'facebook',
    description: 'Facebook page cover photo'
  }
];

// ============================================
// HASHTAG SETS
// ============================================
export const HASHTAG_SETS = {
  vibeCoding: ['#vibecoding', '#claudecode', '#ai', '#coding', '#nocode', '#developer', '#startup', '#tech', '#entrepreneur', '#saas'],
  n8nAutomation: ['#n8n', '#automation', '#workflow', '#ai', '#business', '#productivity', '#nocode', '#zapier', '#make', '#efficiency'],
  ghlSaas: ['#gohighlevel', '#ghl', '#saas', '#crm', '#marketing', '#agency', '#business', '#automation', '#leads', '#sales'],
  controversy: ['#ai', '#tech', '#future', '#coding', '#developer', '#controversy', '#truth', '#business', '#mindset', '#change'],
  socialProof: ['#results', '#success', '#business', '#growth', '#income', '#entrepreneur', '#revenue', '#clients', '#transformation', '#wins'],
  hybrid: ['#automation', '#ai', '#business', '#tech', '#startup', '#entrepreneur', '#productivity', '#innovation', '#future', '#success']
};
