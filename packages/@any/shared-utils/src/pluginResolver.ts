const pluginRE = /^(@ndogkit\/|ndogkit-|@[\w-]+\/ndogkit-)plugin-/
const scopeRE = /^@[\w-]+\//

export const isPlugin = (id: string) => pluginRE.test(id)

export const matchesPluginId = (input: string, full: string) => {
  const short = full.replace(pluginRE, '')
  return (
    // input is full
    full === input ||
    // input is short without scope
    short === input ||
    // input is short with scope
    short === input.replace(scopeRE, '')
  )
}
