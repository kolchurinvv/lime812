const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","android-chrome-192x192.png","apple-touch-icon.png","browserconfig.xml","favicon-16x16.png","favicon-32x32.png","favicon.ico","featured-1/eco_pdsv_20.jpg","featured-1/fenix_adsv_18.jpg","featured-1/in-term_adsv_20.jpg","featured-1/unifloor15.jpg","home-logo.png","icons/checklist.png","jumbo-slides/slide-1.png","jumbo-slides/slide-2.png","jumbo-slides/slide-3.png","logo-w.png","mstile-150x150.png","safari-pinned-tab.svg","site.webmanifest"]),
	mimeTypes: {".png":"image/png",".xml":"application/xml",".ico":"image/vnd.microsoft.icon",".jpg":"image/jpeg",".svg":"image/svg+xml",".webmanifest":"application/manifest+json"},
	_: {
		entry: {"file":"_app/immutable/start-84a1798e.js","imports":["_app/immutable/start-84a1798e.js","_app/immutable/chunks/index-52c37fe8.js","_app/immutable/chunks/singletons-5473c337.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./chunks/0-f1ea4b2a.js'),
			() => import('./chunks/1-b9b17eab.js'),
			() => import('./chunks/2-f63379bd.js')
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
