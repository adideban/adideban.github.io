/** NOTE: When pulling and running 'npm run dev'
 * this file will cause next to send a 404. 
 * This page is responsible for deploying to github pages,
 * rever back to the original/default next.config.mjs when pulling and developing locally
 * @type {import('next').NextConfig}
 * const nextConfig = {};
 * export default nextConfig;
 * 
 * 
*/

/** @type {import('next').NextConfig} */
const nextConfig = {
    /**
     * Enable static exports for the App Router.
     *
     * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
     */
    output: "export",
  
    /**
     * Set base path. This is the slug of your GitHub repository.
     *
     * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
     */
    basePath: "/adideban.github.io",
    trailingSlash: true,
  
    /**
     * Disable server-based image optimization. Next.js does not support
     * dynamic features with static exports.
     *
     * @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized
     */
    images: {
      unoptimized: true,
    },
  };
  
  export default nextConfig;