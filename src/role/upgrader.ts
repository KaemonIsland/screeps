import type { CreepMem } from '../types'

export const upgrader = {
  /** @param {Creep} creep **/
  run(creep: Creep): void {
    let { upgrading }: CreepMem = Memory?.creeps[creep.name]

    if (upgrading && creep.store[RESOURCE_ENERGY] === 0) {
      upgrading = false
      creep.say('🔄 harvest')
    }
    if (!upgrading && creep.store.getFreeCapacity() === 0) {
      upgrading = true
      creep.say('⚡ upgrade')
    }

    if (upgrading) {
      const roomController = creep.room.controller

      if (roomController && creep.upgradeController(roomController) === ERR_NOT_IN_RANGE) {
        creep.moveTo(roomController, { visualizePathStyle: { stroke: '#ffffff' } })
      }
    } else {
      const sources = creep.room.find(FIND_SOURCES)
      if (creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } })
      }
    }
  },
}
