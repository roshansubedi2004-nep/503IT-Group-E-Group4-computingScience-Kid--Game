<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Password Defenders</title>
<link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@500;600;700&family=Orbitron:wght@700;900&display=swap" rel="stylesheet">
<style>
  :root {
    --bg-deep: #050d1a;
    --bg-panel: #0a1628;
    --bg-card: #0f1e38;
    --neon-cyan: #00f5ff;
    --neon-green: #39ff14;
    --neon-pink: #ff2d78;
    --neon-gold: #ffd700;
    --neon-orange: #ff8c00;
    --text-bright: #e8f4ff;
    --text-muted: #6a8cae;
    --border-glow: rgba(0,245,255,0.25);
    --grid-line: rgba(0,245,255,0.06);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  html, body {
    height: 100%;
    font-family: 'Rajdhani', sans-serif;
    background: var(--bg-deep);
    color: var(--text-bright);
    overflow: hidden;
  }

  /* ── GRID BACKGROUND ── */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(var(--grid-line) 1px, transparent 1px),
      linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0;
  }

  body::after {
    content: '';
    position: fixed;
    inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(0,120,200,0.15) 0%, transparent 60%),
                radial-gradient(ellipse at 80% 100%, rgba(255,45,120,0.08) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  /* ── SCREENS ── */
  .screen {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 10;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
  }
  .screen.active { display: flex; }

  /* ── SCANLINES overlay ── */
  .screen::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.07) 2px,
      rgba(0,0,0,0.07) 4px
    );
    pointer-events: none;
    z-index: 100;
  }

  /* ── PANEL ── */
  .panel {
    background: var(--bg-panel);
    border: 1px solid var(--border-glow);
    border-radius: 12px;
    position: relative;
    overflow: hidden;
  }
  .panel::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--neon-cyan), transparent);
  }

  /* ═══════════════════════════════════════════════
     START SCREEN
  ═══════════════════════════════════════════════ */
  #screen-start {
    gap: 24px;
    text-align: center;
  }

  .logo-wrap {
    position: relative;
    width: 140px;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid;
    animation: spin linear infinite;
  }
  .logo-ring:nth-child(1) {
    width: 140px; height: 140px;
    border-color: rgba(0,245,255,0.3);
    animation-duration: 12s;
  }
  .logo-ring:nth-child(2) {
    width: 110px; height: 110px;
    border-color: rgba(0,245,255,0.15);
    animation-duration: 8s;
    animation-direction: reverse;
  }
  .logo-ring:nth-child(3) {
    width: 82px; height: 82px;
    border-color: rgba(0,245,255,0.4);
    border-style: dashed;
    animation-duration: 20s;
  }

  .logo-icon {
    font-size: 44px;
    position: relative;
    z-index: 2;
    filter: drop-shadow(0 0 12px rgba(0,245,255,0.8));
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .game-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(28px, 5vw, 48px);
    font-weight: 900;
    letter-spacing: 3px;
    color: var(--neon-cyan);
    text-shadow: 0 0 30px rgba(0,245,255,0.5), 0 0 60px rgba(0,245,255,0.2);
    animation: flicker 4s ease-in-out infinite;
  }

  @keyframes flicker {
    0%, 95%, 100% { opacity: 1; }
    96% { opacity: 0.8; }
    97% { opacity: 1; }
    98% { opacity: 0.7; }
  }

  .game-tagline {
    font-size: 14px;
    color: var(--text-muted);
    letter-spacing: 4px;
    text-transform: uppercase;
    font-family: 'Share Tech Mono', monospace;
  }

  .terminal-text {
    font-family: 'Share Tech Mono', monospace;
    color: var(--neon-green);
    font-size: 13px;
    padding: 16px 24px;
    background: rgba(0,0,0,0.5);
    border-left: 2px solid var(--neon-green);
    border-radius: 4px;
    max-width: 440px;
    text-align: left;
    line-height: 1.8;
  }

  .start-btn {
    font-family: 'Orbitron', sans-serif;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 4px;
    padding: 16px 48px;
    background: transparent;
    border: 2px solid var(--neon-cyan);
    color: var(--neon-cyan);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.2s;
  }
  .start-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--neon-cyan);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.2s;
    z-index: -1;
  }
  .start-btn:hover {
    color: var(--bg-deep);
    text-shadow: none;
    box-shadow: 0 0 30px rgba(0,245,255,0.4);
  }
  .start-btn:hover::before { transform: scaleX(1); }

  /* ═══════════════════════════════════════════════
     RULES SCREEN
  ═══════════════════════════════════════════════ */
  #screen-rules {
    gap: 20px;
  }

  .rules-panel {
    width: min(600px, 96vw);
    padding: 32px 36px;
  }

  .screen-header {
    font-family: 'Orbitron', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--neon-cyan);
    letter-spacing: 2px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .screen-header::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, var(--border-glow), transparent);
  }

  .rules-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .rules-list li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 15px;
    color: var(--text-bright);
    line-height: 1.5;
  }
  .rules-list li .bullet {
    width: 24px;
    height: 24px;
    background: rgba(0,245,255,0.1);
    border: 1px solid var(--border-glow);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: var(--neon-cyan);
    flex-shrink: 0;
    margin-top: 2px;
  }

  .mission-btn {
    font-family: 'Orbitron', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 3px;
    padding: 14px 40px;
    background: linear-gradient(135deg, #0a2a5e, #0d3a7a);
    border: 1px solid var(--neon-cyan);
    color: var(--neon-cyan);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 0 20px rgba(0,245,255,0.1);
  }
  .mission-btn:hover {
    background: linear-gradient(135deg, #0d3a7a, #1050a0);
    box-shadow: 0 0 30px rgba(0,245,255,0.25);
    transform: translateY(-2px);
  }

  /* ═══════════════════════════════════════════════
     GAME SCREEN
  ═══════════════════════════════════════════════ */
  #screen-game {
    gap: 0;
    padding: 0;
    justify-content: flex-start;
  }

  .game-container {
    width: min(780px, 100vw);
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 20px 20px 12px;
    gap: 14px;
    overflow: hidden;
  }

  /* HUD */
  .hud {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(0,0,0,0.4);
    border: 1px solid var(--border-glow);
    border-radius: 8px;
    padding: 10px 18px;
    font-family: 'Share Tech Mono', monospace;
  }
  .hud-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }
  .hud-label {
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: 2px;
    text-transform: uppercase;
  }
  .hud-value {
    font-size: 20px;
    font-weight: 700;
    color: var(--neon-cyan);
  }
  .hud-center {
    display: flex;
    gap: 6px;
  }
  .lock-icon {
    font-size: 18px;
    transition: all 0.3s;
  }

  /* Progress bar */
  .progress-track {
    height: 3px;
    background: rgba(0,245,255,0.08);
    border-radius: 2px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--neon-cyan), var(--neon-green));
    border-radius: 2px;
    transition: width 0.6s ease;
    box-shadow: 0 0 8px rgba(0,245,255,0.5);
  }

  /* Question box */
  .question-wrap {
    background: var(--bg-card);
    border: 1px solid var(--border-glow);
    border-radius: 10px;
    padding: 20px 24px;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
  }
  .question-wrap::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--neon-cyan), transparent);
  }

  .q-level-badge {
    display: inline-block;
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: var(--neon-cyan);
    background: rgba(0,245,255,0.08);
    border: 1px solid rgba(0,245,255,0.2);
    border-radius: 4px;
    padding: 3px 10px;
    letter-spacing: 2px;
    margin-bottom: 10px;
  }

  .q-scenario {
    font-size: 13px;
    color: var(--text-muted);
    font-family: 'Share Tech Mono', monospace;
    margin-bottom: 8px;
    line-height: 1.6;
  }

  .q-text {
    font-size: 17px;
    font-weight: 600;
    color: var(--text-bright);
    line-height: 1.5;
  }

  /* Choices */
  .choices {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }

  .choice-btn {
    width: 100%;
    background: var(--bg-card);
    border: 1px solid rgba(0,245,255,0.12);
    border-radius: 8px;
    padding: 14px 18px;
    color: var(--text-bright);
    font-family: 'Rajdhani', sans-serif;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 14px;
    transition: all 0.15s;
    position: relative;
    overflow: hidden;
  }
  .choice-btn:hover:not(:disabled) {
    border-color: rgba(0,245,255,0.4);
    background: rgba(0,245,255,0.05);
    transform: translateX(4px);
  }
  .choice-letter {
    width: 28px;
    height: 28px;
    border-radius: 4px;
    background: rgba(0,245,255,0.08);
    border: 1px solid rgba(0,245,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Share Tech Mono', monospace;
    font-size: 13px;
    color: var(--neon-cyan);
    flex-shrink: 0;
  }
  .choice-btn:disabled { cursor: not-allowed; }
  .choice-btn.correct-reveal {
    border-color: var(--neon-green);
    background: rgba(57,255,20,0.08);
    animation: pulse-green 0.4s ease;
  }
  .choice-btn.correct-reveal .choice-letter {
    background: rgba(57,255,20,0.2);
    border-color: var(--neon-green);
    color: var(--neon-green);
  }
  .choice-btn.wrong-reveal {
    border-color: var(--neon-pink);
    background: rgba(255,45,120,0.06);
  }
  .choice-btn.wrong-reveal .choice-letter {
    background: rgba(255,45,120,0.15);
    border-color: var(--neon-pink);
    color: var(--neon-pink);
  }
  @keyframes pulse-green {
    0% { box-shadow: 0 0 0 0 rgba(57,255,20,0.4); }
    100% { box-shadow: 0 0 0 10px transparent; }
  }

  /* Feedback */
  .feedback-box {
    display: none;
    border-radius: 10px;
    padding: 16px 20px;
    flex-direction: column;
    gap: 8px;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
  }
  .feedback-box.active { display: flex; }
  .feedback-box.correct {
    background: rgba(57,255,20,0.07);
    border: 1px solid rgba(57,255,20,0.25);
  }
  .feedback-box.wrong {
    background: rgba(255,45,120,0.07);
    border: 1px solid rgba(255,45,120,0.25);
  }
  .fb-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .fb-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 14px;
    font-weight: 700;
  }
  .correct .fb-title { color: var(--neon-green); }
  .wrong .fb-title { color: var(--neon-pink); }
  .fb-tip {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.6;
    font-family: 'Share Tech Mono', monospace;
  }
  .fb-tip strong { color: var(--text-bright); font-style: normal; }

  .next-btn {
    font-family: 'Orbitron', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    padding: 8px 20px;
    background: transparent;
    border: 1px solid var(--neon-cyan);
    color: var(--neon-cyan);
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.15s;
    white-space: nowrap;
  }
  .next-btn:hover {
    background: rgba(0,245,255,0.1);
    box-shadow: 0 0 12px rgba(0,245,255,0.2);
  }

  /* ═══════════════════════════════════════════════
     LEVEL COMPLETE SPLASH
  ═══════════════════════════════════════════════ */
  #screen-levelup {
    gap: 20px;
    text-align: center;
  }
  .levelup-badge {
    font-size: 80px;
    animation: bounce 0.6s ease;
    filter: drop-shadow(0 0 20px rgba(255,215,0,0.6));
  }
  @keyframes bounce {
    0% { transform: scale(0.5); opacity: 0; }
    70% { transform: scale(1.15); }
    100% { transform: scale(1); opacity: 1; }
  }
  .levelup-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(20px, 4vw, 32px);
    font-weight: 900;
    color: var(--neon-gold);
    text-shadow: 0 0 20px rgba(255,215,0,0.4);
    letter-spacing: 2px;
  }
  .levelup-sub {
    color: var(--text-muted);
    font-size: 15px;
    max-width: 400px;
  }
  .levelup-tip-box {
    background: rgba(0,0,0,0.5);
    border: 1px solid rgba(255,215,0,0.2);
    border-left: 3px solid var(--neon-gold);
    border-radius: 6px;
    padding: 16px 20px;
    max-width: 480px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 13px;
    color: var(--text-muted);
    text-align: left;
    line-height: 1.7;
  }
  .levelup-tip-box .tip-label {
    color: var(--neon-gold);
    font-size: 10px;
    letter-spacing: 3px;
    display: block;
    margin-bottom: 8px;
  }

  /* ═══════════════════════════════════════════════
     REWARD SCREEN
  ═══════════════════════════════════════════════ */
  #screen-reward {
    gap: 20px;
    text-align: center;
  }
  .reward-panel {
    width: min(560px, 96vw);
    padding: 40px 36px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  .reward-badges {
    display: flex;
    gap: 12px;
    font-size: 48px;
    animation: fadeInUp 0.6s ease;
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .reward-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(18px, 3vw, 26px);
    font-weight: 900;
    color: var(--neon-gold);
    text-shadow: 0 0 20px rgba(255,215,0,0.4);
    letter-spacing: 2px;
  }
  .reward-sub {
    color: var(--text-muted);
    font-size: 15px;
    max-width: 420px;
    line-height: 1.6;
  }
  .score-display {
    background: rgba(0,0,0,0.5);
    border: 1px solid var(--border-glow);
    border-radius: 10px;
    padding: 20px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .score-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 4px;
  }
  .score-value {
    font-family: 'Orbitron', sans-serif;
    font-size: 48px;
    font-weight: 900;
    color: var(--neon-cyan);
    text-shadow: 0 0 20px rgba(0,245,255,0.4);
  }
  .score-max {
    font-family: 'Share Tech Mono', monospace;
    font-size: 12px;
    color: var(--text-muted);
  }
  .grade-badge {
    font-family: 'Orbitron', sans-serif;
    font-size: 14px;
    font-weight: 700;
    padding: 8px 24px;
    border-radius: 20px;
    letter-spacing: 2px;
  }
  .grade-s { background: rgba(255,215,0,0.15); border: 1px solid var(--neon-gold); color: var(--neon-gold); }
  .grade-a { background: rgba(57,255,20,0.12); border: 1px solid var(--neon-green); color: var(--neon-green); }
  .grade-b { background: rgba(0,245,255,0.1); border: 1px solid var(--neon-cyan); color: var(--neon-cyan); }
  .grade-c { background: rgba(255,140,0,0.12); border: 1px solid var(--neon-orange); color: var(--neon-orange); }
  .grade-f { background: rgba(255,45,120,0.12); border: 1px solid var(--neon-pink); color: var(--neon-pink); }

  .restart-btn {
    font-family: 'Orbitron', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 3px;
    padding: 14px 40px;
    background: transparent;
    border: 2px solid var(--neon-cyan);
    color: var(--neon-cyan);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
  }
  .restart-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--neon-cyan);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.2s;
    z-index: -1;
  }
  .restart-btn:hover { color: var(--bg-deep); }
  .restart-btn:hover::before { transform: scaleX(1); }

  /* ── UTILITY ── */
  .separator {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border-glow), transparent);
  }

  /* Animated entry */
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .screen.active > * {
    animation: slideIn 0.35s ease forwards;
  }
  .screen.active > *:nth-child(2) { animation-delay: 0.05s; }
  .screen.active > *:nth-child(3) { animation-delay: 0.1s; }
  .screen.active > *:nth-child(4) { animation-delay: 0.15s; }

  /* Points fly */
  .points-fly {
    position: fixed;
    font-family: 'Orbitron', sans-serif;
    font-size: 22px;
    font-weight: 900;
    color: var(--neon-green);
    pointer-events: none;
    z-index: 9999;
    animation: flyUp 1.2s ease forwards;
  }
  @keyframes flyUp {
    0% { opacity: 1; transform: translateY(0) scale(1); }
    100% { opacity: 0; transform: translateY(-80px) scale(1.3); }
  }

  /* Typewriter */
  .typewriter {
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid var(--neon-cyan);
    animation: typing 2s steps(30, end), blink 0.7s step-end infinite;
    width: 0;
    animation-fill-mode: forwards;
  }
  @keyframes typing {
    from { width: 0; }
    to { width: 100%; }
  }
  @keyframes blink {
    50% { border-color: transparent; }
  }

  /* Mobile tweaks */
  @media (max-height: 700px) {
    .game-container { gap: 8px; padding: 12px 14px 8px; }
    .question-wrap { padding: 14px 18px; }
    .choice-btn { padding: 10px 14px; }
    .hud { padding: 8px 14px; }
  }
  @media (max-width: 480px) {
    .rules-panel { padding: 24px 20px; }
    .reward-panel { padding: 28px 20px; }
  }
</style>
</head>
<body>

<!-- ════════════════════════════════════
     START SCREEN
════════════════════════════════════ -->
<div class="screen active" id="screen-start">
  <div class="logo-wrap">
    <div class="logo-ring"></div>
    <div class="logo-ring"></div>
    <div class="logo-ring"></div>
    <div class="logo-icon">🔐</div>
  </div>
  <div class="game-title">PASSWORD DEFENDERS</div>
  <div class="game-tagline">Cybersecurity Training Module v2.0</div>
  <div class="terminal-text">
    &gt; MISSION BRIEFING...<br>
    &gt; Agent, secret files have been stolen.<br>
    &gt; Your job: crack codes &amp; learn what<br>
    &nbsp;&nbsp;makes a password truly unbreakable.<br>
    &gt; Complete all levels to earn your badge.<br>
    &gt; <span style="color:var(--neon-cyan)">Good luck, Defender.</span>
  </div>
  <button class="start-btn" id="start-btn">▶ START MISSION</button>
</div>

<!-- ════════════════════════════════════
     RULES SCREEN
════════════════════════════════════ -->
<div class="screen" id="screen-rules">
  <div class="panel rules-panel">
    <div class="screen-header">MISSION BRIEFING</div>
    <ul class="rules-list">
      <li><span class="bullet">01</span>You are a cybersecurity agent. Crack 9 password challenges to retrieve stolen documents.</li>
      <li><span class="bullet">02</span>Each question has 3 choices. Pick the strongest, safest password.</li>
      <li><span class="bullet">03</span>Correct answers earn +10 points. Wrong answers earn +0 but still teach you why.</li>
      <li><span class="bullet">04</span>You cannot skip questions — every choice matters.</li>
      <li><span class="bullet">05</span>Level up every 3 questions and unlock new security tips.</li>
      <li><span class="bullet">06</span>Earn a final grade and badge based on your total score.</li>
    </ul>
  </div>
  <button class="mission-btn" id="begin-mission-btn">⚡ BEGIN MISSION</button>
</div>

<!-- ════════════════════════════════════
     GAME SCREEN
════════════════════════════════════ -->
<div class="screen" id="screen-game">
  <div class="game-container">

    <div class="hud">
      <div class="hud-item">
        <span class="hud-label">Points</span>
        <span class="hud-value" id="hud-pts">0</span>
      </div>
      <div class="hud-center" id="locks-row">
        <span class="lock-icon">🔒</span>
        <span class="lock-icon">🔒</span>
        <span class="lock-icon">🔒</span>
        <span class="lock-icon">🔒</span>
        <span class="lock-icon">🔒</span>
        <span class="lock-icon">🔒</span>
        <span class="lock-icon">🔒</span>
        <span class="lock-icon">🔒</span>
        <span class="lock-icon">🔒</span>
      </div>
      <div class="hud-item">
        <span class="hud-label">Level</span>
        <span class="hud-value" id="hud-lvl">1</span>
      </div>
    </div>

    <div class="progress-track">
      <div class="progress-fill" id="progress-fill" style="width:0%"></div>
    </div>

    <div class="question-wrap panel">
      <div class="q-level-badge" id="q-badge">LEVEL 1 — QUESTION 1</div>
      <div class="q-scenario" id="q-scenario"></div>
      <div class="q-text" id="q-text"></div>
    </div>

    <div class="choices" id="choices"></div>

    <div class="feedback-box" id="feedback-box">
      <div class="fb-header">
        <span class="fb-title" id="fb-title"></span>
        <button class="next-btn" id="next-btn">NEXT →</button>
      </div>
      <div class="fb-tip" id="fb-tip"></div>
    </div>

  </div>
</div>

<!-- ════════════════════════════════════
     LEVEL UP SCREEN
════════════════════════════════════ -->
<div class="screen" id="screen-levelup">
  <div class="levelup-badge" id="levelup-badge">🛡️</div>
  <div class="levelup-title" id="levelup-title">LEVEL 1 COMPLETE!</div>
  <div class="levelup-sub" id="levelup-sub">You're building strong instincts.</div>
  <div class="levelup-tip-box">
    <span class="tip-label">💡 SECURITY INSIGHT</span>
    <span id="levelup-tip"></span>
  </div>
  <button class="mission-btn" id="continue-btn">CONTINUE →</button>
</div>

<!-- ════════════════════════════════════
     REWARD SCREEN
════════════════════════════════════ -->
<div class="screen" id="screen-reward">
  <div class="panel reward-panel">
    <div class="reward-badges" id="reward-badges">🏅</div>
    <div class="reward-title">MISSION COMPLETE!</div>
    <div class="reward-sub" id="reward-sub">You've finished Password Defenders and levelled up your cyber skills.</div>
    <div class="separator"></div>
    <div class="score-display">
      <span class="score-label">FINAL SCORE</span>
      <span class="score-value" id="final-score">0</span>
      <span class="score-max">/ 90 POINTS</span>
    </div>
    <div class="grade-badge" id="grade-badge">GRADE: S</div>
    <div class="separator"></div>
    <button class="restart-btn" id="restart-btn">↺ PLAY AGAIN</button>
  </div>
</div>

<script>
// ════════════════════════════════════════════
//  QUESTIONS DATA  (9 questions, 3 levels)
// ════════════════════════════════════════════
const questions = [

  // ── LEVEL 1: BASICS ──────────────────────
  {
    level: 1, qNum: 1,
    scenario: "CASE FILE: Agent Smith needs to protect his lab notes.",
    text: "Which password would be hardest for a hacker to guess?",
    choices: [
      { text: "Einstein123", correct: false,
        tip: "❌ Famous names + simple numbers are the first thing hackers try. Dictionary attacks crack these in seconds." },
      { text: "science", correct: false,
        tip: "❌ Single common words offer zero protection. Even your phone can crack this instantly." },
      { text: "SMTH_6x9#Lab!", correct: true,
        tip: "✅ This blends uppercase, lowercase, numbers, symbols, and a personal but non-obvious pattern. Hard to guess, hard to crack." }
    ]
  },
  {
    level: 1, qNum: 2,
    scenario: "CASE FILE: A teen is creating a new gaming account.",
    text: "Which password is the safest to use?",
    choices: [
      { text: "Password2024", correct: false,
        tip: "❌ 'Password' is the #1 most-used password worldwide. Adding a year doesn't help — hackers know this trick." },
      { text: "Gl0wR0ck!$77", correct: true,
        tip: "✅ Random-seeming words with deliberate letter substitutions (0 for O) plus symbols and numbers = excellent security." },
      { text: "123456789", correct: false,
        tip: "❌ Sequential numbers are cracked in under 1 second by modern hacking tools." }
    ]
  },
  {
    level: 1, qNum: 3,
    scenario: "CASE FILE: Setting up a school project login.",
    text: "What's the best approach for a secure password?",
    choices: [
      { text: "myname2008", correct: false,
        tip: "❌ Your name + birth year is public information. Social media makes this embarrassingly easy to guess." },
      { text: "qwerty", correct: false,
        tip: "❌ Keyboard patterns are pre-loaded into every hacker's tool. Cracked in milliseconds." },
      { text: "P3nc!l_Br34k$", correct: true,
        tip: "✅ A common phrase creatively scrambled with symbols. Long, complex, and unpredictable — the three golden rules." }
    ]
  },

  // ── LEVEL 2: INTERMEDIATE ─────────────────
  {
    level: 2, qNum: 4,
    scenario: "CASE FILE: Your friend reuses the same password everywhere.",
    text: "Why is reusing passwords across sites dangerous?",
    choices: [
      { text: "Use one strong one: Sp@ce99!", correct: false,
        tip: "❌ Even a strong password reused is a liability. If one site gets hacked, ALL your accounts are exposed instantly (called credential stuffing)." },
      { text: "Use a phrase: ilovecats", correct: false,
        tip: "❌ Short common phrases offer little security, and reusing them multiplies the damage if leaked." },
      { text: "Use unique ones: T!g3r_Sch00l, R@in_M@p22", correct: true,
        tip: "✅ Unique passwords per account = if one is breached, others stay safe. Use a password manager to remember them all!" }
    ]
  },
  {
    level: 2, qNum: 5,
    scenario: "CASE FILE: A company database was hacked. Millions of passwords leaked.",
    text: "Which type of password survives a database leak best?",
    choices: [
      { text: "abc123 (short, simple)", correct: false,
        tip: "❌ If the database stores unsalted hashes, 'abc123' is cracked in the same second it's downloaded." },
      { text: "Jessica1995 (name + year)", correct: false,
        tip: "❌ Personal info passwords are in every 'wordlist' hackers use for fast cracking attacks." },
      { text: "xK#9!mP2_qL@7 (random 13 chars)", correct: true,
        tip: "✅ Long, random passwords take thousands of years to brute-force even with modern computers. Length = power." }
    ]
  },
  {
    level: 2, qNum: 6,
    scenario: "CASE FILE: A student receives an email asking to 'confirm' their password.",
    text: "What is the safest response to this request?",
    choices: [
      { text: "Type password if the email looks official", correct: false,
        tip: "❌ This is phishing. Legitimate sites NEVER ask for your password via email. The site could be a fake clone." },
      { text: "Click the link to see if it's real first", correct: false,
        tip: "❌ Even clicking can install malware. Always go directly to the website by typing the address yourself." },
      { text: "Delete the email, log in directly to the real site", correct: true,
        tip: "✅ Phishing scams fool millions of people a year. Always navigate directly and enable 2FA — a second layer of protection." }
    ]
  },

  // ── LEVEL 3: ADVANCED ─────────────────────
  {
    level: 3, qNum: 7,
    scenario: "CASE FILE: Final vault — the most sensitive documents.",
    text: "Which password strategy is used by security professionals?",
    choices: [
      { text: "Monthly changed password: January2025!", correct: false,
        tip: "❌ Predictable changes (month names, numbers) give hackers an easy pattern to exploit." },
      { text: "A passphrase: correct-horse-battery-staple", correct: true,
        tip: "✅ Four random words create massive length and entropy. Easy to memorise, nearly impossible to crack. This strategy is recommended by NIST (US security standards body)." },
      { text: "Your initials + street number: JS247", correct: false,
        tip: "❌ Incredibly short and easily guessed from social media. Never use personal info." }
    ]
  },
  {
    level: 3, qNum: 8,
    scenario: "CASE FILE: A hacker has your password but you've set something extra up.",
    text: "What is Two-Factor Authentication (2FA) and why does it help?",
    choices: [
      { text: "A second, longer password stored nearby", correct: false,
        tip: "❌ Storing a backup password nearby defeats the whole point. One breach = everything gone." },
      { text: "A code sent to your phone or app after login", correct: true,
        tip: "✅ 2FA means even if a hacker has your password, they can't log in without your phone. Enable it on every account that offers it." },
      { text: "Changing your password more often", correct: false,
        tip: "❌ Frequent changes alone don't stop real-time attacks. 2FA adds a completely separate security layer." }
    ]
  },
  {
    level: 3, qNum: 9,
    scenario: "CASE FILE: FINAL CHALLENGE — The most critical choice of the mission.",
    text: "Which combination of habits best protects you online?",
    choices: [
      { text: "Strong password, write it on a sticky note", correct: false,
        tip: "❌ Physical notes are easy to photograph, steal, or find. If someone visits your room — your account is gone." },
      { text: "Memorise 20 different complex passwords", correct: false,
        tip: "❌ Human memory is unreliable for complex strings. People end up simplifying, which defeats the purpose." },
      { text: "Password manager + unique passwords + 2FA enabled", correct: true,
        tip: "✅ The gold standard. A password manager generates and stores ultra-strong unique passwords. 2FA covers you even if one leaks. This is what security experts actually do." }
    ]
  }
];

// ════════════════════════════════════════════
//  LEVEL-UP TIPS
// ════════════════════════════════════════════
const levelTips = {
  1: {
    title: "LEVEL 1 COMPLETE — PASSWORD BASICS",
    badge: "🔓",
    sub: "You've cracked the basics. Hackers rely on weak, predictable passwords.",
    tip: "The #1 rule: length beats complexity. A 20-character passphrase is stronger than an 8-character string of gibberish. Aim for at least 12 characters — every extra character multiplies the difficulty of cracking it."
  },
  2: {
    title: "LEVEL 2 COMPLETE — CYBER HYGIENE",
    badge: "🛡️",
    sub: "You're thinking like a defender now. Password habits matter as much as strength.",
    tip: "Have I Been Pwned (haveibeenpwned.com) lets you check if your email appeared in a known data breach. If it has, change your password for that service immediately — and any site where you used the same one."
  },
  3: {
    title: "ALL LEVELS COMPLETE — ELITE DEFENDER",
    badge: "🏆",
    sub: "You've mastered password security. You're now safer than 95% of internet users.",
    tip: "Tools to use right now: (1) A password manager like Bitwarden (free) or 1Password. (2) Enable 2FA on your email, social media, and gaming accounts. (3) Check haveibeenpwned.com for breaches. Share what you learned with friends — cybersecurity works better when everyone is safer."
  }
};

// ════════════════════════════════════════════
//  GAME STATE & LOGIC
// ════════════════════════════════════════════
let currentQ = 0;
let points = 0;
let awaitingLevelUp = false;

const $ = id => document.getElementById(id);

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $( id ).classList.add('active');
}

function updateHUD() {
  $('hud-pts').textContent = points;
  const q = questions[currentQ] || questions[questions.length - 1];
  $('hud-lvl').textContent = q.level;

  // locks
  const locks = document.querySelectorAll('.lock-icon');
  locks.forEach((el, i) => {
    el.textContent = i < currentQ ? '🔓' : '🔒';
    el.style.filter = i < currentQ ? 'drop-shadow(0 0 6px rgba(57,255,20,0.6))' : '';
  });

  // progress
  const pct = (currentQ / questions.length) * 100;
  $('progress-fill').style.width = pct + '%';
}

function renderQuestion() {
  const q = questions[currentQ];
  if (!q) return;

  $('q-badge').textContent = `LEVEL ${q.level} — QUESTION ${q.qNum} OF 9`;
  $('q-scenario').textContent = q.scenario;
  $('q-text').textContent = q.text;

  const choicesEl = $('choices');
  choicesEl.innerHTML = '';
  $('feedback-box').classList.remove('active', 'correct', 'wrong');

  const letters = ['A', 'B', 'C'];
  q.choices.forEach((c, idx) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.innerHTML = `<span class="choice-letter">${letters[idx]}</span>${c.text}`;
    btn.addEventListener('click', () => selectAnswer(idx));
    choicesEl.appendChild(btn);
  });

  updateHUD();
}

function selectAnswer(idx) {
  const q = questions[currentQ];
  const choice = q.choices[idx];
  const btns = document.querySelectorAll('.choice-btn');

  btns.forEach(b => b.disabled = true);

  // Highlight correct and selected wrong
  btns.forEach((b, i) => {
    if (q.choices[i].correct) {
      b.classList.add('correct-reveal');
    } else if (i === idx && !choice.correct) {
      b.classList.add('wrong-reveal');
    }
  });

  const fbBox = $('feedback-box');
  fbBox.classList.remove('correct', 'wrong');

  if (choice.correct) {
    points += 10;
    fbBox.classList.add('active', 'correct');
    $('fb-title').textContent = '✓ CORRECT — +10 POINTS';
    // fly points
    flyPoints('+10');
  } else {
    fbBox.classList.add('active', 'wrong');
    $('fb-title').textContent = '✗ INCORRECT — LEARN FROM THIS';
  }

  const cleanTip = choice.tip.replace(/^[✅❌]\s*/,'');
  const symbolMatch = choice.tip.match(/^[✅❌]/);
  const symbol = symbolMatch ? symbolMatch[0] : '';
  const color = choice.correct ? 'var(--neon-green)' : 'var(--neon-pink)';
  $('fb-tip').innerHTML = (symbol ? `<strong style="color:${color}">${symbol}</strong> ` : '') + cleanTip;
  updateHUD();
}

function flyPoints(text) {
  const el = document.createElement('div');
  el.className = 'points-fly';
  el.textContent = text;
  el.style.left = '50%';
  el.style.top = '30%';
  el.style.transform = 'translateX(-50%)';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1300);
}

function nextQuestion() {
  currentQ++;

  // Check for level up (every 3 questions)
  if (currentQ > 0 && currentQ % 3 === 0 && currentQ < questions.length) {
    const completedLevel = Math.ceil(currentQ / 3);
    showLevelUp(completedLevel);
    return;
  }

  if (currentQ >= questions.length) {
    showReward();
    return;
  }

  renderQuestion();
  showScreen('screen-game');
}

function showLevelUp(level) {
  const data = levelTips[level];
  $('levelup-badge').textContent = data.badge;
  $('levelup-title').textContent = data.title;
  $('levelup-sub').textContent = data.sub;
  $('levelup-tip').textContent = data.tip;
  showScreen('screen-levelup');
}

function showReward() {
  $('final-score').textContent = points;

  // Grade
  const pct = (points / 90) * 100;
  let grade, cls, sub, badges;
  if (pct === 100) {
    grade = 'GRADE: S — ELITE DEFENDER'; cls = 'grade-s';
    sub = 'Perfect score! You are a true cybersecurity defender. Share your knowledge with friends!';
    badges = '🏆🏅🛡️';
  } else if (pct >= 80) {
    grade = 'GRADE: A — SECURITY EXPERT'; cls = 'grade-a';
    sub = 'Excellent work! You clearly understand how to stay safe online. Almost perfect!';
    badges = '🏅🛡️✅';
  } else if (pct >= 60) {
    grade = 'GRADE: B — SECURITY AWARE'; cls = 'grade-b';
    sub = 'Good job! You know the basics but there\'s more to learn. Try again for a perfect score!';
    badges = '🛡️✅';
  } else if (pct >= 40) {
    grade = 'GRADE: C — LEARNING'; cls = 'grade-c';
    sub = 'You\'re on your way. Review the tips you received and try again to level up!';
    badges = '🔓📚';
  } else {
    grade = 'GRADE: F — NEEDS WORK'; cls = 'grade-f';
    sub = 'Passwords are your first line of defence. Review the tips carefully and try again!';
    badges = '📚🔒';
  }

  $('reward-badges').textContent = badges;
  $('reward-sub').textContent = sub;
  const gradeEl = $('grade-badge');
  gradeEl.textContent = grade;
  gradeEl.className = 'grade-badge ' + cls;

  showScreen('screen-reward');
}

function startGame() {
  currentQ = 0;
  points = 0;
  renderQuestion();
  showScreen('screen-game');
}

// ── WIRE UP BUTTONS ──────────────────────────
$('start-btn').addEventListener('click', () => showScreen('screen-rules'));
$('begin-mission-btn').addEventListener('click', startGame);
$('next-btn').addEventListener('click', nextQuestion);
$('continue-btn').addEventListener('click', () => {
  renderQuestion();
  showScreen('screen-game');
});
$('restart-btn').addEventListener('click', () => showScreen('screen-start'));
</script>
</body>
</html>
