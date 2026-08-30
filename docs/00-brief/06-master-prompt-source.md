# 06 · Master prompt (founder source)

> **Transcription, not an authored document.** Text extracted verbatim from `06-master-prompt-source.pdf`
> (the original is kept beside this file) via macOS PDFKit. Page breaks are marked with HTML comments.
> Bullet glyphs render as bare `●` on their own lines because the source PDF renders list markers in a
> separate text run from the list body; the reading order is preserved.
>
> **Precedence:** `00-README.md` (16 Aug 2026) states the locked decisions this package is built on —
> *"no broking/license narrative anywhere"*, no fundraise announcement, no F&O loss-rate stat. This PDF
> predates that and does carry a broking narrative. Where the two disagree, the handover package (00–05)
> is the one that ships. Read this file for the founder's reasoning and market framing, not for copy.

---


<!-- page 1 -->

Context: I want to start working on a new project to build a refreshing & compelling new website
for Tradl AI. You have all context about what we're building at Tradl AI as India's first agentic
stock broker, use all of that context while working on this project, in case you won't be able to
fetch context from some of the key past & parallel ongoing projects which have deep contexts
sitting inside, then let me know, i will feed you with comprehensive context md files from those
projects manually (although i expect you to do it yourself or have the context in your overall
account level memory already)
First, I would elaborate on the platform, brand & business's vision in terms of what exactly we
are aiming to build and achieve.
So, in India, the capital markets or the Indian equity markets at large are approximately 3
decades old, within this time span we have broadly seen 3 waves appearing:
●
●
●
Wave-1: Early 1990s-2000s --> when the ecosystem moved from physical to digital
trading which enabled the possibility for "scalable infra" that could now "reach to retail
traders" and expanding the earlier concentration from big / enterprise players only, this
wave was predominantly led by players like ICICI Securities, early brokers like Ventura
etc
Wave-2: Early 2000s-2010s --> when new tech enabled retail players like Zerodha came
into existence and brought the concept of "discount brokerage" for the retail mass
enabling "wider participation" into the markets
Wave-3: Later 2010s to 2025 --> the new India digital stack, ie DPI (Digital Public
Infrastructure) - the stack of Aadhar, PAN, UPI etc - enabled "convenience" &
"accessibility" for the broader masses, eg, a retail trader/investor today can open a new
DEMAT account on any of the new age tech brokers like Groww, Upstox, AngelOne etc,
by completing digital/virtual KYC and loading cash wallets via UPI under 2-3 mins itself.
We, as builders of a new age AI-powered stock broking platform, believe that there will be a new
"Wave-4" in the Indian broking / capital / equity markets ecosystem leading to new emerging
players and a new category of products which will be built on top of AI as the backbone or
foundation. As the new as well as the existing generation of trading audience has already
started becoming AI-native in the way they think, operate or would like to operate their trading
processes & workflows, this entire new era opens up the possibility for building India's first
AI-native stock broker which can deliver agentic capabilities to these serious traders who are
aiming to get better at trading in terms of their performance and outcomes.
Now as builders of Tradl AI - our thesis has been around the same vision that we would like to
be the front-runners of Wave 4 by leading in this new category of AI-native or Agentic brokers in
the market. Hence, at a product level, we are building with this same vision.
Now, at a product thesis level, let me breakdown how do we think about the future of trading in
India which will be powered by AI with below inputs:

<!-- page 2 -->

●
●
●
●
●
●
Trading is a digital-skill, traders need to learn, iterate, and improve over a period of time
that they spend into the markets trying to get better at trading performance and
achieving desired outcomes.
Just like any other digital-skill, the participants of this digital skill also operate on 4 legs:
Intent -> Insight -> Analysis -> Execute
○
Intent = the desire to achieve a certain type, quality & quantum of output by
operating with the digital-skill
○
Insight = is the natural inherent craft that the person is able to develop or hone
over a period of time by operating with the digital skill
○
Analysis = real-application of the digital skill to find what, why, how to execute
○
Execute = the final leg of the experience where all the previous steps culminate
into actions taken by the person
We have seen AI revolutionise several digital skills over a quick span of last 2-3 years
like : hardcore technical skills like - coding / software development / app development
etc; creative abilities & skills like - video / audio generation etc
We believe the same can be replicated in trading as a "digital-skill" all over, which hasn't
happened at scale so far, primarily because of the reason that almost all of the revolution
across all digital skills so far has been backed by foundational AI models ie, LLMs -
which by its definition itself mean they are contextual / qualitative / probabilistic in nature
(since they are text or language based)
So, in order to actually disrupt trading as a digital skill, the first and foremost requirement
is to achieve significant level of "reliable determinism" in order for the intelligence output
to be accurate, reliable and worth utilising in trading related use cases, since every use
case in trading turns out to be a numerical/quantitative/analytical use-case.
Hence, very early in our journey ie July-Sep'25, last year - we were able to ascertain that
in order to make LLMs work for trading as a domain, we will need to add a reliable quant
layer on top of LLMs and hence this dual-architecture of "LLM+Quant" became our
foundation for everything we have been building from scratch.
Now in our story, what we've done since locking our dual architecture as the foundation is
described in below notes along with timelines:
●
●
●
●
●
●
●
29th July'25: first ever idea conceptualisation as thinking of building "Cursor for Trading"
Aug-Sep'25: fundamental thesis evolution + dual architecture conceptualisation
Sep-Oct'25: first version of our MVP got built by Shubham
Oct-Nov'25: MVP validation with some peer traders and mentors
Dec'25: I (Nilesh) left my full-time job at Stable Money and started working full time on
Tradl AI, we took up a small office space and hired a few fresher engineers to start
shipping fast
Jan'26: soft-launch of our first beta version of Tradl AI as a natural language based AI
stock screening tool
Feb'26: started conversing with Tier-1 VCs in India, closed seed round cheque within 10
days of talks, raised $4.3mn from Nexus Venture Partners and Stellaris Venture Partners

<!-- page 3 -->

●
●
●
●
●
●
●
Mar'26-May'26: worked on expanding the scope of the beta platform live with added
features & engagement layers, crossed 8k+ traders on our platform - all organic without
a rupee spent on acquisition
Jun'26: applied for broking license with NSE, BSE & MCX, approvals received from NSE
with BSE to follow by next week, MCX & SEBI approvals to follow by mid Sep'26
July'26: started shipping AI trading tool stack, with private access in pilot cohorts for
"Pattern Detection Engine" and "Smart Option Chain" tools
Aug'26: working on migrating from private beta stage to a public alpha stage, new alpha
version is aimed for launch by Aug'26 end, it will have: AI Screener + Backtesting across
3,000+ stocks and F&O instruments, Smart Stock Pages, Morning Decode (daily
pre-market briefing built by AI along with an audio podcast streaming via Spotify), Events
Calendar, private & limited access to AI trading tools like: Insights Engine, Pattern
Detection Engine, Smart Option Chain, AI Strategy Builder, Position Co-pilot, AI powered
F&O Discovery, Smart Charts
Sep-Nov'26: Once Alpha goes live, we will be focusing on building a healthy ToFu (Top
of the funnel) by piloting with paid acquisition channels, creator & strategic partnerships
with publishers, community operators & brands that are popular in the trading domain in
India. Along with the ToFu, the aim will be to build internal transfer loops for users to
private & limited access to AI trading tools mentioned in previous bullet
Dec'26: UAT for AI Broking Live
Jan'26: Market launch for Tradl AI as India's first AI-native full-stack broking platform with
the trading tool kits + broking layers available across: cash, F&O and commodities via all
premier exchanges ie, NSE, BSE & MCX from day 1 of the launch
Key Product Milestones that we achieved so far:
●
●
●
Native (In-house) Trading Chart Stack: we have been able to build our own charting
stack, full infra built in-house that will enable us to provide intelligence right on top the
charts that traders use as a primary decision making surface.
Evolved Product Thesis: We have been able to strongly arrive at an internal conclusion
& understanding across the team as well as the existing investors that "chat" can not be
the primary form factor for delivering intelligence to the trading audience whom we
consider our ICP to be. Primary reason is that traders are hooked on to their existing
workflows and decision making surfaces (eg, chart, chain, strategy builder etc) -
expecting them to chat / talk / converse with a bot is wishing like a new habit formation.
We believe that the best form factor for traders is going to be "embedded intelligence" ie,
building AI-powered intelligence layers right on top of the existing decision making
surfaces that traders use today, which will help them stick to the same surface &
workflow and for us to be able to deliver "assistance"
,
"automation" & "agency" right then
& there on the same surface, right before the "T" (transactional) step.
Product Roadmap & Phases: We are going to be building the entire product stack to
achieve the future of trading as "agentic trading" via three phases:
○
Phase-1: "Assistance"
--> On day 1, we don't wish to deploy agents for traders,
no one is going to buy that bullshit and no trust exists on the brand. Hence, we

<!-- page 4 -->

○
○
○
start by offering the entire AI-trading tool stack for delivering "assistance" via the
embedded intelligence UX
Phase-2: "Automation"
--> Since we are becoming broker ourselves, we will own
the execution rails end to end, hence it will be super easy to start offering
automated execution capabilities to traders who start leveraging assistance in
their trading workflow via our AI-trading tool stack
Phase-3: "Agentic"/"Agency"
--> Allowing traders to start building agentic
workflows for different types of trading requirements based on their persona,
preference, style, capital, risk appetite etc. Each node of the workflow will have
an agent which will self-operate to execute a series of tasks via the tools that we
are building in Phase-1 and then automated execution layer sitting on top of the
agent's output delivering an end to end agentic trading experience allowing the
traders to graduate from being an operator of trading as digital skill to a
supervisor of their agents who trade on their behalf.
On day 1 no one is going to believe in agentic trading and hence we wish to take
this phased approach in our product roadmap to build trust, confidence in traders
who will use Tradl AI as their primary broker for regular trading and by building
our brand positioning gradually in the market.
Alpha Launch (Aug’26 End - Early Sep’26) Plan: with this launch we are aiming to move from
private beta to public alpha stage by making the platform non-gated (ie by removing the
waitlisted flow) and accessible by any visitor on our website with a simple sign up & registration
flow. In this alpha version we are expanding our product capabilities with below features & tools:
- AI Screening: stock screening across all NSE listed universe (3000+) scrips which was earlier
only limited to ~900 stocks and that too on daily timeframe and bigger timeframes for any
analysis. Now the scope will be expanded to all stock universe across all timeframes (intraday
as well)
- AI Backtesting: earlier backtesting was very rudimentary and surface levels in terms of input
parameters for the screening built to be further backtested, now this tool can stand alone
perform backtesting for any trading idea with customisable widgets
- Events Calendar & Timelines: we did not have access to these earlier, now after partnering
with CMOTS and building our own data pipelines we have every event & timelines mapped, this
will be available at all strategic locations in the platform aiming to help traders be full aware and
on their tips with latest happenings in the market
- Stock Previews with Tradl AI Charts: we are introducing early access to our native charts with
some very unique features like AI annotated charts while performing screening, backtesting and
capturing stock features across events & timelines, the native charts being built by Tradl AI will
soon become smart charts for traders with “embedded intelligence” in our future releases on top
of the alpha version.
- Smart Stock Pages: new re-built stock pages with extreme AI-high touchpoints, each of 3000+
stocks processed by Tradl AI’s tool stack (as many as 7 tools)
- Early Private Access to New AI Tools: Pattern Sniper, Smart Chain, Strategy Copilot and many
more coming..

<!-- page 5 -->

On our ICP, Brand Positioning, & Launch GTM, we have below thoughts:
●
ICP: We see that trading participants in indian broking ecosystem in three layers of
pyramid:
○
○
○
Layer-1 (Bottom of Pyramid - Casual Traders): Largest layer by volume (ie
number) of participants, primarily early beginners with 0-2 yrs of market
experience who start trading casually either for learning, fun or gambling intent
(by following Scalping as their primary trading style). Most of these beginners end
up being "Casual Traders"
, they resort to concentrate on telegram channel for
"tip" seeking, since they have very limited understanding of markets and trading
knowledge they fall prey to the tipping wave going on in India, almost every
broker has also started indulging into serving this cohort of users with tips in
some or other shape. We believe this is the ICP for players like Univest
(marketplace for SEBI RAs to provide solicited stock market tips legally) and Sahi
(built for enticing scalpers who care about fast entry & exit in small timeframes)
Layer-2 (Middle of Pyramid - Semi Pro Traders): Little evolved, disgruntled by tip
following and hit & trial experience in their early years of market but have now
evolved to understand that to stay in market they need to learn and then trade.
These traders either end up learning from books, trading courses, creators, DIY
etc and end up applying their own but "limited" knowledge & understanding to
validate market opportunities by "analysing" themselves and end up owning their
trading outcomes, be it profit or loss. Most of them end up doing Swing Trading,
chasing Momentum stocks etc. We believe this is the ICP for players like Groww,
Sahi, Dhan etc
Layer-3 (Top of Pyramid - Pro Traders): Most sophisticated, seasoned traders
who have graduated from their experiences by learning & doing to become
“systemic traders”
, they rarely trade without rules & systems. These traders tend
to use sophisticated methods like - custom indicators, leverage APIs to build their
own strategies by backtesting & fine tuning and operate systemically by
deploying automated algo based trade execution. Those who aren’t able to reach
till APIs & Algo Trading levels, certainly operate by strategy based trading by
leveraging strategy builder tools like Sensibull. We believe this is the ICP for
players like, Sensibull, AlgoTest, Tradetron, TradingView’s PineScript etc
●
Brand Positioning: After studying the existing broking landscape in India, we have
realised that this is a hyper competitive and expensive space to operate technically and
scale comes at a cost. Most of the scaled new-age tech brokers that we see today like,
Groww, Dhan, Upstox, AngelOne or even the latest ones like Sahi, have had their own
way of approaching this market and its audience. We have learnt from the playbooks
established by most of these and come to the realisation that almost everyone has
aimed to capture the retail mass trading audience from day 1. We intend to position

<!-- page 6 -->

●
ourselves a bit different strategically. Today every scale new age tech broker (like the
ones mentioned) above have deep pockets and enough revenue & cash flow to sustain
paid marketing efforts at scale via performance marketing on Meta & Google coupled
with big creator & influencer partnerships along with high quality content play.
We at the beginning of our journey don’t want to get into CAC wars with any of these
established players. The clear targeting gap that we see in terms of brand positioning is
that none of the established scaled brokers is aiming to specifically cater the Layer 3 &
some of Layer 2 in terms of the ICP slices defined above. We feel what we are building
in terms of “embedded intelligence” is a real potential delight for Semi Pro & Pro Traders,
as these will be the audience who has the highest potential appetite for “upgrading” their
trading skills along with the highest potential appreciation for the AI in trading use cases.
Hence, we want to position ourselves as a premium broker in the market who obsesses
about upgraded trading experience with AI and this whole new flavour of “embedded
intelligence” service the Semi Pro & Pro Trading audience first. We wish to keep this
positioning for a reasonable period till we are able to establish ourselves as the “go to
destination” for all serious & active traders who are aiming to become Pros. Once this
positioning plays out in terms of acquisition, retention & monetization (ie by trading order
volumes at scale), then only we would like to launch a version for the masses i.e. the
Casual Traders audience who primarily is looking for tips or scalping. In terms of
analogy, think of this as 2 layers of the product / brand identity similar to how Claude
also positions its operating models, eg - Opus & Fable are aimed for Pros/Semi Pros
equivalent use cases vs Sonnet & Haiku aimed for Casuals equivalent use cases. We
want to start with Opus first, establish our premium / pro trader’s destination identity and
then launch the Sonnet version later.
Launch GTM: While we are yet to define and lay down most of our GTM strategy but at
theoretical levels at this stage we feel that the launch strategy will be in 3 phases:
- Phase-1: From Alpha Launch till Broking Go-Live (Sep’26 to Nov’26) → this phase will
be aimed at leveraging this current alpha launch to start experimenting across
acquisition efforts like - creator partnerships (mini & macro trading creators), ad
broadcasts on trading audience dense platforms (eg moneycontrol), content seeding
across all channels like - Reddit, X, Telegram & Linkedin (for which we are already
building the automated AI playbooks), offline activations (in expos and trading
conferences), some early experiments of paid / performance marketing on Meta &
Google
- Phase-2: Broking Go-Live with Opus-Like Premium Positioning for Pro & Semi-Pro
Traders (Dec’26-Jun’27) → this phase will be aimed at targeting Semi Pro & Pro Traders
audience across all destinations, channels & platforms where they are present with
“Strategy Copilot” as our key product during this phase. Doubling down on X with Paid
Ads, Telegram Scaling with deeper strategic partnerships with macro trading creators &
community operators, Reddit Scaling with owning AI trading mindspace controlled via
brand sub-reddits as well as Paid Ads, Investing in building & cracking offline presence
in trading hub cities like Surat, Mumbai, Kolkata etc, B2B strategic partnerships with

<!-- page 7 -->

-
highly regarded trading mentors like Vivek Bajaj (Founder of StockEdge) etc, Building
Marketing IPs with new concepts like “The Great Indian Trading Festival (GITF)” where 3
days of paid (food & stay included) trading festival where all premium trading influencers
and top creators will participate and all participating traders who will use Tradl AI as
broking platform - will enjoy unlimited orders with 0 broking fee for those 3 days, filled
with competitions, sprints, challenges & prizes (PS: a lot of these will be conceptualised,
planned & executed with our legal & compliance reps in loop since beginning so do not
criticise on those points while planning for website design task which is the objective of
the project)
Phase-3: Launching with Sonnet-Like Mass Positioning for Casual Traders (July’27
onwards) → this phase will be aimed at targeted feature marketing and scaling all of our
paid marketing efforts to maximise reach to Casual Traders with “Scalping Co-pilot” as
our key product during this phase. Apart from scaling paid marketing, we will leverage
uniquely placed strategies like Trade With AI - Live Streaming on Youtube - similar to
what traders streaming today looks like, but we will do it with our AI copilot. This phase
will also start seeing some strategic efforts towards brand building in PR & Media at
scale.
Objective: After understanding the above full storyline, context and ambitions - help me plan,
design & build a super compelling website for the alpha launch of Tradl AI
Task & Deliverables: Now based on all the context shared above, i want you to help me with
planning & curating a completely in-depth brand identity book, visual storytelling guidelines,
website content structure (section by section), website design guidelines, claude design
handover package to handover all prep work into claude design to start building our new
website brick by brick (we will start with wireframing then prototyping in our design system and
then we will build the final version via actual designer & developers of our team). For each of the
asked deliverables, if you wish to discuss more context and gain more inputs while building it
then feel free to do that, but I have already spurted out almost everything that I could for feeding
the entire context of Tradl AI bit by bit.
