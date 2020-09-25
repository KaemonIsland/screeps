import { builder, harvester, upgrader } from './role'
import type { CreepMem } from './types'
import { ErrorMapper } from 'utils/ErrorMapper'

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`)

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name]
    }
  }

  // Counts creeps by role
  const creepCounts: { [key: string]: number } = {}

  Object.entries(Game.creeps).forEach(([name, creep]) => {
    const { role }: CreepMem = creep.memory

    if (role && creepCounts[role]) {
      creepCounts[role] += 1
    } else if (role) {
      creepCounts[role] = 1
    }
  })

  console.log(JSON.stringify(creepCounts))

  // Builds more harvesters if we fall under a certain number
  if ((creepCounts.harvester || 0) < 10) {
    const newName = `Harvester${Game.time}`
    console.log('Spawning new harvester: ' + newName)
    Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], newName, {
      memory: { role: 'harvester' },
    })
  }

  // Builds more builders if we fall under a certain number
  if ((creepCounts.builder || 0) < 5) {
    const newName = `Builder${Game.time}`
    console.log('Spawning new builder: ' + newName)
    Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'builder' } })
  }

  // Builds more upgraders if we fall under a certain number
  if ((creepCounts.upgrader || 0) < 5) {
    const newName = `Upgrader${Game.time}`
    console.log('Spawning new upgrader: ' + newName)
    Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'upgrader' } })
  }

  // Selects tower, TODO Create tower + select it
  // const tower = Game.getObjectById('c25ebd7c9ccbc183a6df4a0e')

  // if (tower) {
  //     const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
  //         filter: (structure) => structure.hits < structure.hitsMax
  //     })

  //     if(closestDamagedStructure) {
  //         tower.repair(closestDamagedStructure)
  //     }

  //     const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS)

  //     if(closestHostile) {
  //         tower.attack(closestHostile);
  //     }
  // }

  // Delegates different tasks based on roles
  Object.entries(Game.creeps).forEach(([name, creep]) => {
    const { role }: CreepMem = creep.memory

    if (role === 'harvester') {
      harvester.run(creep)
    }

    if (role === 'upgrader') {
      upgrader.run(creep)
    }

    if (role === 'builder') {
      builder.run(creep)
    }
  })
})
