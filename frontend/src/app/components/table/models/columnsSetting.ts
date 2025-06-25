export interface columnSetting<T>{
    label:string,
    key:keyof T,
    tooltip?:string
    sortable?:boolean,
    width?:string
}