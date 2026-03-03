"""
SKYNETLABS - Auto Scheduler
============================
Runs the news-to-posts generator on a schedule.

Options:
1. Run once daily at a specific time
2. Run every X hours
3. Run on demand

Usage:
  python auto_scheduler.py --daily 06:00    # Run daily at 6 AM
  python auto_scheduler.py --hourly 6       # Run every 6 hours
  python auto_scheduler.py --once           # Run once now
"""

import schedule
import time
import argparse
from datetime import datetime
from news_to_posts import generate_daily_posts, print_sample_posts


def job():
    """The scheduled job to run"""
    print(f"\n⏰ [{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Running scheduled post generation...")
    posts = generate_daily_posts(num_posts=7)
    if posts:
        print("✅ Posts generated successfully!")
    else:
        print("❌ Failed to generate posts")


def run_scheduler(mode: str, value: str = None):
    """Run the scheduler based on mode"""

    if mode == "once":
        print("🚀 Running once...")
        job()
        return

    elif mode == "daily":
        time_str = value or "06:00"
        print(f"📅 Scheduling daily at {time_str}")
        schedule.every().day.at(time_str).do(job)

    elif mode == "hourly":
        hours = int(value) if value else 6
        print(f"🔄 Scheduling every {hours} hours")
        schedule.every(hours).hours.do(job)

    elif mode == "minutes":
        minutes = int(value) if value else 30
        print(f"⚡ Scheduling every {minutes} minutes (for testing)")
        schedule.every(minutes).minutes.do(job)

    print("\n" + "="*50)
    print("🤖 SKYNETLABS Auto-Scheduler Running")
    print("="*50)
    print(f"  Mode: {mode}")
    print(f"  Value: {value}")
    print(f"  Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("="*50)
    print("\nPress Ctrl+C to stop\n")

    # Run the job once immediately
    print("🎬 Running initial job...")
    job()

    # Keep running
    while True:
        schedule.run_pending()
        time.sleep(60)  # Check every minute


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Auto-schedule news to social media post generation"
    )

    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument(
        "--daily",
        metavar="TIME",
        nargs="?",
        const="06:00",
        help="Run daily at specified time (default: 06:00)"
    )
    group.add_argument(
        "--hourly",
        metavar="HOURS",
        nargs="?",
        const="6",
        help="Run every X hours (default: 6)"
    )
    group.add_argument(
        "--minutes",
        metavar="MINS",
        nargs="?",
        const="30",
        help="Run every X minutes (for testing)"
    )
    group.add_argument(
        "--once",
        action="store_true",
        help="Run once and exit"
    )

    args = parser.parse_args()

    try:
        if args.daily:
            run_scheduler("daily", args.daily)
        elif args.hourly:
            run_scheduler("hourly", args.hourly)
        elif args.minutes:
            run_scheduler("minutes", args.minutes)
        elif args.once:
            run_scheduler("once")
    except KeyboardInterrupt:
        print("\n\n👋 Scheduler stopped. Goodbye!")
