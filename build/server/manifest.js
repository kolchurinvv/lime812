const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","android-chrome-192x192.png","apple-touch-icon.png","browserconfig.xml","favicon-16x16.png","favicon-32x32.png","favicon.ico","home-logo.png","icons/checklist.png","in-floor_heating/.DS_Store","in-floor_heating/tab-1/.DS_Store","in-floor_heating/tab-1/eco_pdsv_20.jpg","in-floor_heating/tab-1/fenix_adsv_18.jpg","in-floor_heating/tab-1/in-term_adsv_20.jpg","in-floor_heating/tab-1/unifloor15.jpg","in-floor_heating/tab-2/Fenix_ADSA_12.JPG","in-floor_heating/tab-2/Fenix_ADSV_10.JPG","in-floor_heating/tab-2/hemstedt_dr.jpg","in-floor_heating/tab-3/.DS_Store","in-floor_heating/tab-3/fenix_ldts.jpg","in-floor_heating/tab-3/in-therm_ldts.jpg","in-floor_heating/tab-3/in-thermeco.jpg","in-floor_heating/tab-3/unifloor.jpg","in-floor_heating/tab-4/.DS_Store","in-floor_heating/tab-4/in-term_afmat.jpg","in-floor_heating/tab-4/in-therm_aen.jpg","in-floor_heating/tab-4/in-therm_mh.png","in-floor_heating/tab-4/in-therm_t.png","jumbo-slides/slide-1.png","jumbo-slides/slide-2.png","jumbo-slides/slide-3.png","logo-w.png","mstile-150x150.png","outdoor_heating/.DS_Store","outdoor_heating/tab-1/eltrace_traseco.jpg","outdoor_heating/tab-1/fenix_adpsv.jpg","outdoor_heating/tab-1/hemstedt_das.jpg","outdoor_heating/tab-1/in-therm_srl.jpg","outdoor_heating/tab-2/eltrace_traseco.jpg","outdoor_heating/tab-2/hemstedt_das.jpg","outdoor_heating/tab-2/hemstedt_fs_10.jpg","outdoor_heating/tab-2/in-therm_srl.jpg","outdoor_heating/tab-3/fenix_adpsv.jpg","outdoor_heating/tab-3/hemstedt_brf-im.jpg","safari-pinned-tab.svg","site.webmanifest","thermostats/.DS_Store","thermostats/tab-1/eberle_f2a_50.JPG","thermostats/tab-1/eberle_fre_525-31.JPG","thermostats/tab-1/eberle_rtr-e_61221.JPG","thermostats/tab-1/in-therm_rtc_70.JPG","thermostats/tab-2/in-therm_e51.JPG","thermostats/tab-2/in-therm_e91.JPG","thermostats/tab-2/in-therm_wl51.jpg","thermostats/tab-2/in-therm_wl91.jpg","thermostats/tab-3/eberle_DTR-E.jpg","thermostats/tab-3/eberle_ITR-4.jpg","thermostats/tab-3/eberle_esd424003.jpg","thermostats/tab-3/eberle_tft_524004.jpg"]),
	mimeTypes: {".png":"image/png",".xml":"application/xml",".ico":"image/vnd.microsoft.icon",".jpg":"image/jpeg",".JPG":"image/jpeg",".svg":"image/svg+xml",".webmanifest":"application/manifest+json"},
	_: {
		entry: {"file":"_app/immutable/start-0a83e886.js","imports":["_app/immutable/start-0a83e886.js","_app/immutable/chunks/index-4a554cae.js","_app/immutable/chunks/singletons-442c2e70.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./chunks/0-dbbc2ee9.js'),
			() => import('./chunks/1-af0ab02b.js'),
			() => import('./chunks/2-ca784ec3.js')
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
