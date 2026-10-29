(() => {
  'use strict';
  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const setTheme = theme => {
    root.dataset.theme = theme;
    if (themeButton) {
      themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
      themeButton.setAttribute('aria-pressed', String(theme === 'light'));
    }
  };
  let storedTheme;
  try { storedTheme = localStorage.getItem('omar-portfolio-theme'); } catch {}
  setTheme(storedTheme === 'light' ? 'light' : 'dark');
  themeButton?.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
    try { localStorage.setItem('omar-portfolio-theme', theme); } catch {}
  });

  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-categories]')];
  const filterStatus = document.querySelector('[data-filter-status]');
  filters.forEach(button => button.addEventListener('click', () => {
    const value = button.dataset.filter;
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    cards.forEach(card => {
      const visible = value === 'all' || card.dataset.categories.split(' ').includes(value);
      card.hidden = !visible;
      if (visible) count++;
    });
    if (filterStatus) filterStatus.textContent = `${count} ${count === 1 ? 'project' : 'projects'} shown`;
  }));

  // These are deliberately fixed illustrative fixtures, not live AI generation.
  const stages = [
    { title: 'Start with the learning goal', body: '<p>Make the intended skill explicit before asking AI for an exercise.</p><div class="demo-field"><span>Learning goal</span>Infer a character’s motivation from a short passage.</div><div class="mini-tags"><span class="mini-tag">Reading</span><span class="mini-tag">Inference</span><span class="mini-tag">Human-reviewed</span></div>', status: 'The goal guides the prompt', next: 'Explore the draft' },
    { title: 'A plausible draft needs a check', body: '<p>Clear instructions can still sit above a passage that gives the answer away.</p><div class="demo-field"><span>Illustrative first passage</span>Maya left the bag because she wanted to help Sam.</div><div class="review-flag">The motivation is stated directly. There is little to infer.</div>', status: 'Fluent does not mean fit for purpose', next: 'See the review' },
    { title: 'Review the passage, not just the prompt', body: '<p>An expert checks whether the material supports the intended skill and requests a focused revision.</p><div class="demo-field"><span>Reviewer’s direction</span>Show the character’s actions without naming her motive. Keep enough clues for an evidence-based answer.</div><div class="mini-tags"><span class="mini-tag">Check the passage</span><span class="mini-tag">Keep versions comparable</span></div>', status: 'A focused revision, with a reason', next: 'See the decision' },
    { title: 'Release is a human decision', body: '<p>The passage and question are reviewed together before the exercise is used with learners.</p><div class="demo-field"><span>Illustrative revision</span>Maya saw Sam juggling his books, put down her bag and reached for his stack.</div><div class="mini-tags"><span class="mini-tag">Check answer and guidance</span><span class="mini-tag">Final human review</span></div>', status: 'Why did Maya put her bag down?', next: 'Start again' }
  ];
  document.querySelectorAll('[data-workflow]').forEach(widget => {
    const tabs = [...widget.querySelectorAll('[data-stage]')];
    const title = widget.querySelector('[data-stage-title]');
    const body = widget.querySelector('[data-stage-body]');
    const status = widget.querySelector('[data-stage-status]');
    const next = widget.querySelector('[data-stage-next]');
    let active = 0;
    const render = index => {
      active = index;
      tabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === active)); tab.tabIndex = i === active ? 0 : -1; });
      title.textContent = stages[active].title;
      body.innerHTML = stages[active].body;
      status.textContent = stages[active].status;
      next.textContent = stages[active].next + ' →';
      const panel = widget.querySelector('[role=tabpanel]');
      panel.setAttribute('aria-labelledby', tabs[active].id);
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => render(i));
      tab.addEventListener('keydown', event => {
        let target;
        if (event.key === 'ArrowRight') target = (i + 1) % tabs.length;
        if (event.key === 'ArrowLeft') target = (i + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') target = 0;
        if (event.key === 'End') target = tabs.length - 1;
        if (target !== undefined) { event.preventDefault(); render(target); tabs[target].focus(); }
      });
    });
    next.addEventListener('click', () => render((active + 1) % stages.length));
    render(0);
  });

  document.querySelectorAll('[data-pathway-demo]').forEach(demo => {
    const slider = demo.querySelector('input');
    const output = demo.querySelector('output');
    const update = () => {
      output.textContent = slider.value + '%';
      demo.querySelectorAll('[data-learner-score]').forEach(learner => {
        const score = Number(learner.dataset.learnerScore);
        learner.querySelector('[data-assignment]').textContent = score < Number(slider.value) ? 'Core practice' : 'Extension practice';
      });
    };
    slider.addEventListener('input', update);
    update();
  });

  const feedbackExamples = {
    primary: 'You found a useful clue. Next time, explain how it supports your answer.',
    secondary: 'You identified relevant evidence. Explain the link between that clue and your interpretation.',
    older: 'Your interpretation has relevant textual support. Strengthen the reasoning by explaining how the selected evidence justifies it.'
  };
  document.querySelectorAll('[data-feedback-demo]').forEach(demo => {
    const controls = [...demo.querySelectorAll('[data-feedback-level]')];
    const output = demo.querySelector('[data-feedback-output]');
    controls.forEach(button => button.addEventListener('click', () => {
      controls.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      output.textContent = feedbackExamples[button.dataset.feedbackLevel];
    }));
  });

  document.querySelectorAll('[data-quality-demo]').forEach(demo => {
    const controls = [...demo.querySelectorAll('[data-quality-mode]')];
    const result = demo.querySelector('[data-quality-result]');
    controls.forEach(button => button.addEventListener('click', () => {
      controls.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      const detailed = button.dataset.qualityMode === 'mapping';
      result.classList.toggle('pass', !detailed);
      result.textContent = detailed
        ? 'Needs review: both totals are 4, but the evidence marks have been attributed to the wrong skill.'
        : 'Total-only check passes: expected total 4, observed total 4. The skill mismatch is invisible to this check.';
    }));
  });
})();
