'use client';

import { useMemo, useState } from 'react';

type NewsItem = {
  id: number;
  date: string;
  dateLabel: string;
  time: string;
  source: string;
  group: '国际' | '国内';
  category: string;
  title: string;
  background: string;
  summary: string;
  verification: string;
  url: string;
};

const news: NewsItem[] = [
  {
    id: 1,
    date: '2026-09-02',
    dateLabel: '09.02',
    time: '16:20',
    source: 'Google',
    group: '国际',
    category: '安全',
    title: 'Google 推出 Fairwind 计划，将前沿 AI 用于主动网络防御',
    background:
      '高级防御模型的能力与风险同步上升，政府及关键基础设施需要更受控的接入方式。',
    summary:
      'Fairwind 面向政府、Google Cloud 客户与网络安全伙伴限量开放，聚焦软件供应链、关键基础设施与大规模漏洞修复，并以受信任伙伴机制控制能力边界。',
    verification: 'Google 官方博客 · 原文日期与发布主体已核验',
    url: 'https://blog.google/innovation-and-ai/technology/safety-security/fairwind-program/',
  },
  {
    id: 2,
    date: '2026-09-01',
    dateLabel: '09.01',
    time: '21:10',
    source: 'OpenAI',
    group: '国际',
    category: '产品',
    title: 'ChatGPT for Healthcare 接入 Epic 与九类公共医疗数据源',
    background:
      '医疗团队的信息分散在电子病历、研究论文、药品标签和医保政策等不同系统中。',
    summary:
      'OpenAI 新增只读 Epic 电子病历连接和 Healthcare Public Data 插件，可在既有权限范围内综合患者信息，并查询 PubMed、ClinicalTrials.gov、DailyMed 等权威数据。',
    verification: 'OpenAI 官方新闻与产品更新 · 双源交叉核验',
    url: 'https://openai.com/index/chatgpt-connects-health-records-and-healthcare-sources/',
  },
  {
    id: 3,
    date: '2026-09-01',
    dateLabel: '09.01',
    time: '18:40',
    source: 'Anthropic',
    group: '国际',
    category: '模型',
    title: 'Anthropic 发布 Claude Fable 5.1 与 Mythos 5.1',
    background:
      '长周期智能体任务需要更强的编码与知识工作能力，同时也提高了生物和网络安全领域的双重用途风险。',
    summary:
      'Fable 5.1 面向通用编码和知识工作，Mythos 5.1 则面向经审核机构的网络安全与生命科学研究；二者基于相同底层模型，但采用不同能力开放与安全限制。',
    verification: 'Anthropic Newsroom 与模型页 · 双页核验',
    url: 'https://www.anthropic.com/claude-fable-and-mythos-5-1',
  },
  {
    id: 4,
    date: '2026-09-01',
    dateLabel: '09.01',
    time: '12:30',
    source: 'Microsoft',
    group: '国际',
    category: '治理',
    title: 'Microsoft 发布 2026 负责任 AI 透明度报告',
    background:
      '智能体能力迅速进入企业工作流，传统按单一模型划分的治理方法难以覆盖完整 AI 技术栈。',
    summary:
      '微软披露新版 Responsible AI Standard：按模型、平台服务与应用分层治理，并将技术风险管理更紧密地嵌入工程流程，以应对智能体系统扩张。',
    verification: 'Microsoft 官方博客 · 报告发布信息已核验',
    url: 'https://blogs.microsoft.com/on-the-issues/2026/09/01/responsible-ai-in-2026-how-we-are-adapting-for-whats-ahead/',
  },
  {
    id: 5,
    date: '2026-08-28',
    dateLabel: '08.28',
    time: '10:00',
    source: '腾讯',
    group: '国内',
    category: '开源',
    title: '腾讯发布并开源混元 Hy4 preview，主打真实生产力场景',
    background:
      '国产大模型竞争正从单轮问答转向编程、办公、科研等长链路交付能力。',
    summary:
      'Hy4 preview 总参数 770B、激活参数 49B，上下文长度超过 1M；已在腾讯多款产品上线，并通过 TokenHub 与 OpenRouter 提供 API 接入。',
    verification: '腾讯官网 · 参数、价格与上线渠道已核验',
    url: 'https://www.tencent.com/zh-cn/tencent-releases-and-open-sources-tencent-hy4-preview/',
  },
  {
    id: 6,
    date: '2026-08-25',
    dateLabel: '08.25',
    time: '08:54',
    source: '百度',
    group: '国内',
    category: '产品',
    title: '百度把 AI 语音会议纪要能力接入 DuMate',
    background:
      '企业会议信息沉淀仍依赖转写、提炼与待办拆分等多步人工流程。',
    summary:
      '百度 AI 开放平台新增会议纪要总结能力，支持从语音内容提取摘要、关键词和待办，并提供自定义模板，面向日常会议、培训和峰会等场景。',
    verification: '百度 AI 开放平台 · 上线公告已核验',
    url: 'https://cloud.baidu.com/support/news?action=detail&id=3280',
  },
  {
    id: 7,
    date: '2026-08-05',
    dateLabel: '08.05',
    time: '12:00',
    source: '字节跳动',
    group: '国内',
    category: '模型',
    title: '字节跳动发布 SeedRealtime，推进音视频全双工交互',
    background:
      '传统级联式语音助手常在视觉指代、打断时机与背景噪声处理中出现割裂。',
    summary:
      'SeedRealtime 以统一架构融合音频、视频与文本，可连续理解画面、声音及时序变化，实现边看、边听、边说的实时互动；相关能力已进入豆包。',
    verification: '字节跳动 Seed 官方博客 · 产品页交叉核验',
    url: 'https://seed.bytedance.com/zh/blog/seedrealtime-audio-visual-full-duplex-llm-released-toward-omni-modal-natural-interaction',
  },
];

const filters = ['全部', '国际', '国内', '模型', '产品', '安全', '治理', '开源'];
const monitoredSources = [
  'OpenAI',
  'Google',
  'Microsoft',
  'Anthropic',
  '百度',
  '腾讯',
  '字节跳动',
  '知乎',
  '微博',
  '微信公众号',
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function BookmarkIcon({ active }: { active: boolean }) {
  return <span aria-hidden="true">{active ? '◆' : '◇'}</span>;
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('全部');
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState<number[]>([]);

  const filteredNews = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return news.filter((item) => {
      const matchesFilter =
        activeFilter === '全部' ||
        item.group === activeFilter ||
        item.category === activeFilter;
      const matchesQuery =
        !keyword ||
        [item.title, item.source, item.summary, item.background, item.category]
          .join(' ')
          .toLowerCase()
          .includes(keyword);

      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, query]);

  const toggleSaved = (id: number) => {
    setSaved((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id],
    );
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="AI Signal 首页">
          <span className="brand-mark">A/</span>
          <span>
            SIGNAL
            <small>AI INTELLIGENCE</small>
          </span>
        </a>

        <nav className="header-nav" aria-label="主导航">
          <a href="#briefing">今日简报</a>
          <a href="#method">核验方法</a>
          <a href="#sources">监测渠道</a>
        </nav>

        <div className="header-status">
          <i aria-hidden="true" />
          公开来源已核验
        </div>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow">
          <span>DAILY AI BRIEFING</span>
          <span>2026 / 09 / 03</span>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <h1>
              AI，不止快。
              <br />
              <em>还要准。</em>
            </h1>
            <p>
              从全球公开渠道中筛选真正重要的 AI 动态，逐条回溯官方原文，
              把噪音压缩成一份可验证的每日简报。
            </p>
          </div>

          <div className="hero-facts" aria-label="本期数据">
            <div>
              <strong>07</strong>
              <span>条精选资讯</span>
            </div>
            <div>
              <strong>10</strong>
              <span>个重点渠道</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>附原始出处</span>
            </div>
          </div>
        </div>

        <div className="source-ticker" id="sources">
          <span className="ticker-label">持续监测</span>
          <div>
            {monitoredSources.map((source) => (
              <span key={source}>{source}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="briefing" id="briefing">
        <div className="section-heading">
          <div>
            <span className="section-index">01</span>
            <div>
              <p>VERIFIED SIGNALS</p>
              <h2>今日 AI 简报</h2>
            </div>
          </div>
          <p className="update-note">
            截至 09:30 CST
            <br />
            按发布时间倒序
          </p>
        </div>

        <div className="toolbar">
          <div className="filters" aria-label="资讯筛选">
            {filters.map((filter) => (
              <button
                className={activeFilter === filter ? 'active' : ''}
                key={filter}
                onClick={() => setActiveFilter(filter)}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <span className="sr-only">搜索资讯</span>
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索公司、模型或关键词"
              type="search"
              value={query}
            />
          </label>
        </div>

        <div className="news-list">
          {filteredNews.map((item) => (
            <article className="news-card" key={item.id}>
              <a
                aria-label={`阅读原文：${item.title}`}
                className="news-link-shell"
                href={item.url}
                rel="noreferrer"
                target="_blank"
              >
                <div className="news-date" aria-label={item.date}>
                  <strong>{item.dateLabel}</strong>
                  <span>{item.time}</span>
                </div>

                <div className="news-main">
                  <div className="news-meta">
                    <span className="source-name">{item.source}</span>
                    <span>{item.category}</span>
                    <span>{item.group}</span>
                  </div>
                  <h3>
                    {item.title}
                    <span className="title-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </h3>

                  <div className="news-details">
                    <div>
                      <span>背景</span>
                      <p>{item.background}</p>
                    </div>
                    <div>
                      <span>内容</span>
                      <p>{item.summary}</p>
                    </div>
                  </div>

                  <div className="verification">
                    <span className="verified-mark" aria-hidden="true">
                      ✓
                    </span>
                    <p>
                      <strong>已核验</strong>
                      {item.verification}
                    </p>
                    <span className="read-original">点击阅读原文</span>
                  </div>
                </div>
              </a>

              <div className="news-actions">
                <button
                  aria-label={saved.includes(item.id) ? '取消收藏' : '收藏资讯'}
                  className={saved.includes(item.id) ? 'saved' : ''}
                  onClick={() => toggleSaved(item.id)}
                  title={saved.includes(item.id) ? '取消收藏' : '收藏资讯'}
                  type="button"
                >
                  <BookmarkIcon active={saved.includes(item.id)} />
                </button>
                <a
                  aria-label={`查看 ${item.title} 的原始来源`}
                  href={item.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <ArrowIcon />
                </a>
              </div>
            </article>
          ))}

          {filteredNews.length === 0 && (
            <div className="empty-state">
              <span>0 RESULTS</span>
              <h3>没有找到匹配的资讯</h3>
              <button
                onClick={() => {
                  setQuery('');
                  setActiveFilter('全部');
                }}
                type="button"
              >
                清除筛选
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="method" id="method">
        <div className="method-intro">
          <span className="section-index">02</span>
          <p>OUR STANDARD</p>
          <h2>
            快讯很多，
            <br />
            事实只有一个。
          </h2>
          <p className="method-copy">
            社交平台用于发现线索，官方原文用于确认事实。无法回溯到明确发布主体、日期或原始材料的信息，不进入每日精选。
          </p>
        </div>

        <ol className="method-steps">
          <li>
            <span>01</span>
            <div>
              <h3>广泛采集</h3>
              <p>持续扫描企业官网、技术博客、知乎、微博与微信公众号等公开渠道。</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>回溯原文</h3>
              <p>核对发布主体、原始时间、产品参数与上下文；重要数据优先双源确认。</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>编辑提炼</h3>
              <p>仅保留 5–8 条高价值动态，按时间、背景、内容和来源统一整理。</p>
            </div>
          </li>
        </ol>
      </section>

      <footer>
        <div className="footer-brand">A/SIGNAL</div>
        <p>拒绝未经核验的 AI 噪音。</p>
        <div>
          <span>本期：2026.09.03</span>
          <a href="#top">回到顶部 ↑</a>
        </div>
      </footer>
    </main>
  );
}
