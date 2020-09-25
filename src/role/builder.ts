import type { CreepMem } from '../types'

export const builder = {
  run: (creep: Creep): void => {
    let { building }: CreepMem = Memory?.creeps[creep.name]

    if (building && creep.store[RESOURCE_ENERGY] === 0) {
      building = false
      creep.say('🔄 harvest')
    }

    if (!building && creep.store.getFreeCapacity() === 0) {
      building = true
      creep.say('🚧 build')
    }

    const targets = creep.room.find(FIND_CONSTRUCTION_SITES)

    if (building && targets.length) {
      const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)

      if (target) {
        if (creep.build(target) !== 0) {
          creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } })
        }
      }
    } else {
      const sources = creep.room.find(FIND_SOURCES)

      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } })
      }
    }
  },
}
