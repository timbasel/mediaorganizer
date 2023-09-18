// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {backend} from '../models';

export function GenerateThumbnail(arg1:string,arg2:number):Promise<void>;

export function GetMedia(arg1:backend.MediaFilter):Promise<Array<backend.Media>>;

export function GetMediaByID(arg1:string):Promise<backend.Media>;

export function GetMediaCount(arg1:backend.MediaFilter):Promise<number>;

export function GetMediaStats():Promise<backend.MediaStats>;

export function GetSettings():Promise<backend.Settings>;

export function GetSettingsPath():Promise<string>;

export function IndexDirectory(arg1:string,arg2:backend.MediaStats):Promise<void>;

export function IndexSources():Promise<void>;

export function LoadSettings(arg1:string):Promise<void>;

export function OpenDirectoryDialog():Promise<string>;

export function OpenFileDialog():Promise<string>;

export function SaveSettings(arg1:backend.Settings):Promise<void>;
