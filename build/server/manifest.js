const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","android-chrome-192x192.png","apple-touch-icon.png","browserconfig.xml","favicon-16x16.png","favicon-32x32.png","favicon.ico","featured-1/eco_pdsv_20.jpg","featured-1/fenix_adsv_18.jpg","featured-1/in-term_adsv_20.jpg","featured-1/unifloor15.jpg","home-logo.png","icons/checklist.png","jumbo-slides/slide-1.png","jumbo-slides/slide-2.png","jumbo-slides/slide-3.png","logo-w.png","mstile-150x150.png","safari-pinned-tab.svg","site.webmanifest"]),
	mimeTypes: {".png":"image/png",".xml":"application/xml",".ico":"image/vnd.microsoft.icon",".jpg":"image/jpeg",".svg":"image/svg+xml",".webmanifest":"application/manifest+json"},
	_: {
		entry: {"file":"_app/immutable/start-a4236af1.js","imports":["_app/immutable/start-a4236af1.js","_app/immutable/chunks/index-fc6c087c.js","_app/immutable/chunks/singletons-95600987.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./chunks/0-b6037092.js'),
			() => import('./chunks/1-26fd1ce3.js'),
			() => import('./chunks/2-910d90c8.js')
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
