// MAINTAINERS ONLY
class BuildInfoPlugin {
  constructor(output, version) {
    this.output = output;
    this.version = version;
  }

  apply(compiler) {
    const pluginName = BuildInfoPlugin.name;
    const { webpack } = compiler;
    const { Compilation } = webpack;
    const { RawSource } = webpack.sources;
    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        (assets) => {
          const bInfo = {};
          bInfo.date = new Date().toUTCString();
          bInfo.files = Array.from(Object.keys(assets)).filter(
            (v) =>
              !v.toUpperCase().includes("LICENSE") &&
              !v.toLowerCase().endsWith(".d.ts") &&
              !v.toLowerCase().endsWith(".map")
          ); // Do not send unnecessary files to client
          bInfo.version = this.version;
          compilation.emitAsset(
            this.output,
            new RawSource(JSON.stringify(bInfo))
          );
        }
      );
    });
  }
}

module.exports = BuildInfoPlugin;
