export type SiteLang = 'es' | 'en';

export function getLang(url: URL): SiteLang {
	return url.searchParams.get('lang') === 'en' ? 'en' : 'es';
}

export function withLang(path: string, lang: SiteLang): string {
	if (/^https?:\/\//i.test(path)) {
		return path;
	}

	const url = new URL(path, 'https://alanugarte.dev');
	url.searchParams.set('lang', lang);
	return `${url.pathname}${url.search}${url.hash}`;
}
