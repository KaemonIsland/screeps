export const harvester = {
  run: (creep: Creep): void => {
    // Obtains Resources
    if (creep.store.getFreeCapacity() > 0) {
      const targets = creep.room.find(FIND_SOURCES_ACTIVE)
      const creepTarget = Number(creep.name.split('').slice(9).join('')) % 2 ? 1 : 0

      if (targets.length) {
        if (creep.harvest(targets[creepTarget]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[creepTarget], { visualizePathStyle: { stroke: '#ffffff' } })
        }
      }
    } else {
      const targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (
            (structure.structureType === STRUCTURE_EXTENSION ||
              structure.structureType === STRUCTURE_SPAWN ||
              structure.structureType === STRUCTURE_TOWER) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          )
        },
      })

      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } })
        }
      }
    }
  },
}
