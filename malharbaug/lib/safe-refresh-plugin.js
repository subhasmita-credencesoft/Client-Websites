class SafeRefreshPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('SafeRefreshPlugin', (compilation) => {
      compilation.hooks.runtimeModule.tap('SafeRefreshPlugin', (runtimeModule) => {
        if (runtimeModule.name !== 'react refresh') return;
        const src = runtimeModule.source.source();
        const patched = src.replace(
          'var originalFactory = options.factory;',
          'var originalFactory = options.factory; if(typeof originalFactory!=="function"){options.factory=function(m,e,r){return e;};return;}'
        );
        runtimeModule.source = new compiler.webpack.sources.RawSource(patched);
      });
    });
  }
}

module.exports = SafeRefreshPlugin;
