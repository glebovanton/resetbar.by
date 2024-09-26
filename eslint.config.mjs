import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

// export default createConfigForNuxt({
//     ignores: ["assets/libs/*", "node_modules", ".nuxt", "dist"]
// })

export default [
    {
        ignores: ["assets/libs/*", "node_modules", ".nuxt", "dist"]
    }
];
