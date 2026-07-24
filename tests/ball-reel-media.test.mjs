import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import test from "node:test"
import ts from "typescript"

const expectedClips = [
  {
    src: "/ballvid1.mp4",
    poster: "/ballvid1-poster.jpg",
    srcHash: "1911982a86bf321c303d7dcfbcfbe7b830eb9d6ea78ba8f688e4f123ce3ec915",
    posterHash:
      "6c78e7a94102569d10071c0f5f83dd463e4aacf97d4de9eebf2f45370a9ae3d0",
  },
  {
    src: "/ballvid2.mp4",
    poster: "/ballvid2-poster.jpg",
    srcHash: "d0043e5e7bff74ab78ff88949082207f7e104e5f57821af23f357ae4fd2cdc52",
    posterHash:
      "78a0d5eddfa7a92f41db44198c5a7372cc18973b9ca97cf300044d624a2f4ded",
  },
]

function readClips() {
  const source = readFileSync(
    new URL("../app/components/BallReel.tsx", import.meta.url),
    "utf8",
  )
  const sourceFile = ts.createSourceFile(
    "BallReel.tsx",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  )
  const declarations = sourceFile.statements
    .filter(ts.isVariableStatement)
    .flatMap((statement) => statement.declarationList.declarations)
  const clipsDeclaration = declarations.find(
    (declaration) =>
      ts.isIdentifier(declaration.name) && declaration.name.text === "clips",
  )

  assert.ok(
    clipsDeclaration?.initializer &&
      ts.isArrayLiteralExpression(clipsDeclaration.initializer),
    "clips should be an array literal",
  )

  return clipsDeclaration.initializer.elements.map((element) => {
    assert.ok(ts.isObjectLiteralExpression(element), "each clip should be an object")
    const properties = Object.fromEntries(
      element.properties.map((property) => {
        assert.ok(
          ts.isPropertyAssignment(property) &&
            ts.isIdentifier(property.name) &&
            ts.isStringLiteral(property.initializer),
          "clip properties should be string literals",
        )
        return [property.name.text, property.initializer.text]
      }),
    )

    return { src: properties.src, poster: properties.poster }
  })
}

function sha256(path) {
  return createHash("sha256")
    .update(readFileSync(new URL(`../public${path}`, import.meta.url)))
    .digest("hex")
}

test("the reel contains exactly the two videos with matching first-frame posters", () => {
  assert.deepEqual(
    readClips(),
    expectedClips.map(({ src, poster }) => ({ src, poster })),
  )
})

test("the verified video and first-frame poster pairs keep their expected content", () => {
  for (const { src, poster, srcHash, posterHash } of expectedClips) {
    assert.equal(sha256(src), srcHash, `${src} changed`)
    assert.equal(sha256(poster), posterHash, `${poster} changed`)
  }
})
