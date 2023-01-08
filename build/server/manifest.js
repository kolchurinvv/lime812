const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","android-chrome-192x192.png","apple-touch-icon.png","browserconfig.xml","favicon-16x16.png","favicon-32x32.png","favicon.ico","home-logo.png","icons/checklist.png","jumbo-slides/slide-1.png","jumbo-slides/slide-2.png","jumbo-slides/slide-3.png","logo-w.png","mstile-150x150.png","safari-pinned-tab.svg","site.webmanifest"]),
	mimeTypes: {".png":"image/png",".xml":"application/xml",".ico":"image/vnd.microsoft.icon",".svg":"image/svg+xml",".webmanifest":"application/manifest+json"},
	_: {
		entry: {"file":"_app/immutable/start-85a424ab.js","imports":["_app/immutable/start-85a424ab.js","_app/immutable/chunks/index-5e1f1207.js","_app/immutable/chunks/singletons-7365a2f5.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./chunks/0-583192ff.js'),
			() => import('./chunks/1-f94a12eb.js'),
			() => import('./chunks/2-9183a74f.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: () => import('./chunks/_server.ts-e06080de.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

export { manifest };
//# sourceMappingURL=manifest.js.map
