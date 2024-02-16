import * as fs from "fs"
import * as path from "path"

export function writeCache(key: string, data: any) {
  console.log("WRITE", key)

  const filename = `.cache/${key}.json`
  const dirname = path.dirname(filename)
  fs.mkdirSync(dirname, { recursive: true })

  const json = JSON.stringify(data, null, 2)
  fs.writeFileSync(filename, json)
}

export function loadCache(key: string): any | undefined {
  try {
    const filename = `.cache/${key}.json`
    const data = fs.readFileSync(filename, "utf8")

    console.log("READ", key)

    return JSON.parse(data)
  } catch (error) {
    console.log("MISS", key)
    return undefined
  }
}
