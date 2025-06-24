export interface Pagination<T>{
    page:number,
    pageSize:number,
    totalPages:number
    orderBy?:keyof T
    orderDirection?:"asc"|"desc"
}