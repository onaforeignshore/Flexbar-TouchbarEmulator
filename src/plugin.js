const { plugin, logger, pluginPath, resourcesPath } = require("@eniac/flexdesigner")

/**
 * Called when a plugin key is loaded
 * @param {Object} payload alive key data
 * {
 *  serialNumber: '',
 *  keys: []
 * }
 */
plugin.on('plugin.alive', (payload) => {
  logger.info('Plugin alive:', payload)

  let hasEmulator = false
  for (let key of payload.keys) {
    if (key.cid === 'com.chino.touchbaremulator.emulator') {
      plugin.transport.call("touchbar-tool", {
          serialNumber: payload.serialNumber,
          key: key,
          cmd: 'start'
      })
      hasEmulator = true
    }
  }

  if (!hasEmulator) {
    plugin.transport.call("touchbar-tool", {
        serialNumber: payload.serialNumber,
        cmd: 'stop'
    })
  }
})

// Connect to flexdesigner and start the plugin
plugin.start()
