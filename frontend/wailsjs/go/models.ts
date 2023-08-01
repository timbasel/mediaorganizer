export namespace backend {
	
	export class Media {
	    id: string;
	    path: string;
	    originalPath: string;
	    hash: number;
	    size: number;
	    // Go type: time
	    modTime: any;
	    // Go type: time
	    createdAt: any;
	    // Go type: time
	    updatedAt: any;
	    name: string;
	    fileType: string;
	    thumbnailPath: string;
	
	    static createFrom(source: any = {}) {
	        return new Media(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.path = source["path"];
	        this.originalPath = source["originalPath"];
	        this.hash = source["hash"];
	        this.size = source["size"];
	        this.modTime = this.convertValues(source["modTime"], null);
	        this.createdAt = this.convertValues(source["createdAt"], null);
	        this.updatedAt = this.convertValues(source["updatedAt"], null);
	        this.name = source["name"];
	        this.fileType = source["fileType"];
	        this.thumbnailPath = source["thumbnailPath"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class MediaFilter {
	    limit: number;
	    offset: number;
	
	    static createFrom(source: any = {}) {
	        return new MediaFilter(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.limit = source["limit"];
	        this.offset = source["offset"];
	    }
	}
	export class MediaStats {
	    count: number;
	    size: number;
	
	    static createFrom(source: any = {}) {
	        return new MediaStats(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.count = source["count"];
	        this.size = source["size"];
	    }
	}
	export class Settings {
	    database: string;
	    thumbnailDirectory: string;
	    sources: string[];
	    destination: string;
	    imageExtensions: string[];
	    videoExtensions: string[];
	
	    static createFrom(source: any = {}) {
	        return new Settings(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.database = source["database"];
	        this.thumbnailDirectory = source["thumbnailDirectory"];
	        this.sources = source["sources"];
	        this.destination = source["destination"];
	        this.imageExtensions = source["imageExtensions"];
	        this.videoExtensions = source["videoExtensions"];
	    }
	}

}

