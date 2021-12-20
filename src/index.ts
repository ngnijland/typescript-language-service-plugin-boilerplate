import { DiagnosticCategory } from "typescript";

function init(modules: {
  typescript: typeof import("typescript/lib/tsserverlibrary");
}) {
  const ts = modules.typescript;

  function create(info: ts.server.PluginCreateInfo) {
    const proxy: ts.LanguageService = Object.create(null);

    for (const k of Object.keys(info.languageService) as Array<
      keyof ts.LanguageService
    >) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const x = info.languageService[k]!;

      /* eslint-disable @typescript-eslint/ban-types */
      // @ts-expect-error - JS runtime trickery which is tricky to type tersely
      proxy[k] = (...args: Array<{}>) => x.apply(info.languageService, args);
      /* eslint-enable @typescript-eslint/ban-types */
    }

    proxy.getSemanticDiagnostics = (filename) => {
      const prior = info.languageService.getSemanticDiagnostics(filename);
      const doc = info.languageService.getProgram()?.getSourceFile(filename);

      if (!doc) {
        return prior;
      }

      return [
        ...prior,
        {
          file: doc,
          start: doc.getPositionOfLineAndCharacter(0, 0),
          length: doc.text.split("\n")[0].length,
          messageText: "This TODO comment should be fixed!",
          category: DiagnosticCategory.Error,
          source: "Your plugin name",
          code: 666,
        },
      ];
    };

    return proxy;
  }

  return { create };
}

export = init;
