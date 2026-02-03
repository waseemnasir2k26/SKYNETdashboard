export const GROWTH_PLAN = {
  meta: {
    agencyName: "SkynetJoe Lab",
    owner: "Waseem Nasir",
    role: "AI Automation Specialist, Full-Stack Digital Marketer, Agency Owner",
    website: "https://skynetjoe.com/",
    youtube: "https://www.youtube.com/@Skynetlabs2k25",
    linkedin: "https://www.linkedin.com/in/waseemnasir2k26/",
    facebook: "https://web.facebook.com/skynetlabs2k25",
    twitter: "https://x.com/skynetlabs",
    goalMRR: 10000,
    totalWeeks: 24,
    totalPhases: 6
  },

  phases: [
    {
      id: 1,
      name: "Clarity + Foundation",
      shortName: "Foundation",
      theme: "Make it clear before making it loud",
      month: 1,
      weeks: [1, 2, 3, 4],
      mainGoal: "Lock positioning, offer, systems, and internal clarity",
      targetMRR: 0,
      color: "#6366f1",
      icon: "🎯",
      kpis: [
        "Clear niche + offer defined",
        "Website aligned to ONE outcome",
        "CRM + onboarding ready",
        "Zero internal confusion"
      ]
    },
    {
      id: 2,
      name: "Authority Seeding",
      shortName: "Authority",
      theme: "Trust before traffic",
      month: 2,
      weeks: [5, 6, 7, 8],
      mainGoal: "Make SkynetJoe + founder look credible and inevitable",
      targetMRR: 0,
      color: "#8b5cf6",
      icon: "📣",
      kpis: [
        "10-15 authority posts live",
        "First inbound DMs",
        "5-8 discovery calls booked",
        "External positioning clarity"
      ]
    },
    {
      id: 3,
      name: "Lead Engine Activation",
      shortName: "Lead Engine",
      theme: "Conversations over content",
      month: 3,
      weeks: [9, 10, 11, 12],
      mainGoal: "Turn attention into sales calls",
      targetMRR: 3000,
      color: "#f59e0b",
      icon: "🚀",
      kpis: [
        "15-25 sales conversations",
        "2-3 paying clients",
        "$2K-$3K MRR",
        "Objections list documented"
      ]
    },
    {
      id: 4,
      name: "Delivery & Proof",
      shortName: "Delivery",
      theme: "Results create gravity",
      month: 4,
      weeks: [13, 14, 15, 16],
      mainGoal: "Turn clients into case studies",
      targetMRR: 6000,
      color: "#10b981",
      icon: "✨",
      kpis: [
        "5-6 active clients",
        "3 strong case studies",
        "$4K-$6K MRR",
        "Social proof everywhere"
      ]
    },
    {
      id: 5,
      name: "Scale with Control",
      shortName: "Scale",
      theme: "Multiply what works",
      month: 5,
      weeks: [17, 18, 19, 20],
      mainGoal: "Increase volume without breaking systems",
      targetMRR: 8000,
      color: "#06b6d4",
      icon: "📈",
      kpis: [
        "7-8 active clients",
        "Reduced founder workload",
        "$7K-$8K MRR",
        "Systems stable"
      ]
    },
    {
      id: 6,
      name: "Stability & Authority",
      shortName: "Stability",
      theme: "From hustle to business",
      month: 6,
      weeks: [21, 22, 23, 24],
      mainGoal: "Lock $10K/month and prepare for scale",
      targetMRR: 10000,
      color: "#ec4899",
      icon: "🏆",
      kpis: [
        "$10K+ MRR",
        "Predictable pipeline",
        "Authority positioning locked",
        "Business feels calm"
      ]
    }
  ],

  weeks: [
    // Phase 1: Clarity + Foundation
    {
      number: 1,
      title: "Positioning Lock",
      phase: 1,
      description: "Define your core niche, flagship offer, and value proposition",
      tasks: [
        { id: "w1t1", title: "Finalize ONE core niche (temporary but focused)", description: "Choose from: Medical & Wellness, Home & Local Services, or Luxury & Transportation", points: 50, category: "strategy", priority: "critical" },
        { id: "w1t2", title: "Finalize ONE flagship offer (outcome-based)", description: "AI Lead & Booking Engine - Funnel + Chatbot + CRM + Follow-ups + Booking + Analytics", points: 50, category: "strategy", priority: "critical" },
        { id: "w1t3", title: "Write one-sentence value proposition", description: "We help service businesses generate consistent leads & bookings using automated funnels, AI chatbots, and content systems", points: 30, category: "strategy", priority: "high" },
        { id: "w1t4", title: "Decide pricing structure", description: "Setup: $1,000-$2,000 | Monthly: $500-$1,000", points: 30, category: "strategy", priority: "high" }
      ]
    },
    {
      number: 2,
      title: "Website & Funnel",
      phase: 1,
      description: "Align your website messaging and create your core funnel",
      tasks: [
        { id: "w2t1", title: "Simplify website messaging", description: "WHO it's for, WHAT result, HOW fast, WHAT next step", points: 40, category: "marketing", priority: "critical" },
        { id: "w2t2", title: "Create one core landing page", description: "Pain → Promise → Proof → Process → CTA flow", points: 50, category: "marketing", priority: "critical" },
        { id: "w2t3", title: "Create one CTA (Free AI Audit)", description: "Single clear call-to-action across all pages", points: 30, category: "marketing", priority: "high" },
        { id: "w2t4", title: "Setup calendar + CRM pipeline", description: "Lead → Call → Closed → Onboarding stages", points: 40, category: "operations", priority: "critical" }
      ]
    },
    {
      number: 3,
      title: "Internal Systems",
      phase: 1,
      description: "Build your operational foundation and automation systems",
      tasks: [
        { id: "w3t1", title: "Setup GoHighLevel pipelines", description: "Complete CRM pipeline configuration", points: 40, category: "operations", priority: "critical" },
        { id: "w3t2", title: "Create onboarding automation", description: "Automated client onboarding sequence", points: 50, category: "operations", priority: "high" },
        { id: "w3t3", title: "Document fulfillment SOP", description: "Step-by-step delivery process checklist", points: 40, category: "operations", priority: "high" },
        { id: "w3t4", title: "Create proposal + contract templates", description: "Professional documents ready to send", points: 30, category: "operations", priority: "medium" }
      ]
    },
    {
      number: 4,
      title: "Authority Base",
      phase: 1,
      description: "Establish your founder-first brand positioning",
      tasks: [
        { id: "w4t1", title: "Optimize LinkedIn profile", description: "AI Automation & Growth Strategist for Service Businesses", points: 40, category: "content", priority: "critical" },
        { id: "w4t2", title: "Optimize website About page", description: "Personal operator story + credibility markers", points: 30, category: "content", priority: "high" },
        { id: "w4t3", title: "Prepare 10 core content ideas", description: "Problems, Systems, Proof pillars", points: 30, category: "content", priority: "high" }
      ]
    },
    // Phase 2: Authority Seeding
    {
      number: 5,
      title: "Content Framework",
      phase: 2,
      description: "Establish your content pillars and posting rhythm",
      tasks: [
        { id: "w5t1", title: "Lock 3 content pillars", description: "Problems, Systems, Proof - your core messaging themes", points: 40, category: "content", priority: "critical" },
        { id: "w5t2", title: "Decide posting rhythm", description: "LinkedIn 4/week, Instagram 3-4/week, Facebook 3/week", points: 20, category: "content", priority: "high" },
        { id: "w5t3", title: "Create content calendar template", description: "Monday: Problems, Tuesday: Systems, Thursday: Proof, Saturday: Authority", points: 30, category: "content", priority: "high" }
      ]
    },
    {
      number: 6,
      title: "Founder Content",
      phase: 2,
      description: "Publish your founding story and market insights",
      tasks: [
        { id: "w6t1", title: "Publish personal operator story", description: "Journey from WordPress to AI Automation - your transformation narrative", points: 40, category: "content", priority: "critical" },
        { id: "w6t2", title: "Publish market problem breakdown", description: "Why service businesses struggle with leads - education piece", points: 30, category: "content", priority: "high" },
        { id: "w6t3", title: "Publish system explanation post", description: "How lead automation works - demonstrate expertise", points: 30, category: "content", priority: "high" },
        { id: "w6t4", title: "Start strategic LinkedIn commenting", description: "Engage with niche creators and prospects daily", points: 20, category: "content", priority: "medium" }
      ]
    },
    {
      number: 7,
      title: "Demo & Proof",
      phase: 2,
      description: "Create demonstration content that shows your expertise",
      tasks: [
        { id: "w7t1", title: "Record 1-2 system demo videos", description: "Show automation workflows in action - screen recordings", points: 50, category: "content", priority: "critical" },
        { id: "w7t2", title: "Record automation walkthrough", description: "Step-by-step Loom video explaining your process", points: 40, category: "content", priority: "high" },
        { id: "w7t3", title: "Share behind-the-scenes content", description: "Building process, client work (anonymized)", points: 30, category: "content", priority: "medium" }
      ]
    },
    {
      number: 8,
      title: "Soft Outreach",
      phase: 2,
      description: "Begin warm conversations and book discovery calls",
      tasks: [
        { id: "w8t1", title: "Start warm DMs (no selling)", description: "Value-first conversations with prospects - build relationships", points: 30, category: "sales", priority: "critical" },
        { id: "w8t2", title: "Offer free audits to qualified leads", description: "Free AI Audit / CRO Audit offer - lead magnet", points: 40, category: "sales", priority: "critical" },
        { id: "w8t3", title: "Book 5-8 discovery calls", description: "First sales conversations - practice your pitch", points: 50, category: "sales", priority: "critical" }
      ]
    },
    // Phase 3: Lead Engine Activation
    {
      number: 9,
      title: "Outbound System",
      phase: 3,
      description: "Build your cold outreach infrastructure",
      tasks: [
        { id: "w9t1", title: "Setup Instantly.ai + n8n", description: "Cold email infrastructure and automation", points: 50, category: "sales", priority: "critical" },
        { id: "w9t2", title: "Build niche-specific cold email flow", description: "Problem-led messaging, not pitch-first approach", points: 40, category: "sales", priority: "critical" },
        { id: "w9t3", title: "Create audit offer landing page", description: "Free AI Audit landing page with clear CTA", points: 40, category: "marketing", priority: "high" }
      ]
    },
    {
      number: 10,
      title: "Funnel Live",
      phase: 3,
      description: "Launch your lead generation funnel",
      tasks: [
        { id: "w10t1", title: "Lead magnet live", description: "Free AI Booking Audit offer active and promoted", points: 40, category: "marketing", priority: "critical" },
        { id: "w10t2", title: "Calendar + follow-ups automated", description: "Automated booking and reminder sequence", points: 40, category: "operations", priority: "critical" },
        { id: "w10t3", title: "Retargeting pixel installed", description: "Meta and LinkedIn pixels on all pages", points: 20, category: "marketing", priority: "high" }
      ]
    },
    {
      number: 11,
      title: "Sales Execution",
      phase: 3,
      description: "Execute your sales process and close first clients",
      tasks: [
        { id: "w11t1", title: "Run daily sales calls", description: "Minimum 3-5 calls per week consistently", points: 50, category: "sales", priority: "critical" },
        { id: "w11t2", title: "Refine pitch (outcome-focused)", description: "Test and improve sales messaging based on feedback", points: 30, category: "sales", priority: "high" },
        { id: "w11t3", title: "Close first core clients", description: "Target: 2-3 paying clients this month!", points: 100, category: "sales", priority: "critical" }
      ]
    },
    {
      number: 12,
      title: "Platform Leverage",
      phase: 3,
      description: "Optimize freelance platforms for additional revenue",
      tasks: [
        { id: "w12t1", title: "Optimize Fiverr & Upwork gigs", description: "Update titles, descriptions, pricing for AI services", points: 30, category: "marketing", priority: "high" },
        { id: "w12t2", title: "Push one premium service offer", description: "High-ticket offer on freelance platforms", points: 40, category: "marketing", priority: "high" },
        { id: "w12t3", title: "Use platforms as cash flow + proof", description: "Generate reviews and testimonials", points: 30, category: "marketing", priority: "medium" }
      ]
    },
    // Phase 4: Delivery & Proof
    {
      number: 13,
      title: "Client Onboarding",
      phase: 4,
      description: "Perfect your client onboarding experience",
      tasks: [
        { id: "w13t1", title: "Perfect onboarding experience", description: "Smooth, professional client start - first impressions matter", points: 50, category: "operations", priority: "critical" },
        { id: "w13t2", title: "Define success metrics per client", description: "Measurable KPIs for each project - clear expectations", points: 40, category: "operations", priority: "critical" },
        { id: "w13t3", title: "Fast first win delivery", description: "Quick win within first week - build momentum", points: 50, category: "delivery", priority: "critical" }
      ]
    },
    {
      number: 14,
      title: "Overdelivery",
      phase: 4,
      description: "Exceed client expectations systematically",
      tasks: [
        { id: "w14t1", title: "Focus on ONE big win per client", description: "More bookings, faster response, or less manual work", points: 50, category: "delivery", priority: "critical" },
        { id: "w14t2", title: "Track before/after data", description: "Document metrics and improvements rigorously", points: 40, category: "delivery", priority: "high" },
        { id: "w14t3", title: "Communicate clearly with clients", description: "Regular updates and check-ins - no surprises", points: 30, category: "delivery", priority: "high" }
      ]
    },
    {
      number: 15,
      title: "Documentation",
      phase: 4,
      description: "Capture proof and testimonials from your work",
      tasks: [
        { id: "w15t1", title: "Capture screenshots of results", description: "Before/after visuals for case studies", points: 30, category: "content", priority: "critical" },
        { id: "w15t2", title: "Record Loom videos of work", description: "Process and results walkthroughs", points: 40, category: "content", priority: "high" },
        { id: "w15t3", title: "Request testimonials from clients", description: "Written and video testimonials - social proof", points: 50, category: "content", priority: "critical" }
      ]
    },
    {
      number: 16,
      title: "Referral Engine",
      phase: 4,
      description: "Build systematic referral generation",
      tasks: [
        { id: "w16t1", title: "Build referral automation", description: "Automated ask after results delivered", points: 40, category: "operations", priority: "high" },
        { id: "w16t2", title: "Create referral incentives", description: "Discount or bonus for referrals", points: 30, category: "operations", priority: "medium" },
        { id: "w16t3", title: "Activate past clients for referrals", description: "Reach out to 100+ existing clients", points: 40, category: "sales", priority: "high" }
      ]
    },
    // Phase 5: Scale with Control
    {
      number: 17,
      title: "Paid Ads (Small)",
      phase: 5,
      description: "Launch controlled paid advertising",
      tasks: [
        { id: "w17t1", title: "Launch retargeting ads only", description: "Website visitors and video viewers", points: 40, category: "marketing", priority: "critical" },
        { id: "w17t2", title: "Create case-study based creatives", description: "Ads featuring real results", points: 40, category: "marketing", priority: "high" },
        { id: "w17t3", title: "Set controlled budget (20-30%)", description: "Disciplined ad spend based on revenue", points: 20, category: "marketing", priority: "high" }
      ]
    },
    {
      number: 18,
      title: "Content Automation",
      phase: 5,
      description: "Scale content production with automation",
      tasks: [
        { id: "w18t1", title: "Repurpose best-performing content", description: "Turn top posts into multiple formats", points: 30, category: "content", priority: "high" },
        { id: "w18t2", title: "Setup AI-assisted video workflow", description: "n8n + AI video tools integration", points: 50, category: "operations", priority: "high" },
        { id: "w18t3", title: "Create n8n publishing workflows", description: "Automated content distribution", points: 40, category: "operations", priority: "medium" }
      ]
    },
    {
      number: 19,
      title: "Delegation",
      phase: 5,
      description: "Build your team and delegate operations",
      tasks: [
        { id: "w19t1", title: "Hire ops/support help", description: "One operations person to handle day-to-day", points: 50, category: "operations", priority: "critical" },
        { id: "w19t2", title: "Document delivery SOPs", description: "Detailed process documentation for team", points: 40, category: "operations", priority: "high" },
        { id: "w19t3", title: "Founder steps out of ops", description: "Focus on Sales, Strategy, Authority", points: 30, category: "operations", priority: "high" }
      ]
    },
    {
      number: 20,
      title: "Sales Optimization",
      phase: 5,
      description: "Optimize your sales process for higher conversion",
      tasks: [
        { id: "w20t1", title: "Refine sales pitch", description: "Based on objection patterns from calls", points: 30, category: "sales", priority: "high" },
        { id: "w20t2", title: "Improve close rate", description: "Target: 20-30% close rate", points: 40, category: "sales", priority: "critical" },
        { id: "w20t3", title: "Upsell existing clients", description: "Additional services to current clients", points: 50, category: "sales", priority: "high" }
      ]
    },
    // Phase 6: Stability & Authority
    {
      number: 21,
      title: "Retention Systems",
      phase: 6,
      description: "Build systems to retain and grow client relationships",
      tasks: [
        { id: "w21t1", title: "Create monthly reporting dashboards", description: "Client-facing performance reports", points: 40, category: "operations", priority: "critical" },
        { id: "w21t2", title: "Schedule strategy calls with clients", description: "Monthly check-ins for relationship building", points: 30, category: "operations", priority: "high" },
        { id: "w21t3", title: "Build renewal workflows", description: "Automated contract renewal process", points: 40, category: "operations", priority: "high" }
      ]
    },
    {
      number: 22,
      title: "Authority Expansion",
      phase: 6,
      description: "Expand your authority across platforms",
      tasks: [
        { id: "w22t1", title: "Publish long-form LinkedIn posts", description: "Deep-dive authority content pieces", points: 40, category: "content", priority: "high" },
        { id: "w22t2", title: "Establish YouTube consistency", description: "Regular video publishing schedule", points: 50, category: "content", priority: "high" },
        { id: "w22t3", title: "Podcast outreach", description: "Guest on industry podcasts for exposure", points: 30, category: "content", priority: "medium" }
      ]
    },
    {
      number: 23,
      title: "Second Offer Test",
      phase: 6,
      description: "Test expansion of your service offerings",
      tasks: [
        { id: "w23t1", title: "Validate core offer stability", description: "Confirm flagship offer is working consistently", points: 30, category: "strategy", priority: "critical" },
        { id: "w23t2", title: "Design adjacent upsell offer", description: "Email marketing, ads, or CRO services", points: 40, category: "strategy", priority: "medium" },
        { id: "w23t3", title: "Test second offer with clients", description: "Pilot with current customer base", points: 40, category: "sales", priority: "medium" }
      ]
    },
    {
      number: 24,
      title: "CEO Review",
      phase: 6,
      description: "Review your 6-month journey and plan ahead",
      tasks: [
        { id: "w24t1", title: "Complete KPI review", description: "Analyze all metrics from 6 months", points: 40, category: "strategy", priority: "critical" },
        { id: "w24t2", title: "Identify what to cut", description: "Remove non-performing activities", points: 30, category: "strategy", priority: "high" },
        { id: "w24t3", title: "Double down on winners", description: "Scale what works best", points: 30, category: "strategy", priority: "high" },
        { id: "w24t4", title: "Create 12-month vision outline", description: "Plan for next phase of growth", points: 50, category: "strategy", priority: "critical" }
      ]
    }
  ],

  dailyHabits: [
    { id: "daily1", title: "Check and respond to leads/DMs", description: "Don't let leads go cold - respond within 2 hours", points: 5, category: "sales", icon: "💬" },
    { id: "daily2", title: "Post or engage on LinkedIn", description: "Minimum 5 meaningful comments + 1 post", points: 5, category: "content", icon: "📱" },
    { id: "daily3", title: "Review CRM pipeline", description: "Update deal stages and follow up on stale leads", points: 3, category: "operations", icon: "📊" },
    { id: "daily4", title: "30 min content creation", description: "Write, record, or plan content", points: 5, category: "content", icon: "✍️" },
    { id: "daily5", title: "Client communication", description: "Proactive updates to active clients", points: 5, category: "delivery", icon: "🤝" }
  ],

  weeklyContent: [
    { id: "wc1", title: "Monday - Problem Awareness Post", description: "Call out the pain your audience feels", points: 15, day: "Monday", icon: "😰" },
    { id: "wc2", title: "Tuesday - System Education Post", description: "Teach the solution/how automation works", points: 15, day: "Tuesday", icon: "🔧" },
    { id: "wc3", title: "Thursday - Proof/Demo Post", description: "Show results, case studies, demos", points: 15, day: "Thursday", icon: "📈" },
    { id: "wc4", title: "Saturday - Authority/POV Post", description: "Founder voice, opinions, hot takes", points: 15, day: "Saturday", icon: "🎤" },
    { id: "wc5", title: "2-3 Reels/Shorts", description: "Short-form video content for reach", points: 20, day: "Weekly", icon: "🎬" }
  ],

  challenges: {
    daily: [
      { id: "dc1", title: "Speed Demon", description: "Respond to all DMs within 1 hour", points: 25, icon: "⚡" },
      { id: "dc2", title: "Content Machine", description: "Create 3 pieces of content", points: 30, icon: "🎯" },
      { id: "dc3", title: "Networking Pro", description: "Connect with 5 new prospects", points: 20, icon: "🤝" }
    ],
    weekly: [
      { id: "wc1", title: "Call Champion", description: "Book 5+ discovery calls", points: 100, icon: "📞" },
      { id: "wc2", title: "Content King", description: "Publish all weekly content pieces", points: 75, icon: "👑" },
      { id: "wc3", title: "Closer", description: "Close at least 1 new client", points: 150, icon: "💰" }
    ]
  },

  badges: [
    { id: "first_week", name: "First Week Complete", icon: "🚀", description: "Finish all Week 1 tasks", condition: "week1Complete", rarity: "common" },
    { id: "position_locked", name: "Position Locked", icon: "🎯", description: "Complete Phase 1", condition: "phase1Complete", rarity: "rare" },
    { id: "authority_builder", name: "Authority Builder", icon: "📣", description: "Publish 10 content pieces", condition: "posts10", rarity: "common" },
    { id: "first_dollar", name: "First Dollar", icon: "💰", description: "Log first paying client", condition: "firstClient", rarity: "rare" },
    { id: "on_fire", name: "On Fire", icon: "🔥", description: "7-day streak", condition: "streak7", rarity: "common" },
    { id: "diamond_hands", name: "Diamond Hands", icon: "💎", description: "30-day streak", condition: "streak30", rarity: "epic" },
    { id: "growth_mode", name: "Growth Mode", icon: "📈", description: "Reach $5K MRR", condition: "mrr5k", rarity: "rare" },
    { id: "goal_crusher", name: "Goal Crusher", icon: "🏆", description: "Reach $10K MRR", condition: "mrr10k", rarity: "legendary" },
    { id: "content_machine", name: "Content Machine", icon: "🎬", description: "50 posts published", condition: "posts50", rarity: "epic" },
    { id: "closer", name: "Master Closer", icon: "🤝", description: "Close 10 clients", condition: "clients10", rarity: "legendary" },
    { id: "perfectionist", name: "Perfectionist", icon: "✨", description: "Complete all tasks in a week", condition: "perfectWeek", rarity: "rare" },
    { id: "early_bird", name: "Early Bird", icon: "🌅", description: "Complete daily habits before noon", condition: "earlyBird", rarity: "common" },
    { id: "consistency_king", name: "Consistency King", icon: "👑", description: "14-day streak", condition: "streak14", rarity: "rare" },
    { id: "half_way", name: "Halfway There", icon: "🎉", description: "Complete Phase 3", condition: "phase3Complete", rarity: "epic" },
    { id: "automation_master", name: "Automation Master", icon: "🤖", description: "Setup all automation systems", condition: "automationComplete", rarity: "rare" }
  ],

  levels: [
    { level: 1, name: "Starter", minPoints: 0, maxPoints: 500, icon: "🌱", color: "#6b7280" },
    { level: 2, name: "Mover", minPoints: 500, maxPoints: 1500, icon: "🚶", color: "#3b82f6" },
    { level: 3, name: "Builder", minPoints: 1500, maxPoints: 3000, icon: "🏗️", color: "#8b5cf6" },
    { level: 4, name: "Scaler", minPoints: 3000, maxPoints: 5000, icon: "📈", color: "#f59e0b" },
    { level: 5, name: "Authority", minPoints: 5000, maxPoints: 8000, icon: "⭐", color: "#ec4899" },
    { level: 6, name: "Champion", minPoints: 8000, maxPoints: Infinity, icon: "🏆", color: "#10b981" }
  ],

  kpiMetrics: [
    { id: "mrr", name: "Monthly Recurring Revenue", unit: "$", targets: [0, 0, 3000, 6000, 8000, 10000], icon: "💰" },
    { id: "clients", name: "Active Clients", unit: "", targets: [0, 0, 3, 6, 8, 10], icon: "👥" },
    { id: "calls", name: "Discovery Calls", unit: "", targets: [0, 8, 20, 15, 15, 15], icon: "📞" },
    { id: "posts", name: "Posts Published", unit: "", targets: [5, 16, 16, 16, 16, 16], icon: "📝" },
    { id: "caseStudies", name: "Case Studies", unit: "", targets: [0, 0, 1, 3, 4, 5], icon: "📊" },
    { id: "closeRate", name: "Close Rate", unit: "%", targets: [0, 0, 15, 20, 25, 30], icon: "🎯" }
  ],

  quotes: [
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "Systems beat motivation. Build the machine, then let it run.", author: "James Clear" },
    { text: "Your network is your net worth.", author: "Porter Gale" },
    { text: "Revenue solves all problems.", author: "Naval Ravikant" },
    { text: "The riches are in the niches.", author: "Marketing Wisdom" },
    { text: "Automate what you can, humanize what you must.", author: "Modern Agency" },
    { text: "Results create gravity. Let your work speak.", author: "SkynetJoe" }
  ]
};

export const CATEGORY_COLORS = {
  strategy: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/50' },
  marketing: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/50' },
  sales: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/50' },
  content: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/50' },
  operations: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/50' },
  delivery: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', border: 'border-indigo-500/50' }
};

export const PRIORITY_COLORS = {
  critical: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/50' },
  high: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/50' },
  medium: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/50' },
  low: { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/50' }
};
