import type { ProgramRecord } from "@/content/types"
import { programCategoryLabel } from "@/lib/labels"
type ProgramFilters = { query?: string; goal?: string; format?: string; status?: string }
const normalize = (value:string) => value.toLocaleLowerCase("tr-TR").replace(/ı/g,"i").normalize("NFD").replace(/[\u0300-\u036f]/g,"")
export function filterPrograms(programs:ProgramRecord[], {query="",goal="all",format="all",status="all"}:ProgramFilters) {
  const search=normalize(query.trim())
  return programs.filter(program=>{
    if(search&&!normalize(program.title+" "+programCategoryLabel(program.category)+" "+(program.shortDescription??"")).includes(search))return false
    if(goal!=="all"&&!(program.goals??[]).some(item=>item===goal))return false
    if(format!=="all"&&program.format!==format)return false
    if(status!=="all"&&program.applicationStatus!==status)return false
    return true
  })
}
