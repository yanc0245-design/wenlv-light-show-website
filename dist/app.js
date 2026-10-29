'use strict';
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  toggle.setAttribute('aria-label', expanded ? '展开导航' : '收起导航');
  navigation.classList.toggle('is-open', !expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', '展开导航');
}));
const dialog = document.querySelector('#inquiry-dialog');
document.querySelector('#open-inquiry').addEventListener('click', () => dialog.showModal());
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); }});
document.querySelector('#inquiry-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const project = String(data.get('project')).trim();
  const needs = String(data.get('needs')).trim();
  const status = document.querySelector('#form-status');
  if (!project || !needs) { status.textContent = '请填写项目所在地与期望效果。'; return; }
  const text = ['涵艺夜游｜项目需求单', '', '项目名称 / 所在地：' + project, '场地类型：' + data.get('venue'), '预计预算：' + data.get('budget'), '', '期望效果与时间安排：', needs, '', '此需求单在您的设备本地生成，尚未发送给涵艺团队。', '请通过您已知的官方联系方式发送，以便进一步沟通。'].join('\n');
  document.querySelector('#brief-text').value = text;
  document.querySelector('#brief-result').hidden = false;
  status.textContent = '沟通内容已生成，尚未发送。可复制后通过微信联系团队。';
});

const sceneData = {
  lawn: { kicker: '01 / OPEN-AIR THEATER', title: '让开阔空间，成为入夜后的剧场。', description: '以舞台表演为中心，在舞台后方组织激光与烟雾光影，结合音乐节奏，让游客获得完整的观看体验。', view: '游客面向舞台，光影与表演围绕同一观看方向展开。', content: '在地故事、舞蹈演艺与光影段落串联，可结合节庆主题设计。', conditions: '重点确认风况、布烟、供电、观众动线及安全观看区域。', venue: '广场 / 草坪' },
  lake: { kicker: '02 / WATERFRONT STAGE', title: '让水岸的夜，拥有一个叙事中心。', description: '结合岸线与水面条件，讨论临水或水上舞台的可能，将演艺主体与后方光影整合为清晰的观看画面。', view: '以岸上观看区为出发点，确定主视角、舞台朝向与合适视距。', content: '围绕水域文化和地方故事，组织舞蹈、音乐及光影叙事。', conditions: '重点确认舞台结构、防水用电、水位风况、运维通道及安全隔离。', venue: '湖面 / 水域' },
  building: { kicker: '03 / CULTURAL PROJECTION', title: '让文化内容，有一个可感知的载体。', description: '以建筑表面或独立幕布为载体，将文化图案、影像与音乐编排成有起伏的夜间段落；也可结合前景演艺。', view: '根据投影载体与游客位置，确定画面比例、设备点位及观看区域。', content: '从建筑特征与在地文化提炼主题，再组织原创或获授权的视觉内容。', conditions: '重点确认载体适配、环境光、投射距离、幕布抗风及场地许可。', venue: '建筑 / 幕布投影' }
};
let selectedScene = 'lawn';
const sceneTabs = [...document.querySelectorAll('[data-scene]')];
function selectScene(key, focusTab = false) {
  selectedScene = key;
  const data = sceneData[key];
  for (const field of ['kicker', 'title', 'description', 'view', 'content', 'conditions']) {
    document.querySelector('#scene-' + field).textContent = data[field];
  }
  sceneTabs.forEach(button => {
    const active = button.dataset.scene === key;
    button.setAttribute('aria-selected', String(active));
    button.tabIndex = active ? 0 : -1;
    if (active && focusTab) button.focus();
  });
  document.querySelector('#scene-panel').setAttribute('aria-labelledby', 'scene-tab-' + key);
}
sceneTabs.forEach((button, index) => {
  button.addEventListener('click', () => selectScene(button.dataset.scene));
  button.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % sceneTabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + sceneTabs.length) % sceneTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = sceneTabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectScene(sceneTabs[next].dataset.scene, true); }
  });
});
document.querySelector('#scene-inquiry').addEventListener('click', () => {
  document.querySelector('select[name="venue"]').value = sceneData[selectedScene].venue;
  document.querySelector('#form-status').textContent = '';
  dialog.showModal();
});

document.querySelector('#copy-brief').addEventListener('click', async () => {
  const field = document.querySelector('#brief-text');
  const status = document.querySelector('#form-status');
  try {
    if (!navigator.clipboard || !window.isSecureContext) throw new Error('Manual copy required');
    await navigator.clipboard.writeText(field.value);
    status.textContent = '已复制，可粘贴到微信发送给项目对接人。';
  } catch {
    field.focus(); field.select(); field.setSelectionRange(0, field.value.length);
    status.textContent = '请长按已选文字并复制，再通过微信发送。';
  }
});
