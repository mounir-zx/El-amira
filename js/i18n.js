const i18n = {
  data: null,
  async load() {
    try {
      const response = await fetch('js/translations.json');
      this.data = await response.json();
    } catch (error) {
      console.error('Unable to load translations:', error);
      this.data = {};
    }
  },
  translate(lang) {
    if (!this.data || !this.data[lang]) return;
    document.documentElement.lang = lang;
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (this.data[lang][key]) el.textContent = this.data[lang][key];
    });
    document.querySelectorAll('[data-i18n-key]').forEach(el => {
      const key = el.dataset.i18nKey;
      const attr = el.dataset.i18nAttr || 'aria-label';
      if (this.data[lang][key]) el.setAttribute(attr, this.data[lang][key]);
    });
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  await i18n.load();
  const defaultLang = 'ar';
  i18n.translate(defaultLang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => i18n.translate(btn.dataset.lang));
  });
});
