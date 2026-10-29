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
  const url = URL.createObjectURL(new Blob(['\ufeff', text], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url; link.download = '涵艺夜游-项目需求单.txt'; document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  status.textContent = '需求单已生成，请查看下载文件。尚未发送，请通过您已知的官方联系方式联系团队。';
});
