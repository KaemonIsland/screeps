import '@types/screeps'
// memory extension samples
interface CreepMem extends CreepMemory {
  role?: string
  room?: string
  working?: boolean
  building?: boolean
  upgrading?: boolean
}

interface Memory {
  [key: string]: any
  uuid: number
  log: any
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any
  }
}
