import { join } from 'node:path'
import ts from '@casl/dx/typescript'

describe('subject autocomplete', () => {
  it.each(['can', 'cannot', 'relevantRuleFor'])('%s narrows subjects by action', method => {
    expect(subjectCompletions(method, 'delete')).toEqual(['user:invite'])
    expect(subjectCompletions(method, 'manage')).toEqual(['campaign'])
    expect(subjectCompletions(method, 'create')).toEqual(['campaign', 'user:invite'])
  })

  it.each(['can', 'cannot', 'relevantRuleFor'])('%s preserves literal actions alongside string actions', method => {
    const abilities = "['read', 'User'] | [string, 'BlogPost']"

    expect(subjectCompletions(method, 'read', abilities)).toEqual(['BlogPost', 'User'])
    expect(subjectCompletions(method, 'update', abilities)).toEqual(['BlogPost'])
  })

  function subjectCompletions(
    method: string,
    action: string,
    abilities = "['create' | 'manage', 'campaign'] | ['create' | 'delete', 'user:invite']"
  ) {
    const fileName = join(__dirname, 'subjectCompletion.fixture.ts')
    const source = `
      import { createMongoAbility } from '../../src'
      type Abilities = ${abilities}
      const ability = createMongoAbility<Abilities>()
      ability.${method}('${action}', '')
    `
    const options: ts.CompilerOptions = {
      strict: true,
      module: ts.ModuleKind.NodeNext,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      target: ts.ScriptTarget.ESNext,
      types: [],
    }
    const service = ts.createLanguageService({
      getCompilationSettings: () => options,
      getScriptFileNames: () => [fileName],
      getScriptVersion: () => '0',
      getScriptSnapshot: path => {
        const contents = path === fileName ? source : ts.sys.readFile(path)
        return contents === undefined ? undefined : ts.ScriptSnapshot.fromString(contents)
      },
      getCurrentDirectory: () => process.cwd(),
      getDefaultLibFileName: ts.getDefaultLibFilePath,
      fileExists: ts.sys.fileExists,
      readFile: ts.sys.readFile,
    })

    try {
      const position = source.lastIndexOf("''") + 1
      return service.getCompletionsAtPosition(fileName, position, {})?.entries
        .filter(entry => entry.kind === ts.ScriptElementKind.string)
        .map(entry => entry.name)
        .sort()
    } finally {
      service.dispose()
    }
  }
})
