import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return { path: args.path, namespace: "a" };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
                            import msg from './msg'
                            console.log(msg)
                        `,
          };
        } else {
          return {
            loader: "jsx",
            contents: 'export default "Welcome"',
          };
        }
      });
    },
  };
};
