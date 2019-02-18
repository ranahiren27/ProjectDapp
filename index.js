const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true
  }
}

// Create IPFS instance
const ipfs = new window.Ipfs(ipfsOptions)

ipfs.on('error', (e) => console.error(e))
ipfs.on('ready', async () => {
  const orbitdb = new OrbitDB(ipfs)

  // Create / Open a database
  const db = await orbitdb.log('TestDB')
  await db.load()

  // Listen for updates from peers
  db.events.on('replicated', (address) => {
 	db.iterator({ limit: -1 }).collect()
  })
})
