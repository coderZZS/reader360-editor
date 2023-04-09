const nodeVersion = require('node-version')
const color = require('colors')

const NEED_NODE_VERSION = '18.15.0'

function checkNodeVersion() {
    const { long: currentNodeVersion } = nodeVersion
    if (NEED_NODE_VERSION !== currentNodeVersion) {
        console.log(
            color.bgRed(`当前的node版本是：${nodeVersion.long},
本项目依赖的node版本为：${NEED_NODE_VERSION},
已终止程序执行，请切换到对应的node版本。
                `)
        )
        throw new Error('version error')
    }
    console.log(`node版本正确，continue...`)
}
checkNodeVersion()
