import type { SiteLang } from '../utils/i18n';

export interface PortfolioProject {
	id: string;
	level: number;
	glyph: string;
	title: string;
	summary: Record<SiteLang, string>;
	stack: string[];
	links: {
		demo?: string;
		github?: string;
		caseStudy?: string;
	};
}

const rawProjects: PortfolioProject[] = [
	{
		id: 'fitness-assistant',
		level: 1,
		glyph: '💪',
		title: 'Fitness Assistant',
		summary: {
			es: 'Asistente fitness con rutinas personalizadas, seguimiento de progreso y recomendaciones de nutricion para objetivos reales.',
			en: 'Fitness assistant with personalized routines, progress tracking, and nutrition recommendations focused on real goals.'
		},
		stack: ['Python', 'Streamlit'],
		links: {
			demo: 'https://fitness-assistant-vwbd5v4xbajjwfetfufbmc.streamlit.app/',
			github: 'https://github.com/eduardo343/Fitness-Assistant.git',
			caseStudy: '/blog/using-mdx'
		}
	},
	{
		id: 'trellcord',
		level: 2,
		glyph: '📱',
		title: 'Trellcord',
		summary: {
			es: 'Plataforma colaborativa que mezcla gestion de tareas, chat en tiempo real y dinamicas de equipo para entornos de trabajo remotos.',
			en: 'Collaborative platform mixing task management, real-time chat, and team dynamics for remote work environments.'
		},
		stack: ['React', 'Node', 'MongoDB'],
		links: {
			demo: 'https://vercel.com/eduardo343s-projects/trellcord/2HNeVJDFudXECzcAz2vLFUzRQCrS',
			github: 'https://github.com/eduardo343/Trellcord.git',
			caseStudy: '/blog/markdown-style-guide'
		}
	},
	{
		id: 'casino-testing-app',
		level: 3,
		glyph: '🎰',
		title: 'Casino Testing App',
		summary: {
			es: 'App para validacion y simulacion de juegos de casino con analisis de reglas, estadisticas y escenarios de prueba automatizados.',
			en: 'App for casino game validation and simulation with rule analysis, metrics, and automated test scenarios.'
		},
		stack: ['Python', 'Streamlit', 'REST API'],
		links: {
			demo: 'https://casino-testing.streamlit.app/',
			github: 'https://github.com/eduardo343/Casino-Testing-.git'
		}
	},
	{
		id: 'techstore',
		level: 4,
		glyph: '🛒',
		title: 'TechStore',
		summary: {
			es: 'E-commerce full stack con inventario en tiempo real, pagos seguros y panel administrativo orientado a operacion diaria.',
			en: 'Full-stack e-commerce with real-time inventory, secure payments, and an admin dashboard tailored for daily operations.'
		},
		stack: ['Laravel 11', 'Angular 19', 'MongoDB'],
		links: {
			caseStudy: '/blog/first-post'
		}
	},
	{
		id: 'taskflow',
		level: 5,
		glyph: '📋',
		title: 'TaskFlow',
		summary: {
			es: 'SaaS de gestion de proyectos con colaboracion en vivo, tableros Kanban, reportes automaticos y enfoque multi-tenant.',
			en: 'Project-management SaaS with live collaboration, Kanban boards, automated reporting, and a multi-tenant architecture.'
		},
		stack: ['Laravel 11', 'Angular 19', 'Firebase'],
		links: {
			caseStudy: '/blog/second-post'
		}
	},
	{
		id: 'smartfinance',
		level: 6,
		glyph: '💰',
		title: 'SmartFinance',
		summary: {
			es: 'Plataforma API fintech con seguridad de nivel empresarial, deteccion de fraude en tiempo real y cumplimiento regulatorio.',
			en: 'Fintech API platform with enterprise-grade security, real-time fraud detection, and regulatory compliance.'
		},
		stack: ['Laravel 11', 'DynamoDB', 'Machine Learning'],
		links: {
			caseStudy: '/blog/third-post'
		}
	}
];

export const portfolioProjects = rawProjects.filter((project) => {
	const haystack = `${project.id} ${project.title}`.toLowerCase();
	return !haystack.includes('toka');
});
