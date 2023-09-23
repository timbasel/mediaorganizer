export namespace backend {
	
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

