const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","android-chrome-192x192.png","apple-touch-icon.png","browserconfig.xml","favicon-16x16.png","favicon-32x32.png","favicon.ico","home-logo.png","icons/checklist.png","in-floor_heating/.DS_Store","in-floor_heating/tab-1/.DS_Store","in-floor_heating/tab-1/eco_pdsv_20.jpg","in-floor_heating/tab-1/fenix_adsv_18.jpg","in-floor_heating/tab-1/in-term_adsv_20.jpg","in-floor_heating/tab-1/unifloor15.jpg","jumbo-slides/slide-1.png","jumbo-slides/slide-2.png","jumbo-slides/slide-3.png","logo-w.png","mstile-150x150.png","outdoor_heating/.DS_Store","safari-pinned-tab.svg","site.webmanifest","thermostats/.DS_Store","thermostats/tab-1/eberle_f2a_50.JPG","thermostats/tab-1/eberle_fre_525-31.JPG","thermostats/tab-1/eberle_rtr-e_61221.JPG","thermostats/tab-1/in-therm_rtc_70.JPG"]),
	mimeTypes: {".png":"image/png",".xml":"application/xml",".ico":"image/vnd.microsoft.icon",".jpg":"image/jpeg",".svg":"image/svg+xml",".webmanifest":"application/manifest+json",".JPG":"image/jpeg"},
	_: {
		entry: {"file":"_app/immutable/start-25e92900.js","imports":["_app/immutable/start-25e92900.js","_app/immutable/chunks/index-fc6c087c.js","_app/immutable/chunks/singletons-95600987.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./chunks/0-b24c2499.js'),
			() => import('./chunks/1-26fd1ce3.js'),
			() => import('./chunks/2-f324c8f8.js')
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
