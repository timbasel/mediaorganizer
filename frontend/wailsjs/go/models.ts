export namespace backend {
	
	export class Settings {
	    database: string;
	    sources: string[];
	    destination: string;
	    image_extensions: string[];
	    video_extensions: string[];
	
	    static createFrom(source: any = {}) {
	        return new Settings(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.database = source["database"];
	        this.sources = source["sources"];
	        this.destination = source["destination"];
	        this.image_extensions = source["image_extensions"];
	        this.video_extensions = source["video_extensions"];
	    }
	}

}

