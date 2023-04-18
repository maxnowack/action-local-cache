import { setFailed } from '@actions/core'
import { mkdirP, cp } from '@actions/io'

import { getVars } from './lib/getVars'
import { isErrorLike } from './lib/isErrorLike'
import log from './lib/log'

async function post(): Promise<void> {
  try {
    const { cacheDir, targetPath, cachePath } = getVars()

    await mkdirP(cacheDir)
    await cp(targetPath, cachePath, { recursive: true })
  } catch (error: unknown) {
    log.trace(error)
    setFailed(isErrorLike(error) ? error.message : `unknown error: ${error}`)
  }
}

void post()
