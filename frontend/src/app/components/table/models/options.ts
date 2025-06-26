export interface tableOption<T>{
    label:string,
    action:(element:T)=>{}
}